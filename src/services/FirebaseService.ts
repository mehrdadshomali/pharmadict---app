/**
 * ============================================================================
 * FIREBASE SERVICE - VERİTABANI SERVİSİ
 * ============================================================================
 * 
 * Bu dosya Firebase Firestore veritabanı ile iletişimi sağlar.
 * Tüm CRUD (Create, Read, Update, Delete) işlemleri burada yapılır.
 * 
 * TEMEL FONKSİYONLAR:
 * - getAllTerms(): Tüm terimleri getir
 * - getTermsByCategory(): Kategoriye göre terimleri getir
 * - getTermById(): ID'ye göre tek terim getir
 * - addTerm(): Yeni terim ekle
 * - updateTerm(): Terim güncelle
 * - deleteTerm(): Terim sil
 * - toggleBookmark(): Favori durumunu değiştir
 * - searchTerms(): Terim ara
 * - batchAddTerms(): Toplu terim ekleme (ilk veri yüklemesi için)
 * 
 * FIREBASE FIRESTORE:
 * - NoSQL veritabanı (JSON benzeri dökümanlar)
 * - Gerçek zamanlı senkronizasyon
 * - Ölçeklenebilir bulut veritabanı
 * ============================================================================
 */

import {
  collection,      // Koleksiyon referansı oluştur
  doc,             // Döküman referansı oluştur
  getDocs,         // Birden fazla döküman getir
  getDoc,          // Tek döküman getir
  addDoc,          // Yeni döküman ekle
  updateDoc,       // Döküman güncelle
  deleteDoc,       // Döküman sil
  query,           // Sorgu oluştur
  where,           // Filtreleme koşulu
  orderBy,         // Sıralama
  limit,           // Sonuç limiti
  Timestamp,       // Firebase zaman damgası
  writeBatch,      // Toplu yazma işlemi
} from "firebase/firestore";
import { db } from "../config/firebase"; // Firebase bağlantısı
import type { PharmacyTerm } from "../types/models";
import { TermCategory } from "../types/models";

// Koleksiyon isimleri (Firestore'daki tablo isimleri)
const TERMS_COLLECTION = "terms";           // Terimler koleksiyonu
const CATEGORIES_COLLECTION = "categories"; // Kategoriler koleksiyonu

/**
 * FIRESTORE DÖKÜMANINI PHARMACYTERM'E DÖNÜŞTÜR
 * --------------------------------
 * Firestore'dan gelen ham veriyi uygulama modelimize çevirir.
 */
