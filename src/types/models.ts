/**
 * ============================================================================
 * MODELS - VERİ MODELLERİ VE TİP TANIMLARI
 * ============================================================================
 * 
 * Bu dosya uygulamada kullanılan tüm veri modellerini ve TypeScript
 * tip tanımlarını içerir. TypeScript sayesinde kod yazarken hata
 * yapma olasılığı azalır ve IDE desteği artar.
 * 
 * İÇERİK:
 * 1. TermCategory: Terim kategorileri (enum)
 * 2. TermCategoryConfig: Kategori yapılandırmaları
 * 3. PharmacyTerm: Ana terim modeli (interface)
 * 4. MatchType: Arama eşleşme türleri
 * 5. SearchResult: Arama sonucu modeli
 * 6. SortOption: Sıralama seçenekleri
 * 7. TermFilter: Filtreleme modeli
 * ============================================================================
 */

/**
 * TERİM KATEGORİLERİ (ENUM)
 * --------------------------------
 * Enum: Sabit değerler kümesi tanımlar.
 * Her terim bu kategorilerden birine ait olmalıdır.
 */
export enum TermCategory {
  DRUG = "İlaçlar",           // İlaçlar ve farmakolojik maddeler
  PLANT = "Bitkiler",         // Tıbbi bitkiler
  VITAMIN = "Vitaminler",     // Vitaminler
  MINERAL = "Mineraller",     // Mineraller ve eser elementler
  INSECT = "Böcekler",        // Böcek kaynaklı ürünler
  COMPONENT = "Bileşenler",   // Kimyasal bileşenler
  DISEASE = "Hastalıklar",    // Hastalık isimleri
  ANATOMY = "Anatomi"         // Anatomik yapılar
}

/**
 * KATEGORİ YAPILANDIRMALARI
 * --------------------------------
 * Her kategori için ikon, renk ve açıklama tanımları.
 * UI'da kategori kartlarını oluştururken kullanılır.
 */
export const TermCategoryConfig = {
  [TermCategory.DRUG]: {
    icon: "💊",                                    // Emoji ikon
    color: "blue",                                 // Renk kodu
    description: "İlaçlar ve farmakolojik maddeler" // Açıklama
  },
  [TermCategory.PLANT]: {
    icon: "🌿",
    color: "green",
    description: "Tıbbi bitkiler ve fitoterapötik ürünler"
  },
  [TermCategory.VITAMIN]: {
    icon: "💉",
    color: "orange",
    description: "Vitaminler ve suda/yağda çözünen vitaminler"
  },
  [TermCategory.MINERAL]: {
    icon: "💎",
    color: "purple",
    description: "Mineraller ve eser elementler"
  },
  [TermCategory.INSECT]: {
    icon: "🐛",
    color: "brown",
    description: "Böcek kaynaklı tıbbi ürünler"
  },
  [TermCategory.COMPONENT]: {
    icon: "⚗️",
    color: "red",
    description: "Kimyasal bileşenler ve aktif maddeler"
  },
  [TermCategory.DISEASE]: {
    icon: "🏥",
    color: "pink",
    description: "Hastalık isimleri ve tıbbi durumlar"
  },
  [TermCategory.ANATOMY]: {
    icon: "🫀",
    color: "indigo",
    description: "Anatomik yapılar ve organlar"
  }
};

/**
 * PHARMACY TERM - ANA TERİM MODELİ (INTERFACE)
 * --------------------------------
 * Interface: Bir objenin yapısını tanımlar.
 * Veritabanındaki her terim bu yapıya uygun olmalıdır.
 * 
 * ZORUNLU ALANLAR:
 * - id: Benzersiz kimlik
 * - latinName: Latince isim
 * - turkishName: Türkçe isim
 * - category: Kategori
 * - definition: Tanım
 * - components: Bileşenler listesi
 * - relatedTerms: İlişkili terimler
 * - synonyms: Eşanlamlılar
 * - isBookmarked: Favori durumu
 * - createdAt: Oluşturulma tarihi
 * - updatedAt: Güncellenme tarihi
 * 
 * OPSİYONEL ALANLAR (? ile işaretli):
 * - etymology: Etimoloji (kelimenin kökeni)
 * - usage: Kullanım şekli
 * - sideEffects: Yan etkiler
 * - dosage: Dozaj bilgisi
 * - contraindications: Kontrendikasyonlar
 * - interactions: İlaç etkileşimleri
 */
