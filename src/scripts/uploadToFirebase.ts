/**
 * Firebase'e 10,000 Terim Yükleme Scripti
 *
 * Bu script mevcut verileri Firebase Firestore'a yükler.
 * Duplicate kontrolü yapar ve batch işlem kullanır.
 *
 * Kullanım: Bu dosyayı AdminView'dan çağırabilirsiniz.
 */

import {
  collection,
  getDocs,
  writeBatch,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { TermCategory } from "../types/models";

// Mevcut veri dosyalarını import et
import { allDrugsData } from "../data/drugsData";
import { allPlantsData } from "../data/plantsData";
import { allVitaminsData } from "../data/vitaminsData";
import { allMineralsData } from "../data/mineralsData";
import { allDiseasesData } from "../data/diseasesData";
import { allInsectsData } from "../data/insectsData";
import { allComponentsData } from "../data/componentsData";
import { allAnatomyData } from "../data/anatomyData";
import extendedDatabase from "../data/extendedTermsDatabase.json";

const TERMS_COLLECTION = "terms";
const BATCH_SIZE = 400; // Firestore batch limit 500, güvenlik için 400

interface UploadProgress {
  total: number;
  uploaded: number;
  skipped: number;
  errors: number;
  currentCategory: string;
}

type ProgressCallback = (progress: UploadProgress) => void;

/**
 * Firebase'deki mevcut terimlerin latinName'lerini çeker
 */
async function getExistingTermNames(): Promise<Set<string>> {
  console.log("📥 Firebase'deki mevcut terimler kontrol ediliyor...");
  const existing = new Set<string>();

  try {
    const termsRef = collection(db, TERMS_COLLECTION);
    const snapshot = await getDocs(termsRef);

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.latinName) {
        existing.add(data.latinName.toLowerCase().trim());
      }
    });

    console.log(`✅ Firebase'de ${existing.size} mevcut terim bulundu`);
  } catch (error) {
    console.error("❌ Firebase okuma hatası:", error);
  }

  return existing;
}

/**
 * Terim verisini Firestore formatına dönüştürür
 */
