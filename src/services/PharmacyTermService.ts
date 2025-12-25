// Pharmacy Term Service - TypeScript
import type { PharmacyTerm, SearchResult, TermFilter } from "../types/models";
import { TermCategory, MatchType } from "../types/models";
import { v4 as uuidv4 } from "uuid";
import { drugAPIService } from "./DrugAPIService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { allPlantsData } from "../data/plantsData";
import { allVitaminsData } from "../data/vitaminsData";
import { allDrugsData } from "../data/drugsData";
import { allMineralsData } from "../data/mineralsData";
import { allDiseasesData } from "../data/diseasesData";
import { allInsectsData } from "../data/insectsData";

const BOOKMARKS_STORAGE_KEY = "pharmadict_bookmarks";

export interface PharmacyTermServiceProtocol {
  getAllTerms(): Promise<PharmacyTerm[]>;
  getTermsByCategory(category: TermCategory): Promise<PharmacyTerm[]>;
  searchTerms(query: string, filter: TermFilter): Promise<SearchResult[]>;
  getTermById(id: string): Promise<PharmacyTerm | null>;
  getBookmarkedTerms(): Promise<PharmacyTerm[]>;
  toggleBookmark(termId: string): Promise<boolean>;
  getRelatedTerms(term: PharmacyTerm): Promise<PharmacyTerm[]>;
}

