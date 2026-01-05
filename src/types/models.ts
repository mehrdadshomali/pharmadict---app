// Pharmacy Term Models - TypeScript
// Xcode ve Swift'ten tamamen bağımsız - Pure JavaScript/TypeScript

export enum TermCategory {
  DRUG = "İlaçlar",
  PLANT = "Bitkiler",
  VITAMIN = "Vitaminler",
  MINERAL = "Mineraller",
  INSECT = "Böcekler",
  COMPONENT = "Bileşenler",
  DISEASE = "Hastalıklar",
  ANATOMY = "Anatomi"
}

export const TermCategoryConfig = {
  [TermCategory.DRUG]: {
    icon: "💊",
    color: "blue",
    description: "İlaçlar ve farmakolojik maddeler"
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

export interface PharmacyTerm {
  id: string;
  latinName: string;
  turkishName: string;
  category: TermCategory;
  definition: string;
  components: string[];
  relatedTerms: string[];
  etymology?: string;
  usage?: string;
  sideEffects?: string[];
  dosage?: string;
  contraindications?: string[];
  interactions?: string[];
  synonyms: string[];
  isBookmarked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum MatchType {
  EXACT = "exact",
  PARTIAL = "partial",
  SYNONYM = "synonym",
  COMPONENT = "component",
  RELATED_TERM = "relatedTerm"
}

export interface SearchResult {
  id: string;
  term: PharmacyTerm;
  matchType: MatchType;
  highlightedText: string;
}

export enum SortOption {
  ALPHABETICAL = "Alfabetik",
  CATEGORY = "Kategoriye Göre",
  RECENT = "Son Eklenenler",
  BOOKMARKED = "Favoriler"
}

export interface TermFilter {
  categories: TermCategory[];
  searchText: string;
  onlyBookmarked: boolean;
  sortBy: SortOption;
}

export const createDefaultFilter = (): TermFilter => ({
  categories: Object.values(TermCategory),
  searchText: "",
  onlyBookmarked: false,
  sortBy: SortOption.ALPHABETICAL
});