const docToTerm = (doc: any): PharmacyTerm => {
  const data = doc.data();
  return {
    id: doc.id,
    latinName: data.latinName || "",
    turkishName: data.turkishName || "",
    category: data.category || TermCategory.DRUG,
    definition: data.definition || "",
    components: data.components || [],
    relatedTerms: data.relatedTerms || [],
    etymology: data.etymology || "",
    usage: data.usage || "",
    sideEffects: data.sideEffects || [],
    dosage: data.dosage || "",
    contraindications: data.contraindications || [],
    interactions: data.interactions || [],
    synonyms: data.synonyms || [],
    isBookmarked: data.isBookmarked || false,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
};

/**
 * PHARMACYTERM'İ FIRESTORE DÖKÜMANINA DÖNÜŞTÜR
 * --------------------------------
 * Uygulama modelimizi Firestore'a kaydedilecek formata çevirir.
 */
const termToDoc = (term: Partial<PharmacyTerm>) => {
  return {
    latinName: term.latinName || "",
    turkishName: term.turkishName || "",
    category: term.category || TermCategory.DRUG,
    definition: term.definition || "",
    components: term.components || [],
    relatedTerms: term.relatedTerms || [],
    etymology: term.etymology || "",
    usage: term.usage || "",
    sideEffects: term.sideEffects || [],
    dosage: term.dosage || "",
    contraindications: term.contraindications || [],
    interactions: term.interactions || [],
    synonyms: term.synonyms || [],
    isBookmarked: term.isBookmarked || false,
    createdAt: term.createdAt
      ? Timestamp.fromDate(new Date(term.createdAt))
      : Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
};

/**
 * FIREBASE SERVICE SINIFI
 * --------------------------------
 * Tüm veritabanı işlemlerini içeren ana servis sınıfı.
 * Singleton pattern ile tek bir instance kullanılır.
 */
class FirebaseService {
  /**
   * TÜM TERİMLERİ GETİR
   * Firestore'dan tüm terimleri alfabetik sırayla çeker.
   */
  async getAllTerms(): Promise<PharmacyTerm[]> {
    try {
      console.log("🔥 Firebase: Fetching all terms...");
      const termsRef = collection(db, TERMS_COLLECTION);
      const q = query(termsRef, orderBy("latinName"));
      const snapshot = await getDocs(q);

      const terms = snapshot.docs.map(docToTerm);
      console.log(`✅ Firebase: Fetched ${terms.length} terms`);
      return terms;
    } catch (error) {
      console.error("❌ Firebase: Error fetching terms:", error);
      return [];
    }
  }

  /**
   * KATEGORİYE GÖRE TERİMLERİ GETİR
   * Belirli bir kategorideki tüm terimleri çeker.
   * @param category - Kategori türü (İlaçlar, Bitkiler, vb.)
   */
  async getTermsByCategory(category: TermCategory): Promise<PharmacyTerm[]> {
    try {
      console.log(`🔥 Firebase: Fetching terms for category: ${category}`);
      const termsRef = collection(db, TERMS_COLLECTION);
      const q = query(termsRef, where("category", "==", category));
      const snapshot = await getDocs(q);

      const terms = snapshot.docs.map(docToTerm);
      console.log(`✅ Firebase: Fetched ${terms.length} terms for ${category}`);
      return terms;
    } catch (error) {
      console.error("❌ Firebase: Error fetching terms by category:", error);
      return [];
    }
  }

  /**
   * ID'YE GÖRE TEK TERİM GETİR
   * Belirli bir terimin detaylarını çeker.
   * @param id - Terimin benzersiz ID'si
   */
  async getTermById(id: string): Promise<PharmacyTerm | null> {
    try {
      const docRef = doc(db, TERMS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docToTerm(docSnap);
      }
      return null;
    } catch (error) {
      console.error("❌ Firebase: Error fetching term:", error);
      return null;
    }
  }

  /**
   * YENİ TERİM EKLE
   * Veritabanına yeni bir terim ekler.
   * @param term - Eklenecek terim verisi
   * @returns Eklenen terimin ID'si veya null
   */
  async addTerm(term: Partial<PharmacyTerm>): Promise<string | null> {
    try {
      console.log("🔥 Firebase: Adding new term:", term.latinName);
      const termsRef = collection(db, TERMS_COLLECTION);
      const docRef = await addDoc(termsRef, termToDoc(term));
      console.log(`✅ Firebase: Term added with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error("❌ Firebase: Error adding term:", error);
      return null;
    }
  }

  /**
   * TERİM GÜNCELLE
   * Mevcut bir terimi günceller.
   * @param id - Güncellenecek terimin ID'si
   * @param updates - Güncellenecek alanlar
   */
  async updateTerm(
    id: string,
    updates: Partial<PharmacyTerm>
  ): Promise<boolean> {
    try {
      console.log("🔥 Firebase: Updating term:", id);
      const docRef = doc(db, TERMS_COLLECTION, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
      console.log("✅ Firebase: Term updated");
      return true;
    } catch (error) {
      console.error("❌ Firebase: Error updating term:", error);
      return false;
    }
  }

  /**
   * TERİM SİL
   * Veritabanından bir terimi kalıcı olarak siler.
   * @param id - Silinecek terimin ID'si
   */
  async deleteTerm(id: string): Promise<boolean> {
    try {
      console.log("🔥 Firebase: Deleting term:", id);
      const docRef = doc(db, TERMS_COLLECTION, id);
      await deleteDoc(docRef);
      console.log("✅ Firebase: Term deleted");
      return true;
    } catch (error) {
      console.error("❌ Firebase: Error deleting term:", error);
      return false;
    }
  }

  /**
   * FAVORİ DURUMUNU DEĞİŞTİR
   * Bir terimi favorilere ekler veya çıkarır.
   * @param id - Terimin ID'si
   * @returns Yeni favori durumu (true/false)
   */
  async toggleBookmark(id: string): Promise<boolean> {
    try {
      const term = await this.getTermById(id);
      if (term) {
        const newBookmarkState = !term.isBookmarked;
        await this.updateTerm(id, { isBookmarked: newBookmarkState });
        return newBookmarkState;
      }
      return false;
    } catch (error) {
      console.error("❌ Firebase: Error toggling bookmark:", error);
      return false;
    }
  }

  /**
   * FAVORİ TERİMLERİ GETİR
   * Kullanıcının favorilere eklediği tüm terimleri çeker.
   */
  async getBookmarkedTerms(): Promise<PharmacyTerm[]> {
    try {
      const termsRef = collection(db, TERMS_COLLECTION);
      const q = query(termsRef, where("isBookmarked", "==", true));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(docToTerm);
    } catch (error) {
      console.error("❌ Firebase: Error fetching bookmarked terms:", error);
      return [];
    }
  }

  /**
   * TERİM ARA
   * Latince isim, Türkçe isim, tanım ve eşanlamlılarda arama yapar.
   * NOT: Firestore tam metin araması desteklemediği için client-side filtreleme yapılır.
   * @param searchQuery - Arama metni
   */
  async searchTerms(searchQuery: string): Promise<PharmacyTerm[]> {
    try {
      // Firestore doesn't support full-text search natively
      // We'll fetch all and filter client-side for now
      const allTerms = await this.getAllTerms();
      const query = searchQuery.toLowerCase();

      return allTerms.filter(
        (term) =>
          term.latinName.toLowerCase().includes(query) ||
          term.turkishName.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query) ||
          term.synonyms?.some((s) => s.toLowerCase().includes(query))
      );
    } catch (error) {
      console.error("❌ Firebase: Error searching terms:", error);
      return [];
    }
  }

  /**
   * TOPLU TERİM EKLEME
   * Birden fazla terimi tek seferde ekler (ilk veri yüklemesi için).
   * Firestore batch limiti 500 olduğu için otomatik bölünür.
   * @param terms - Eklenecek terimler dizisi
   * @returns Eklenen terim sayısı
   */
  async batchAddTerms(terms: Partial<PharmacyTerm>[]): Promise<number> {
    try {
      console.log(`🔥 Firebase: Batch adding ${terms.length} terms...`);
      const batch = writeBatch(db);
      const termsRef = collection(db, TERMS_COLLECTION);

      let count = 0;
      for (const term of terms) {
        const docRef = doc(termsRef);
        batch.set(docRef, termToDoc(term));
        count++;

        // Firestore batch limit is 500
        if (count % 500 === 0) {
          await batch.commit();
          console.log(`✅ Firebase: Committed ${count} terms`);
        }
      }

      await batch.commit();
      console.log(`✅ Firebase: Batch added ${count} terms`);
      return count;
    } catch (error) {
      console.error("❌ Firebase: Error batch adding terms:", error);
      return 0;
    }
  }

  /**
   * KATEGORİ İSTATİSTİKLERİ
   * Her kategorideki terim sayısını hesaplar.
   * @returns Kategori adı -> terim sayısı eşleşmesi
   */
  async getCategoryStats(): Promise<Record<string, number>> {
    try {
      const allTerms = await this.getAllTerms();
      const stats: Record<string, number> = {};

      allTerms.forEach((term) => {
        const category = term.category || "Diğer";
        stats[category] = (stats[category] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error("❌ Firebase: Error getting category stats:", error);
      return {};
    }
  }
}

export const firebaseService = new FirebaseService();
export default firebaseService;