function termToFirestoreDoc(term: any, category: TermCategory) {
  return {
    latinName: term.latinName || "",
    turkishName: term.turkishName || "",
    category: category,
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
    isBookmarked: false,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
}

/**
 * Batch olarak terimleri Firebase'e yükler
 */
async function uploadBatch(
  terms: any[],
  category: TermCategory,
  existingNames: Set<string>,
  progress: UploadProgress,
  onProgress?: ProgressCallback
): Promise<{ uploaded: number; skipped: number; errors: number }> {
  let uploaded = 0;
  let skipped = 0;
  let errors = 0;

  const termsRef = collection(db, TERMS_COLLECTION);
  let batch = writeBatch(db);
  let batchCount = 0;

  for (const term of terms) {
    const latinName = (term.latinName || "").toLowerCase().trim();

    // Duplicate kontrolü
    if (!latinName || existingNames.has(latinName)) {
      skipped++;
      continue;
    }

    try {
      const docRef = doc(termsRef);
      batch.set(docRef, termToFirestoreDoc(term, category));
      existingNames.add(latinName); // Yeni eklenen terimi de takip et
      batchCount++;
      uploaded++;

      // Batch dolduğunda commit et
      if (batchCount >= BATCH_SIZE) {
        await batch.commit();
        console.log(`✅ ${batchCount} terim yüklendi (${category})`);
        batch = writeBatch(db);
        batchCount = 0;

        // Progress güncelle
        if (onProgress) {
          progress.uploaded += batchCount;
          onProgress({ ...progress });
        }
      }
    } catch (error) {
      console.error(`❌ Hata: ${term.latinName}`, error);
      errors++;
    }
  }

  // Kalan terimleri commit et
  if (batchCount > 0) {
    await batch.commit();
    console.log(`✅ ${batchCount} terim yüklendi (${category})`);
  }

  return { uploaded, skipped, errors };
}

/**
 * Tüm kategorilerdeki terimleri Firebase'e yükler
 */
export async function uploadAllTermsToFirebase(
  onProgress?: ProgressCallback
): Promise<{ success: boolean; stats: any }> {
  console.log("🚀 Firebase yükleme başlatılıyor...");

  const stats = {
    drugs: { uploaded: 0, skipped: 0, errors: 0 },
    plants: { uploaded: 0, skipped: 0, errors: 0 },
    vitamins: { uploaded: 0, skipped: 0, errors: 0 },
    minerals: { uploaded: 0, skipped: 0, errors: 0 },
    diseases: { uploaded: 0, skipped: 0, errors: 0 },
    insects: { uploaded: 0, skipped: 0, errors: 0 },
    components: { uploaded: 0, skipped: 0, errors: 0 },
    anatomy: { uploaded: 0, skipped: 0, errors: 0 },
    total: { uploaded: 0, skipped: 0, errors: 0 },
  };

  try {
    // Mevcut terimleri al
    const existingNames = await getExistingTermNames();

    // Toplam terim sayısını hesapla
    const totalTerms =
      allDrugsData.length +
      allPlantsData.length +
      allVitaminsData.length +
      allMineralsData.length +
      allDiseasesData.length +
      allInsectsData.length +
      allComponentsData.length +
      allAnatomyData.length +
      (extendedDatabase.drugs?.length || 0) +
      (extendedDatabase.plants?.length || 0) +
      (extendedDatabase.vitamins?.length || 0) +
      (extendedDatabase.minerals?.length || 0) +
      (extendedDatabase.diseases?.length || 0) +
      (extendedDatabase.insects?.length || 0) +
      (extendedDatabase.components?.length || 0) +
      (extendedDatabase.anatomy?.length || 0);

    const progress: UploadProgress = {
      total: totalTerms,
      uploaded: 0,
      skipped: 0,
      errors: 0,
      currentCategory: "",
    };

    console.log(`📊 Toplam yüklenecek terim: ${totalTerms}`);

    // 1. İlaçlar
    console.log("\n💊 İlaçlar yükleniyor...");
    progress.currentCategory = "İlaçlar";
    const drugsResult = await uploadBatch(
      allDrugsData,
      TermCategory.DRUG,
      existingNames,
      progress,
      onProgress
    );
    stats.drugs = drugsResult;

    // Extended database ilaçları
    if (extendedDatabase.drugs?.length) {
      const extDrugsResult = await uploadBatch(
        extendedDatabase.drugs,
        TermCategory.DRUG,
        existingNames,
        progress,
        onProgress
      );
      stats.drugs.uploaded += extDrugsResult.uploaded;
      stats.drugs.skipped += extDrugsResult.skipped;
      stats.drugs.errors += extDrugsResult.errors;
    }

    // 2. Bitkiler
    console.log("\n🌿 Bitkiler yükleniyor...");
    progress.currentCategory = "Bitkiler";
    const plantsResult = await uploadBatch(
      allPlantsData,
      TermCategory.PLANT,
      existingNames,
      progress,
      onProgress
    );
    stats.plants = plantsResult;

    if (extendedDatabase.plants?.length) {
      const extPlantsResult = await uploadBatch(
        extendedDatabase.plants,
        TermCategory.PLANT,
        existingNames,
        progress,
        onProgress
      );
      stats.plants.uploaded += extPlantsResult.uploaded;
      stats.plants.skipped += extPlantsResult.skipped;
      stats.plants.errors += extPlantsResult.errors;
    }

    // 3. Vitaminler
    console.log("\n💊 Vitaminler yükleniyor...");
    progress.currentCategory = "Vitaminler";
    const vitaminsResult = await uploadBatch(
      allVitaminsData,
      TermCategory.VITAMIN,
      existingNames,
      progress,
      onProgress
    );
    stats.vitamins = vitaminsResult;

    if (extendedDatabase.vitamins?.length) {
      const extVitaminsResult = await uploadBatch(
        extendedDatabase.vitamins,
        TermCategory.VITAMIN,
        existingNames,
        progress,
        onProgress
      );
      stats.vitamins.uploaded += extVitaminsResult.uploaded;
      stats.vitamins.skipped += extVitaminsResult.skipped;
      stats.vitamins.errors += extVitaminsResult.errors;
    }

    // 4. Mineraller
    console.log("\n💎 Mineraller yükleniyor...");
    progress.currentCategory = "Mineraller";
    const mineralsResult = await uploadBatch(
      allMineralsData,
      TermCategory.MINERAL,
      existingNames,
      progress,
      onProgress
    );
    stats.minerals = mineralsResult;

    if (extendedDatabase.minerals?.length) {
      const extMineralsResult = await uploadBatch(
        extendedDatabase.minerals,
        TermCategory.MINERAL,
        existingNames,
        progress,
        onProgress
      );
      stats.minerals.uploaded += extMineralsResult.uploaded;
      stats.minerals.skipped += extMineralsResult.skipped;
      stats.minerals.errors += extMineralsResult.errors;
    }

    // 5. Hastalıklar
    console.log("\n🏥 Hastalıklar yükleniyor...");
    progress.currentCategory = "Hastalıklar";
    const diseasesResult = await uploadBatch(
      allDiseasesData,
      TermCategory.DISEASE,
      existingNames,
      progress,
      onProgress
    );
    stats.diseases = diseasesResult;

    if (extendedDatabase.diseases?.length) {
      const extDiseasesResult = await uploadBatch(
        extendedDatabase.diseases,
        TermCategory.DISEASE,
        existingNames,
        progress,
        onProgress
      );
      stats.diseases.uploaded += extDiseasesResult.uploaded;
      stats.diseases.skipped += extDiseasesResult.skipped;
      stats.diseases.errors += extDiseasesResult.errors;
    }

    // 6. Böcekler
    console.log("\n🐛 Böcekler yükleniyor...");
    progress.currentCategory = "Böcekler";
    const insectsResult = await uploadBatch(
      allInsectsData,
      TermCategory.INSECT,
      existingNames,
      progress,
      onProgress
    );
    stats.insects = insectsResult;

    if (extendedDatabase.insects?.length) {
      const extInsectsResult = await uploadBatch(
        extendedDatabase.insects,
        TermCategory.INSECT,
        existingNames,
        progress,
        onProgress
      );
      stats.insects.uploaded += extInsectsResult.uploaded;
      stats.insects.skipped += extInsectsResult.skipped;
      stats.insects.errors += extInsectsResult.errors;
    }

    // 7. Bileşenler
    console.log("\n⚗️ Bileşenler yükleniyor...");
    progress.currentCategory = "Bileşenler";
    const componentsResult = await uploadBatch(
      allComponentsData,
      TermCategory.COMPONENT,
      existingNames,
      progress,
      onProgress
    );
    stats.components = componentsResult;

    if (extendedDatabase.components?.length) {
      const extComponentsResult = await uploadBatch(
        extendedDatabase.components,
        TermCategory.COMPONENT,
        existingNames,
        progress,
        onProgress
      );
      stats.components.uploaded += extComponentsResult.uploaded;
      stats.components.skipped += extComponentsResult.skipped;
      stats.components.errors += extComponentsResult.errors;
    }

    // 8. Anatomi
    console.log("\n🫀 Anatomi yükleniyor...");
    progress.currentCategory = "Anatomi";
    const anatomyResult = await uploadBatch(
      allAnatomyData,
      TermCategory.ANATOMY,
      existingNames,
      progress,
      onProgress
    );
    stats.anatomy = anatomyResult;

    if (extendedDatabase.anatomy?.length) {
      const extAnatomyResult = await uploadBatch(
        extendedDatabase.anatomy,
        TermCategory.ANATOMY,
        existingNames,
        progress,
        onProgress
      );
      stats.anatomy.uploaded += extAnatomyResult.uploaded;
      stats.anatomy.skipped += extAnatomyResult.skipped;
      stats.anatomy.errors += extAnatomyResult.errors;
    }

    // Toplam hesapla
    Object.keys(stats).forEach((key) => {
      if (key !== "total") {
        stats.total.uploaded += stats[key as keyof typeof stats].uploaded;
        stats.total.skipped += stats[key as keyof typeof stats].skipped;
        stats.total.errors += stats[key as keyof typeof stats].errors;
      }
    });

    console.log("\n" + "=".repeat(50));
    console.log("📊 YÜKLEME TAMAMLANDI");
    console.log("=".repeat(50));
    console.log(`✅ Yüklenen: ${stats.total.uploaded}`);
    console.log(`⏭️ Atlanan (duplicate): ${stats.total.skipped}`);
    console.log(`❌ Hata: ${stats.total.errors}`);
    console.log("=".repeat(50));

    return { success: true, stats };
  } catch (error) {
    console.error("❌ Firebase yükleme hatası:", error);
    return { success: false, stats };
  }
}

/**
 * Firebase'deki tüm terimleri siler (dikkatli kullanın!)
 */
export async function clearAllTermsFromFirebase(): Promise<boolean> {
  console.log("⚠️ Firebase'deki tüm terimler siliniyor...");

  try {
    const termsRef = collection(db, TERMS_COLLECTION);
    const snapshot = await getDocs(termsRef);

    const batch = writeBatch(db);
    let count = 0;

    for (const docSnapshot of snapshot.docs) {
      batch.delete(docSnapshot.ref);
      count++;

      if (count % BATCH_SIZE === 0) {
        await batch.commit();
        console.log(`🗑️ ${count} terim silindi`);
      }
    }

    await batch.commit();
    console.log(`✅ Toplam ${count} terim silindi`);
    return true;
  } catch (error) {
    console.error("❌ Silme hatası:", error);
    return false;
  }
}

/**
 * Firebase'deki terim sayısını döndürür
 */
export async function getFirebaseTermCount(): Promise<number> {
  try {
    const termsRef = collection(db, TERMS_COLLECTION);
    const snapshot = await getDocs(termsRef);
    return snapshot.size;
  } catch (error) {
    console.error("❌ Sayım hatası:", error);
    return 0;
  }
}