export interface PharmacyTerm {
  id: string;                      // Benzersiz ID (Firebase tarafından oluşturulur)
  latinName: string;               // Latince isim (örn: "Aspirin")
  turkishName: string;             // Türkçe isim (örn: "Aspirin")
  category: TermCategory;          // Kategori (İlaçlar, Bitkiler, vb.)
  definition: string;              // Tanım/açıklama
  components: string[];            // Bileşenler listesi
  relatedTerms: string[];          // İlişkili terimler
  etymology?: string;              // Etimoloji (opsiyonel)
  usage?: string;                  // Kullanım şekli (opsiyonel)
  sideEffects?: string[];          // Yan etkiler (opsiyonel)
  dosage?: string;                 // Dozaj (opsiyonel)
  contraindications?: string[];    // Kontrendikasyonlar (opsiyonel)
  interactions?: string[];         // İlaç etkileşimleri (opsiyonel)
  synonyms: string[];              // Eşanlamlılar
  isBookmarked: boolean;           // Favorilere eklenmiş mi?
  createdAt: Date;                 // Oluşturulma tarihi
  updatedAt: Date;                 // Son güncelleme tarihi
}

/**
 * EŞLEŞME TÜRLERİ (ENUM)
 * --------------------------------
 * Arama sonuçlarında eşleşmenin nasıl bulunduğunu belirtir.
 */
export enum MatchType {
  EXACT = "exact",              // Tam eşleşme
  PARTIAL = "partial",          // Kısmi eşleşme
  SYNONYM = "synonym",          // Eşanlamlı ile eşleşme
  COMPONENT = "component",      // Bileşen ile eşleşme
  RELATED_TERM = "relatedTerm"  // İlişkili terim ile eşleşme
}

/**
 * ARAMA SONUCU MODELİ (INTERFACE)
 * --------------------------------
 * Arama işlemi sonucunda dönen her bir sonucun yapısı.
 */
export interface SearchResult {
  id: string;                    // Sonuç ID'si
  term: PharmacyTerm;           // Bulunan terim
  matchType: MatchType;         // Nasıl eşleşti?
  highlightedText: string;      // Vurgulanan metin
}

/**
 * SIRALAMA SEÇENEKLERİ (ENUM)
 * --------------------------------
 * Terim listesini sıralama seçenekleri.
 */
export enum SortOption {
  ALPHABETICAL = "Alfabetik",      // A'dan Z'ye
  CATEGORY = "Kategoriye Göre",    // Kategorilere göre grupla
  RECENT = "Son Eklenenler",       // En yeni önce
  BOOKMARKED = "Favoriler"         // Favoriler önce
}

/**
 * FİLTRE MODELİ (INTERFACE)
 * --------------------------------
 * Terim listesini filtreleme ayarları.
 */
export interface TermFilter {
  categories: TermCategory[];    // Gösterilecek kategoriler
  searchText: string;            // Arama metni
  onlyBookmarked: boolean;       // Sadece favoriler
  sortBy: SortOption;            // Sıralama seçeneği
}

/**
 * VARSAYILAN FİLTRE OLUŞTUR
 * --------------------------------
 * Yeni bir filtre objesi oluşturur (tüm kategoriler seçili, sıralama alfabetik).
 */
export const createDefaultFilter = (): TermFilter => ({
  categories: Object.values(TermCategory), // Tüm kategoriler
  searchText: "",                           // Boş arama
  onlyBookmarked: false,                    // Tüm terimler
  sortBy: SortOption.ALPHABETICAL           // Alfabetik sıralama
});