class PharmacyTermService implements PharmacyTermServiceProtocol {
  private terms: PharmacyTerm[] = [];
  private bookmarkedTermIds: string[] = [];
  private initialized: boolean = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    // Don't await in constructor, but store the promise
    this.initializationPromise = this.initialize();
  }

  private async initialize(): Promise<void> {
    if (this.initialized) {
      console.log(
        "✅ PharmacyTermService - Already initialized. Terms:",
        this.terms.length
      );
      return;
    }

    try {
      console.log("🔄 PharmacyTermService - Starting initialization...");
      // Load bookmarks from storage first
      await this.loadBookmarksFromStorage();
      // Load comprehensive data
      await this.loadComprehensiveData();
      this.initialized = true;
      console.log(
        "✅ PharmacyTermService - Initialization complete. Total terms:",
        this.terms.length
      );
      if (this.terms.length === 0) {
        console.error("❌ WARNING: No terms loaded after initialization!");
      }
    } catch (error) {
      console.error("❌ Error initializing service:", error);
      this.initialized = true; // Mark as initialized to prevent infinite loop
    }
  }

  private async loadComprehensiveData() {
    try {
      // Load from multiple sources
      const drugTerms = this.createDrugTerms();
      const plantTerms = this.createPlantTerms();
      const insectTerms = this.createInsectTerms();
      const componentTerms = this.createComponentTerms();
      const diseaseTerms = this.createDiseaseTerms();
      const anatomyTerms = this.createAnatomyTerms();
      const vitaminTerms = this.createVitaminTerms();
      const mineralTerms = this.createMineralTerms();

      const localTerms = [
        ...drugTerms,
        ...plantTerms,
        ...insectTerms,
        ...componentTerms,
        ...diseaseTerms,
        ...anatomyTerms,
        ...vitaminTerms,
        ...mineralTerms,
      ];

      const additionalTerms = [
        ...this.createAdditionalDrugTerms(),
        ...this.createAdditionalPlantTerms(),
        ...this.createAdditionalVitaminTerms(),
        ...this.createAdditionalInsectTerms(),
        ...this.createAdditionalComponentTerms(),
      ];

      const manualTerms = await this.loadManualJSONData();

      this.terms = [...localTerms, ...additionalTerms, ...manualTerms];

      console.log(`📊 Initial terms loaded: ${this.terms.length}`);
      console.log(`📊 Drug terms: ${drugTerms.length}`);
      console.log(`📊 Plant terms: ${plantTerms.length}`);
      console.log(`📊 Insect terms: ${insectTerms.length}`);
      console.log(`📊 Component terms: ${componentTerms.length}`);
      console.log(`📊 Disease terms: ${diseaseTerms.length}`);
      console.log(`📊 Anatomy terms: ${anatomyTerms.length}`);
      console.log(`📊 Vitamin terms: ${vitaminTerms.length}`);
      console.log(`📊 Mineral terms: ${mineralTerms.length}`);
      console.log(`📊 Local terms: ${localTerms.length}`);
      console.log(`📊 Additional terms: ${additionalTerms.length}`);
      console.log(`📊 Manual CSV terms: ${manualTerms.length}`);

      // Debug: Log first few drug terms
      if (drugTerms.length > 0) {
        console.log(
          "🔍 Sample drug terms:",
          drugTerms.slice(0, 3).map((t) => t.latinName)
        );
      } else {
        console.warn("⚠️ WARNING: No drug terms created!");
      }

      // Load online data asynchronously (don't wait for it)
      this.loadOnlineData()
        .then((onlineTerms) => {
          if (onlineTerms && onlineTerms.length > 0) {
            this.terms = [...this.terms, ...onlineTerms];
            console.log(`📊 Online terms loaded: ${onlineTerms.length}`);
            console.log(
              `📊 Total terms after online load: ${this.terms.length}`
            );
          }
        })
        .catch((error) => {
          console.error("❌ Error loading online data:", error);
        });
    } catch (error) {
      console.error("❌ Error in loadComprehensiveData:", error);
      // Set empty array to prevent further errors
      this.terms = [];
    }
  }

  // MARK: - Service Methods

  async getAllTerms(): Promise<PharmacyTerm[]> {
    // Wait for initialization to complete
    if (this.initializationPromise) {
      await this.initializationPromise;
    } else if (!this.initialized) {
      await this.initialize();
    }

    console.log(
      "📋 PharmacyTermService.getAllTerms() - Returning terms:",
      this.terms.length
    );
    if (this.terms.length === 0) {
      console.warn(
        "⚠️ PharmacyTermService.getAllTerms() - No terms available! Re-initializing..."
      );
      await this.loadComprehensiveData();
    }

    return this.terms.map((term) => ({
      ...term,
      isBookmarked: this.bookmarkedTermIds.includes(term.id),
      createdAt:
        term.createdAt instanceof Date
          ? term.createdAt
          : new Date(term.createdAt),
      updatedAt:
        term.updatedAt instanceof Date
          ? term.updatedAt
          : new Date(term.updatedAt),
      components: Array.isArray(term.components) ? term.components : [],
      relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
      synonyms: Array.isArray(term.synonyms) ? term.synonyms : [],
    }));
  }

  async getTermsByCategory(category: TermCategory): Promise<PharmacyTerm[]> {
    await this.initialize();
    return this.terms
      .filter((term) => term && term.category === category)
      .map((term) => ({
        ...term,
        isBookmarked: this.bookmarkedTermIds.includes(term.id),
        createdAt:
          term.createdAt instanceof Date
            ? term.createdAt
            : new Date(term.createdAt),
        updatedAt:
          term.updatedAt instanceof Date
            ? term.updatedAt
            : new Date(term.updatedAt),
        components: Array.isArray(term.components) ? term.components : [],
        relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
        synonyms: Array.isArray(term.synonyms) ? term.synonyms : [],
      }));
  }

  async searchTerms(
    query: string,
    filter: TermFilter
  ): Promise<SearchResult[]> {
    await this.initialize();

    const filteredTerms = this.terms.filter((term) => {
      const matchesCategory =
        !filter.categories ||
        filter.categories.length === 0 ||
        filter.categories.includes(term.category);
      const matchesQuery =
        !query ||
        query.length === 0 ||
        (term.latinName &&
          term.latinName.toLowerCase().includes(query.toLowerCase())) ||
        (term.turkishName &&
          term.turkishName.toLowerCase().includes(query.toLowerCase())) ||
        (term.definition &&
          term.definition.toLowerCase().includes(query.toLowerCase())) ||
        (term.synonyms &&
          term.synonyms.some(
            (syn) => syn && syn.toLowerCase().includes(query.toLowerCase())
          ));

      return matchesCategory && matchesQuery;
    });

    return filteredTerms.map((term) => ({
      id: uuidv4(),
      term: {
        ...term,
        isBookmarked: this.bookmarkedTermIds.includes(term.id),
        createdAt:
          term.createdAt instanceof Date
            ? term.createdAt
            : new Date(term.createdAt),
        updatedAt:
          term.updatedAt instanceof Date
            ? term.updatedAt
            : new Date(term.updatedAt),
        components: Array.isArray(term.components) ? term.components : [],
        relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
        synonyms: Array.isArray(term.synonyms) ? term.synonyms : [],
      },
      matchType:
        query === term.latinName || query === term.turkishName
          ? MatchType.EXACT
          : MatchType.PARTIAL,
      highlightedText: this.highlightSearchTerm(term.turkishName, query),
    }));
  }

  async getTermById(id: string): Promise<PharmacyTerm | null> {
    await this.initialize();
    if (!id || id.length === 0) {
      return null;
    }
    const term = this.terms.find((term) => term && term.id === id);
    if (!term) return null;
    return {
      ...term,
      isBookmarked: this.bookmarkedTermIds.includes(term.id),
      createdAt:
        term.createdAt instanceof Date
          ? term.createdAt
          : new Date(term.createdAt),
      updatedAt:
        term.updatedAt instanceof Date
          ? term.updatedAt
          : new Date(term.updatedAt),
      components: Array.isArray(term.components) ? term.components : [],
      relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
      synonyms: Array.isArray(term.synonyms) ? term.synonyms : [],
    };
  }

  async getBookmarkedTerms(): Promise<PharmacyTerm[]> {
    await this.initialize();
    return this.terms
      .filter(
        (term) => term && term.id && this.bookmarkedTermIds.includes(term.id)
      )
      .map((term) => ({
        ...term,
        isBookmarked: true,
        createdAt:
          term.createdAt instanceof Date
            ? term.createdAt
            : new Date(term.createdAt),
        updatedAt:
          term.updatedAt instanceof Date
            ? term.updatedAt
            : new Date(term.updatedAt),
        components: Array.isArray(term.components) ? term.components : [],
        relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
        synonyms: Array.isArray(term.synonyms) ? term.synonyms : [],
      }));
  }

  async toggleBookmark(termId: string): Promise<boolean> {
    if (!termId || termId.length === 0) {
      return false;
    }
    const index = this.bookmarkedTermIds.indexOf(termId);
    if (index > -1) {
      this.bookmarkedTermIds.splice(index, 1);
      await this.saveBookmarksToStorage();
      return false;
    } else {
      this.bookmarkedTermIds.push(termId);
      await this.saveBookmarksToStorage();
      return true;
    }
  }

  private async loadBookmarksFromStorage(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        this.bookmarkedTermIds = JSON.parse(stored);
        console.log(
          "📚 Bookmarks loaded from storage:",
          this.bookmarkedTermIds.length
        );
      }
    } catch (error) {
      console.error("❌ Error loading bookmarks:", error);
      this.bookmarkedTermIds = [];
    }
  }

  private async saveBookmarksToStorage(): Promise<void> {
    try {
      await AsyncStorage.setItem(
        BOOKMARKS_STORAGE_KEY,
        JSON.stringify(this.bookmarkedTermIds)
      );
      console.log(
        "💾 Bookmarks saved to storage:",
        this.bookmarkedTermIds.length
      );
    } catch (error) {
      console.error("❌ Error saving bookmarks:", error);
    }
  }

  async getRelatedTerms(term: PharmacyTerm): Promise<PharmacyTerm[]> {
    await this.initialize();

    if (!term || !term.id) {
      return [];
    }

    return this.terms
      .filter((otherTerm) => {
        if (!otherTerm || !otherTerm.id) return false;
        if (otherTerm.id === term.id) return false;

        if (otherTerm.category === term.category) return true;

        if (term.relatedTerms && term.relatedTerms.length > 0) {
          return term.relatedTerms.some((relatedTerm) => {
            if (!relatedTerm) return false;
            const relatedLower = relatedTerm.toLowerCase();
            return (
              (otherTerm.latinName &&
                otherTerm.latinName.toLowerCase().includes(relatedLower)) ||
              (otherTerm.turkishName &&
                otherTerm.turkishName.toLowerCase().includes(relatedLower))
            );
          });
        }

        return false;
      })
      .slice(0, 10)
      .map((otherTerm) => ({
        ...otherTerm,
        isBookmarked: this.bookmarkedTermIds.includes(otherTerm.id),
        createdAt:
          otherTerm.createdAt instanceof Date
            ? otherTerm.createdAt
            : new Date(otherTerm.createdAt),
        updatedAt:
          otherTerm.updatedAt instanceof Date
            ? otherTerm.updatedAt
            : new Date(otherTerm.updatedAt),
        components: Array.isArray(otherTerm.components)
          ? otherTerm.components
          : [],
        relatedTerms: Array.isArray(otherTerm.relatedTerms)
          ? otherTerm.relatedTerms
          : [],
        synonyms: Array.isArray(otherTerm.synonyms) ? otherTerm.synonyms : [],
      }));
  }

  // MARK: - Helper Methods

  private highlightSearchTerm(text: string, searchTerm: string): string {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "**$1**");
  }

  // MARK: - Data Creation Methods (Simplified - will be expanded)

  private createDrugTerms(): PharmacyTerm[] {
    // Yeni kapsamlı ilaç verilerini kullan
    const drugsFromData = allDrugsData.map((drug) =>
      this.createTerm({
        latinName: drug.latinName,
        turkishName: drug.turkishName,
        category: drug.category,
        definition: drug.definition,
        components: drug.components,
        relatedTerms: drug.relatedTerms,
        etymology: drug.etymology,
        usage: drug.usage,
        sideEffects: drug.sideEffects,
        dosage: drug.dosage,
        contraindications: drug.contraindications,
        interactions: drug.interactions,
        synonyms: drug.synonyms,
      })
    );

    return drugsFromData;
  }

  private createPlantTerms(): PharmacyTerm[] {
    // Yeni kapsamlı bitki verilerini kullan
    const plantsFromData = allPlantsData.map((plant) =>
      this.createTerm({
        latinName: plant.latinName,
        turkishName: plant.turkishName,
        category: plant.category,
        definition: plant.definition,
        components: plant.components,
        relatedTerms: plant.relatedTerms,
        etymology: plant.etymology,
        usage: plant.usage,
        sideEffects: plant.sideEffects,
        dosage: plant.dosage,
        contraindications: plant.contraindications,
        interactions: plant.interactions,
        synonyms: plant.synonyms,
      })
    );

    console.log(
      `🌿 Created ${plantsFromData.length} plant terms from plantsData`
    );
    return plantsFromData;
  }

  private createInsectTerms(): PharmacyTerm[] {
    // Yeni kapsamlı böcek verilerini kullan
    const insectsFromData = allInsectsData.map((insect) =>
      this.createTerm({
        latinName: insect.latinName,
        turkishName: insect.turkishName,
        category: insect.category,
        definition: insect.definition,
        components: insect.components,
        relatedTerms: insect.relatedTerms,
        etymology: insect.etymology,
        usage: insect.usage,
        sideEffects: insect.sideEffects,
        dosage: insect.dosage,
        contraindications: insect.contraindications,
        interactions: insect.interactions,
        synonyms: insect.synonyms,
      })
    );

    console.log(
      `🐛 Created ${insectsFromData.length} insect terms from insectsData`
    );
    return insectsFromData;
  }

  private createComponentTerms(): PharmacyTerm[] {
    return [
      this.createTerm({
        latinName: "Caffeine",
        turkishName: "Kafein",
        category: TermCategory.COMPONENT,
        definition:
          "Merkezi sinir sistemini uyaran, uyanıklığı artıran doğal alkaloid. Kahve, çay ve kola içeceklerinde bulunur.",
        components: ["Metilksantin"],
        relatedTerms: ["Uyarıcı", "Alkaloid"],
        etymology: "Almanca Kaffee (kahve) + -in (kimyasal sonek)",
        usage: "Uyanıklık, performans artışı, baş ağrısı tedavisi",
        sideEffects: ["Uykusuzluk", "Anksiyete", "Kalp çarpıntısı"],
        dosage: "100-200 mg (1-2 fincan kahve)",
        contraindications: ["Yüksek tansiyon", "Anksiyete bozukluğu"],
        interactions: ["Teofilin", "Ephedrine"],
        synonyms: ["1,3,7-trimetilksantin", "Guaranin"],
      }),
      this.createTerm({
        latinName: "Curcumin",
        turkishName: "Kurkumin",
        category: TermCategory.COMPONENT,
        definition:
          "Zerdeçalın aktif bileşeni. Güçlü anti-inflamatuar ve antioksidan özelliklere sahiptir.",
        components: ["Diferuloilmetan"],
        relatedTerms: ["Anti-inflamatuar", "Antioksidan"],
        etymology: "Latince Curcuma (zerdeçal) + -in",
        usage: "İnflamasyon tedavisi, eklem sağlığı, antioksidan",
        sideEffects: ["Mide rahatsızlığı (yüksek dozda)"],
        dosage: "500-1000 mg/gün",
        contraindications: ["Safra taşı"],
        interactions: ["Antikoagülanlar"],
        synonyms: ["Diferuloilmetan"],
      }),
      this.createTerm({
        latinName: "Quercetin",
        turkishName: "Kersetin",
        category: TermCategory.COMPONENT,
        definition:
          "Soğan, elma ve çayda bulunan, antioksidan ve anti-inflamatuar özellikli flavonoid.",
        components: ["Flavonol"],
        relatedTerms: ["Flavonoid", "Antioksidan"],
        etymology: "Latince quercus (meşe) - meşe ağacında bulunur",
        usage: "Antioksidan, alerji tedavisi, kardiyovasküler sağlık",
        sideEffects: ["Nadir"],
        dosage: "500-1000 mg/gün",
        contraindications: [],
        interactions: ["Antibiyotikler"],
        synonyms: ["3,3',4',5,7-pentahidroksiflavon"],
      }),
    ];
  }

  private createDiseaseTerms(): PharmacyTerm[] {
    // Yeni kapsamlı hastalık verilerini kullan
    const diseasesFromData = allDiseasesData.map((disease) =>
      this.createTerm({
        latinName: disease.latinName,
        turkishName: disease.turkishName,
        category: disease.category,
        definition: disease.definition,
        components: disease.components,
        relatedTerms: disease.relatedTerms,
        etymology: disease.etymology,
        usage: disease.usage,
        sideEffects: disease.sideEffects,
        dosage: disease.dosage,
        contraindications: disease.contraindications,
        interactions: disease.interactions,
        synonyms: disease.synonyms,
      })
    );

    console.log(
      `🏥 Created ${diseasesFromData.length} disease terms from diseasesData`
    );
    return diseasesFromData;
  }

  private createAnatomyTerms(): PharmacyTerm[] {
    return [
      this.createTerm({
        latinName: "Hamstrings",
        turkishName: "Hamstring Kasları",
        category: TermCategory.ANATOMY,
        definition:
          "Uyluğun arka kısmında bulunan, diz fleksiyonu ve kalça ekstansiyonundan sorumlu üç kas grubu.",
        components: ["Biceps femoris", "Semitendinosus", "Semimembranosus"],
        relatedTerms: ["Kas", "Uyluk", "Diz"],
        etymology:
          "İngilizce ham (jambon) + string (ip) - kasların görünümü nedeniyle",
        usage: "Yürüme, koşma, diz bükme",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Uyluk arka kasları", "Femur arka kasları"],
      }),
      this.createTerm({
        latinName: "Internal oblique",
        turkishName: "İç Eğik Kas",
        category: TermCategory.ANATOMY,
        definition:
          "Karın duvarında bulunan, gövde rotasyonu ve lateral fleksiyondan sorumlu kas.",
        components: ["Kas lifleri"],
        relatedTerms: ["Karın kası", "Gövde"],
        etymology: "Latince internus (iç) + obliquus (eğik)",
        usage: "Gövde rotasyonu, lateral fleksiyon, karın basıncı",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Obliquus internus abdominis"],
      }),
      this.createTerm({
        latinName: "Quadriceps femoris",
        turkishName: "Dört Başlı Uyluk Kası",
        category: TermCategory.ANATOMY,
        definition:
          "Uyluğun ön kısmında bulunan, diz ekstansiyonundan sorumlu dört başlı kas grubu.",
        components: [
          "Rectus femoris",
          "Vastus lateralis",
          "Vastus medialis",
          "Vastus intermedius",
        ],
        relatedTerms: ["Uyluk", "Diz", "Kas"],
        etymology: "Latince quadri (dört) + caput (baş) + femoris (uyluk)",
        usage: "Diz ekstansiyonu, yürüme, koşma",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Quadriceps", "Dörtlü kas"],
      }),
      this.createTerm({
        latinName: "Deltoid",
        turkishName: "Deltoid Kas",
        category: TermCategory.ANATOMY,
        definition:
          "Omuz eklemini örten, kolun yukarı kaldırılmasından sorumlu üçgen şeklindeki kas.",
        components: ["Anterior deltoid", "Medial deltoid", "Posterior deltoid"],
        relatedTerms: ["Omuz", "Kol", "Kas"],
        etymology:
          "Yunanca delta (üçgen) + -oid (benzer) - üçgen şekli nedeniyle",
        usage: "Kol elevasyonu, omuz abdüksiyonu",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Deltoideus", "Omuz kası"],
      }),
    ];
  }

  private createVitaminTerms(): PharmacyTerm[] {
    // Yeni kapsamlı vitamin verilerini kullan
    const vitaminsFromData = allVitaminsData.map((vitamin) =>
      this.createTerm({
        latinName: vitamin.latinName,
        turkishName: vitamin.turkishName,
        category: vitamin.category,
        definition: vitamin.definition,
        components: vitamin.components,
        relatedTerms: vitamin.relatedTerms,
        etymology: vitamin.etymology,
        usage: vitamin.usage,
        sideEffects: vitamin.sideEffects,
        dosage: vitamin.dosage,
        contraindications: vitamin.contraindications,
        interactions: vitamin.interactions,
        synonyms: vitamin.synonyms,
      })
    );

    console.log(
      `💊 Created ${vitaminsFromData.length} vitamin terms from vitaminsData`
    );
    return vitaminsFromData;
  }

  private createMineralTerms(): PharmacyTerm[] {
    // Yeni kapsamlı mineral verilerini kullan
    const mineralsFromData = allMineralsData.map((mineral) =>
      this.createTerm({
        latinName: mineral.latinName,
        turkishName: mineral.turkishName,
        category: mineral.category,
        definition: mineral.definition,
        components: mineral.components,
        relatedTerms: mineral.relatedTerms,
        etymology: mineral.etymology,
        usage: mineral.usage,
        sideEffects: mineral.sideEffects,
        dosage: mineral.dosage,
        contraindications: mineral.contraindications,
        interactions: mineral.interactions,
        synonyms: mineral.synonyms,
      })
    );

    console.log(
      `💎 Created ${mineralsFromData.length} mineral terms from mineralsData`
    );
    return mineralsFromData;
  }

  private createAdditionalDrugTerms(): PharmacyTerm[] {
    return [];
  }

  private createAdditionalPlantTerms(): PharmacyTerm[] {
    return [];
  }

  private createAdditionalVitaminTerms(): PharmacyTerm[] {
    return [];
  }

  private createAdditionalInsectTerms(): PharmacyTerm[] {
    return [];
  }

  private createAdditionalComponentTerms(): PharmacyTerm[] {
    return [];
  }

  private async loadManualJSONData(): Promise<PharmacyTerm[]> {
    try {
      // Load JSON data file
      const jsonData = require("../data/pharmacyTerms.json");
      const terms: PharmacyTerm[] = [];

      // Map category names to TermCategory enum
      const categoryMap: { [key: string]: TermCategory } = {
        drugs: TermCategory.DRUG,
        plants: TermCategory.PLANT,
        vitamins: TermCategory.VITAMIN,
        minerals: TermCategory.MINERAL,
        insects: TermCategory.INSECT,
        components: TermCategory.COMPONENT,
        diseases: TermCategory.DISEASE,
        anatomy: TermCategory.ANATOMY,
      };

      // Process each category
      for (const [categoryKey, categoryValue] of Object.entries(categoryMap)) {
        if (jsonData[categoryKey] && Array.isArray(jsonData[categoryKey])) {
          jsonData[categoryKey].forEach((item: any) => {
            terms.push(
              this.createTerm({
                latinName: item.latinName,
                turkishName: item.turkishName,
                category: categoryValue,
                definition: item.definition || "",
                components: item.components || [],
                relatedTerms: item.relatedTerms || [],
                etymology: item.etymology,
                usage: item.usage,
                sideEffects: item.sideEffects || [],
                dosage: item.dosage,
                contraindications: item.contraindications || [],
                interactions: item.interactions || [],
                synonyms: item.synonyms || [],
              })
            );
          });
        }
      }

      console.log(`📁 JSON data loaded: ${terms.length} terms`);
      if (terms.length > 0) {
        console.log(
          `📋 Sample JSON terms:`,
          terms.slice(0, 3).map((t) => `${t.latinName} (${t.category})`)
        );
      }
      return terms;
    } catch (error) {
      console.warn("⚠️ Could not load JSON data file:", error);
      return [];
    }
  }

  private async loadOnlineData(): Promise<PharmacyTerm[]> {
    try {
      console.log("🌐 Loading drugs from APIs...");

      // Yeni API servisini kullan
      const apiTerms = await drugAPIService.fetchFromMultipleSources(100);

      if (apiTerms.length > 0) {
        console.log(`✅ API'den ${apiTerms.length} ilaç yüklendi`);
        return apiTerms;
      }

      // Fallback: Eski yöntem
      console.log("⚠️ Using fallback API method...");
      const drugTerms = await this.loadOnlineDrugs();
      return [...drugTerms];
    } catch (error) {
      console.error("❌ Error loading online data:", error);
      return [];
    }
  }

  private async loadOnlineDrugs(): Promise<PharmacyTerm[]> {
    try {
      const url = "https://api.fda.gov/drug/label.json?limit=50";
      const response = await fetch(url);
      const data = await response.json();

      if (!data.results) return [];

      return data.results
        .filter((drug: any) => {
          // Filter out drugs without proper names
          const genericName = drug.generic_name?.[0] || drug.brand_name?.[0];
          return (
            genericName && genericName !== "Unknown" && genericName.length > 2
          );
        })
        .map((drug: any) => {
          const genericName = drug.generic_name?.[0] || drug.brand_name?.[0];
          const brandName = drug.brand_name?.[0] || genericName;
          return this.createTerm({
            latinName: genericName,
            turkishName: brandName,
            category: TermCategory.DRUG,
            definition:
              drug.indications_and_usage?.[0]?.substring(0, 200) ||
              "FDA onaylı ilaç",
            components: [genericName],
            relatedTerms: ["FDA", "İlaç"],
            etymology: "FDA Database",
            usage: drug.indications_and_usage?.[0]?.substring(0, 150) || "",
            sideEffects: drug.warnings?.slice(0, 3) || [],
            dosage: "Doktor tavsiyesi",
            contraindications: [],
            interactions: [],
            synonyms: drug.brand_name?.slice(0, 3) || [],
          });
        });
    } catch (error) {
      console.error("❌ Error loading online drugs:", error);
      return [];
    }
  }

  /**
   * API'den belirli bir ilaç için detaylı bilgi çeker
   */
  async fetchDrugFromAPI(drugName: string): Promise<PharmacyTerm | null> {
    try {
      return await drugAPIService.getDrugDetails(drugName);
    } catch (error) {
      console.error("❌ Error fetching drug from API:", error);
      return null;
    }
  }

  /**
   * API'den yeni ilaçlar yükler ve veritabanına ekler
   */
  async refreshDrugsFromAPI(limit: number = 100): Promise<number> {
    try {
      console.log(`🔄 Refreshing ${limit} drugs from API...`);
      const apiTerms = await drugAPIService.fetchFromMultipleSources(limit);

      if (apiTerms.length > 0) {
        // Mevcut terimlerle birleştir (duplicate kontrolü ile)
        const existingNames = new Set(
          this.terms.map((t) => t.latinName.toLowerCase())
        );
        const newTerms = apiTerms.filter(
          (t) => !existingNames.has(t.latinName.toLowerCase())
        );

        this.terms = [...this.terms, ...newTerms];
        console.log(
          `✅ ${newTerms.length} yeni ilaç eklendi (toplam: ${this.terms.length})`
        );
        return newTerms.length;
      }

      return 0;
    } catch (error) {
      console.error("❌ Error refreshing drugs from API:", error);
      return 0;
    }
  }

  private createTerm(
    data: Partial<PharmacyTerm> & {
      latinName: string;
      turkishName: string;
      category: TermCategory;
      definition: string;
    }
  ): PharmacyTerm {
    // Create a stable ID based on latinName and category (won't change between app restarts)
    const stableId = `${data.category}_${data.latinName
      .toLowerCase()
      .replace(/\s+/g, "_")}`;

    return {
      id: stableId,
      latinName: data.latinName,
      turkishName: data.turkishName,
      category: data.category,
      definition: data.definition,
      components: data.components || [],
      relatedTerms: data.relatedTerms || [],
      etymology: data.etymology,
      usage: data.usage,
      sideEffects: data.sideEffects,
      dosage: data.dosage,
      contraindications: data.contraindications,
      interactions: data.interactions,
      synonyms: data.synonyms || [],
      isBookmarked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

// Singleton instance
export const pharmacyTermService = new PharmacyTermService();
