// Pharmacy Term Service - TypeScript
import type { PharmacyTerm, SearchResult, TermFilter } from '../types/models';
import { TermCategory, MatchType } from '../types/models';
import { v4 as uuidv4 } from 'uuid';
import { drugAPIService } from './DrugAPIService';

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
      console.log("✅ PharmacyTermService - Already initialized. Terms:", this.terms.length);
      return;
    }
    
    try {
      console.log("🔄 PharmacyTermService - Starting initialization...");
      // Load comprehensive data
      await this.loadComprehensiveData();
      this.initialized = true;
      console.log("✅ PharmacyTermService - Initialization complete. Total terms:", this.terms.length);
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
      
      const localTerms = [
        ...drugTerms,
        ...plantTerms,
        ...insectTerms,
        ...componentTerms,
        ...diseaseTerms,
        ...anatomyTerms,
        ...vitaminTerms
      ];

      const additionalTerms = [
        ...this.createAdditionalDrugTerms(),
        ...this.createAdditionalPlantTerms(),
        ...this.createAdditionalVitaminTerms(),
        ...this.createAdditionalInsectTerms(),
        ...this.createAdditionalComponentTerms()
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
      console.log(`📊 Local terms: ${localTerms.length}`);
      console.log(`📊 Additional terms: ${additionalTerms.length}`);
      console.log(`📊 Manual CSV terms: ${manualTerms.length}`);
      
      // Debug: Log first few drug terms
      if (drugTerms.length > 0) {
        console.log("🔍 Sample drug terms:", drugTerms.slice(0, 3).map(t => t.latinName));
      } else {
        console.warn("⚠️ WARNING: No drug terms created!");
      }

      // Load online data asynchronously (don't wait for it)
      this.loadOnlineData().then(onlineTerms => {
        if (onlineTerms && onlineTerms.length > 0) {
          this.terms = [...this.terms, ...onlineTerms];
          console.log(`📊 Online terms loaded: ${onlineTerms.length}`);
          console.log(`📊 Total terms after online load: ${this.terms.length}`);
        }
      }).catch(error => {
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
    
    console.log("📋 PharmacyTermService.getAllTerms() - Returning terms:", this.terms.length);
    if (this.terms.length === 0) {
      console.warn("⚠️ PharmacyTermService.getAllTerms() - No terms available! Re-initializing...");
      await this.loadComprehensiveData();
    }
    
    return this.terms.map(term => ({
      ...term,
      isBookmarked: this.bookmarkedTermIds.includes(term.id),
      createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
      updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
      components: Array.isArray(term.components) ? term.components : [],
      relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
      synonyms: Array.isArray(term.synonyms) ? term.synonyms : []
    }));
  }

  async getTermsByCategory(category: TermCategory): Promise<PharmacyTerm[]> {
    await this.initialize();
    return this.terms
      .filter(term => term && term.category === category)
      .map(term => ({
        ...term,
        isBookmarked: this.bookmarkedTermIds.includes(term.id),
        createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
        updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
        components: Array.isArray(term.components) ? term.components : [],
        relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
        synonyms: Array.isArray(term.synonyms) ? term.synonyms : []
      }));
  }

  async searchTerms(query: string, filter: TermFilter): Promise<SearchResult[]> {
    await this.initialize();
    
    const filteredTerms = this.terms.filter(term => {
      const matchesCategory = !filter.categories || filter.categories.length === 0 || filter.categories.includes(term.category);
      const matchesQuery = !query || query.length === 0 || 
        (term.latinName && term.latinName.toLowerCase().includes(query.toLowerCase())) ||
        (term.turkishName && term.turkishName.toLowerCase().includes(query.toLowerCase())) ||
        (term.definition && term.definition.toLowerCase().includes(query.toLowerCase())) ||
        (term.synonyms && term.synonyms.some(syn => syn && syn.toLowerCase().includes(query.toLowerCase())));
      
      return matchesCategory && matchesQuery;
    });

    return filteredTerms.map(term => ({
      id: uuidv4(),
      term: {
        ...term,
        isBookmarked: this.bookmarkedTermIds.includes(term.id),
        createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
        updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
        components: Array.isArray(term.components) ? term.components : [],
        relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
        synonyms: Array.isArray(term.synonyms) ? term.synonyms : []
      },
      matchType: query === term.latinName || query === term.turkishName ? MatchType.EXACT : MatchType.PARTIAL,
      highlightedText: this.highlightSearchTerm(term.turkishName, query)
    }));
  }

  async getTermById(id: string): Promise<PharmacyTerm | null> {
    await this.initialize();
    if (!id || id.length === 0) {
      return null;
    }
    const term = this.terms.find(term => term && term.id === id);
    if (!term) return null;
    return {
      ...term,
      isBookmarked: this.bookmarkedTermIds.includes(term.id),
      createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
      updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
      components: Array.isArray(term.components) ? term.components : [],
      relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
      synonyms: Array.isArray(term.synonyms) ? term.synonyms : []
    };
  }

  async getBookmarkedTerms(): Promise<PharmacyTerm[]> {
    await this.initialize();
    return this.terms
      .filter(term => term && term.id && this.bookmarkedTermIds.includes(term.id))
      .map(term => ({
        ...term,
        isBookmarked: true,
        createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
        updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
        components: Array.isArray(term.components) ? term.components : [],
        relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
        synonyms: Array.isArray(term.synonyms) ? term.synonyms : []
      }));
  }

  async toggleBookmark(termId: string): Promise<boolean> {
    if (!termId || termId.length === 0) {
      return false;
    }
    const index = this.bookmarkedTermIds.indexOf(termId);
    if (index > -1) {
      this.bookmarkedTermIds.splice(index, 1);
      return false;
    } else {
      this.bookmarkedTermIds.push(termId);
      return true;
    }
  }

  async getRelatedTerms(term: PharmacyTerm): Promise<PharmacyTerm[]> {
    await this.initialize();
    
    if (!term || !term.id) {
      return [];
    }
    
    return this.terms
      .filter(otherTerm => {
        if (!otherTerm || !otherTerm.id) return false;
        if (otherTerm.id === term.id) return false;
        
        if (otherTerm.category === term.category) return true;
        
        if (term.relatedTerms && term.relatedTerms.length > 0) {
          return term.relatedTerms.some(relatedTerm => {
            if (!relatedTerm) return false;
            const relatedLower = relatedTerm.toLowerCase();
            return (otherTerm.latinName && otherTerm.latinName.toLowerCase().includes(relatedLower)) ||
                   (otherTerm.turkishName && otherTerm.turkishName.toLowerCase().includes(relatedLower));
          });
        }
        
        return false;
      })
      .slice(0, 10)
      .map(otherTerm => ({
        ...otherTerm,
        isBookmarked: this.bookmarkedTermIds.includes(otherTerm.id),
        createdAt: otherTerm.createdAt instanceof Date ? otherTerm.createdAt : new Date(otherTerm.createdAt),
        updatedAt: otherTerm.updatedAt instanceof Date ? otherTerm.updatedAt : new Date(otherTerm.updatedAt),
        components: Array.isArray(otherTerm.components) ? otherTerm.components : [],
        relatedTerms: Array.isArray(otherTerm.relatedTerms) ? otherTerm.relatedTerms : [],
        synonyms: Array.isArray(otherTerm.synonyms) ? otherTerm.synonyms : []
      }));
  }

  // MARK: - Helper Methods

  private highlightSearchTerm(text: string, searchTerm: string): string {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '**$1**');
  }

  // MARK: - Data Creation Methods (Simplified - will be expanded)

  private createDrugTerms(): PharmacyTerm[] {
    return [
      this.createTerm({
        latinName: "Acetylsalicylic acid",
        turkishName: "Asetilsalisilik asit",
        category: TermCategory.DRUG,
        definition: "Ağrı kesici, ateş düşürücü ve anti-inflamatuar etki gösteren bir ilaç. Aspirin olarak da bilinir.",
        components: ["Salisilik asit", "Asetil grubu"],
        relatedTerms: ["NSAID", "COX inhibitörü"],
        etymology: "Latince acetyl + salicylic",
        usage: "Ağrı, ateş, inflamasyon tedavisi",
        sideEffects: ["Mide irritasyonu", "Kanama riski"],
        dosage: "325-650 mg, 4-6 saatte bir",
        contraindications: ["Peptic ülser", "Kanama bozuklukları"],
        interactions: ["Warfarin", "Methotrexate"],
        synonyms: ["Aspirin", "ASA"]
      }),
      this.createTerm({
        latinName: "Paracetamol",
        turkishName: "Parasetamol",
        category: TermCategory.DRUG,
        definition: "Ağrı kesici ve ateş düşürücü etkisi olan analjezik ilaç. Mideye daha az zararlıdır.",
        components: ["Para-aminofenol"],
        relatedTerms: ["Analjezik", "Antipiretik"],
        etymology: "Para-acetyl-amino-phenol",
        usage: "Ağrı ve ateş tedavisi",
        sideEffects: ["Karaciğer hasarı (yüksek dozda)"],
        dosage: "500-1000 mg, 4-6 saatte bir",
        contraindications: ["Karaciğer yetmezliği"],
        interactions: ["Warfarin"],
        synonyms: ["Acetaminophen", "Tylenol"]
      }),
      this.createTerm({
        latinName: "Ibuprofen",
        turkishName: "İbuprofen",
        category: TermCategory.DRUG,
        definition: "Non-steroid anti-inflamatuar ilaç (NSAID). Ağrı, ateş ve inflamasyon tedavisinde kullanılır.",
        components: ["Propionic asit türevi"],
        relatedTerms: ["NSAID", "Anti-inflamatuar"],
        etymology: "Isobutyl-phenyl-propionic acid",
        usage: "Ağrı, ateş, inflamasyon, adet ağrısı",
        sideEffects: ["Mide ülseri", "Böbrek hasarı"],
        dosage: "200-400 mg, 6-8 saatte bir",
        contraindications: ["Mide ülseri", "Böbrek yetmezliği"],
        interactions: ["Aspirin", "Diüretikler"],
        synonyms: ["Advil", "Brufen"]
      }),
      this.createTerm({
        latinName: "Metformin",
        turkishName: "Metformin",
        category: TermCategory.DRUG,
        definition: "Tip 2 diyabet tedavisinde kullanılan oral antidiabetik ilaç. Kan şekerini düşürür.",
        components: ["Biguanid"],
        relatedTerms: ["Antidiabetik", "Biguanid"],
        etymology: "Methyl-biguanide",
        usage: "Tip 2 diyabet tedavisi",
        sideEffects: ["Mide bulantısı", "İshal", "Laktik asidoz"],
        dosage: "500-2000 mg/gün",
        contraindications: ["Böbrek yetmezliği", "Karaciğer yetmezliği"],
        interactions: ["Alkol"],
        synonyms: ["Glucophage"]
      }),
      this.createTerm({
        latinName: "Amoxicillin",
        turkishName: "Amoksisilin",
        category: TermCategory.DRUG,
        definition: "Geniş spektrumlu beta-laktam antibiyotik. Bakteriyel enfeksiyonların tedavisinde kullanılır.",
        components: ["Beta-laktam halkası", "Amin grubu"],
        relatedTerms: ["Antibiyotik", "Penisilin"],
        etymology: "Amino-hydroxy-benzyl-penicillin",
        usage: "Bakteriyel enfeksiyonlar, solunum yolu enfeksiyonları",
        sideEffects: ["İshal", "Alerjik reaksiyon", "Candida enfeksiyonu"],
        dosage: "250-500 mg, 8 saatte bir",
        contraindications: ["Penisilin alerjisi"],
        interactions: ["Oral kontraseptifler"],
        synonyms: ["Amoxil"]
      }),
      this.createTerm({
        latinName: "Omeprazole",
        turkishName: "Omeprazol",
        category: TermCategory.DRUG,
        definition: "Proton pompa inhibitörü (PPI). Mide asidi üretimini azaltarak mide ülseri ve reflü tedavisinde kullanılır.",
        components: ["Benzimidazol türevi"],
        relatedTerms: ["Proton pompa inhibitörü", "Antiasit"],
        etymology: "Ome- (omeprazole) + -prazole (benzimidazol sonek)",
        usage: "Mide ülseri, gastroözofageal reflü hastalığı (GÖRH), Zollinger-Ellison sendromu",
        sideEffects: ["Baş ağrısı", "İshal", "Karın ağrısı"],
        dosage: "20-40 mg/gün, sabah aç karnına",
        contraindications: ["Omeprazole alerjisi"],
        interactions: ["Warfarin", "Diazepam", "Phenytoin"],
        synonyms: ["Losec", "Prilosec"]
      }),
      this.createTerm({
        latinName: "Atorvastatin",
        turkishName: "Atorvastatin",
        category: TermCategory.DRUG,
        definition: "HMG-CoA redüktaz inhibitörü (statin). Kolesterol sentezini engelleyerek kan kolesterol seviyesini düşürür.",
        components: ["Statin grubu"],
        relatedTerms: ["Statin", "Kolesterol düşürücü"],
        etymology: "Ato- (atorvastatin) + -statin (HMG-CoA redüktaz inhibitörü)",
        usage: "Hiperkolesterolemi, kardiyovasküler hastalık önleme",
        sideEffects: ["Kas ağrısı", "Karaciğer enzim yükselmesi", "Rhabdomiyoliz (nadir)"],
        dosage: "10-80 mg/gün, akşam yemeği ile",
        contraindications: ["Aktif karaciğer hastalığı", "Hamilelik"],
        interactions: ["Eritromisin", "Siklosporin", "Greyfurt suyu"],
        synonyms: ["Lipitor"]
      }),
      this.createTerm({
        latinName: "Lisinopril",
        turkishName: "Lizinopril",
        category: TermCategory.DRUG,
        definition: "ACE inhibitörü (anjiyotensin dönüştürücü enzim inhibitörü). Kan basıncını düşürür ve kalp yetmezliğinde kullanılır.",
        components: ["ACE inhibitörü"],
        relatedTerms: ["Antihipertansif", "ACE inhibitörü"],
        etymology: "Lysine + -pril (ACE inhibitörü sonek)",
        usage: "Hipertansiyon, kalp yetmezliği, diyabetik nefropati",
        sideEffects: ["Öksürük", "Baş dönmesi", "Hiperkalemi"],
        dosage: "5-40 mg/gün",
        contraindications: ["Hamilelik", "Bilateral renal arter stenozu"],
        interactions: ["Potasyum takviyeleri", "Diüretikler"],
        synonyms: ["Prinivil", "Zestril"]
      }),
      this.createTerm({
        latinName: "Metoprolol",
        turkishName: "Metoprolol",
        category: TermCategory.DRUG,
        definition: "Beta-1 adrenerjik reseptör blokeri. Kalp hızını yavaşlatır, kan basıncını düşürür ve anjina tedavisinde kullanılır.",
        components: ["Beta bloker"],
        relatedTerms: ["Beta bloker", "Antihipertansif"],
        etymology: "Meto- (metoprolol) + -prolol (beta bloker sonek)",
        usage: "Hipertansiyon, anjina pektoris, kalp ritim bozuklukları, kalp krizi sonrası",
        sideEffects: ["Yorgunluk", "Soğuk el ve ayaklar", "Bradikardi"],
        dosage: "50-200 mg/gün, iki dozda",
        contraindications: ["Astım", "Kalp bloğu", "Şiddetli bradikardi"],
        interactions: ["Verapamil", "Diltiazem"],
        synonyms: ["Lopressor", "Toprol"]
      }),
      this.createTerm({
        latinName: "Amlodipine",
        turkishName: "Amlodipin",
        category: TermCategory.DRUG,
        definition: "Kalsiyum kanal blokeri. Kan damarlarını genişleterek kan basıncını düşürür ve anjina tedavisinde kullanılır.",
        components: ["Dihidropiridin"],
        relatedTerms: ["Kalsiyum kanal blokeri", "Antihipertansif"],
        etymology: "Amlo- (amlodipine) + -dipine (dihidropiridin sonek)",
        usage: "Hipertansiyon, anjina pektoris, koroner arter hastalığı",
        sideEffects: ["Baş dönmesi", "Yüz kızarması", "Ayak bileği ödemi"],
        dosage: "5-10 mg/gün",
        contraindications: ["Şiddetli aort stenozu"],
        interactions: ["Greyfurt suyu"],
        synonyms: ["Norvasc"]
      }),
      this.createTerm({
        latinName: "Levothyroxine",
        turkishName: "Levotiroksin",
        category: TermCategory.DRUG,
        definition: "Tiroid hormonu replasman tedavisi. Hipotiroidizm (tiroid yetmezliği) tedavisinde kullanılır.",
        components: ["L-tiroksin"],
        relatedTerms: ["Tiroid hormonu", "Hormon replasmanı"],
        etymology: "Levo- (sol) + thyroxine (tiroksin)",
        usage: "Hipotiroidizm, tiroid kanseri sonrası, guatr",
        sideEffects: ["Hipertiroidizm belirtileri (aşırı dozda)", "Kalp çarpıntısı"],
        dosage: "25-200 mcg/gün, aç karnına",
        contraindications: ["Hipertiroidizm", "Akut miyokard enfarktüsü"],
        interactions: ["Demir", "Kalsiyum", "Soya"],
        synonyms: ["L-T4", "Synthroid", "Euthyrox"]
      }),
      this.createTerm({
        latinName: "Azithromycin",
        turkishName: "Azitromisin",
        category: TermCategory.DRUG,
        definition: "Makrolid grubu antibiyotik. Geniş spektrumlu bakteriyel enfeksiyon tedavisinde kullanılır.",
        components: ["Makrolid"],
        relatedTerms: ["Antibiyotik", "Makrolid"],
        etymology: "Azi- (azithromycin) + -thromycin (makrolid sonek)",
        usage: "Solunum yolu enfeksiyonları, cilt enfeksiyonları, cinsel yolla bulaşan hastalıklar",
        sideEffects: ["İshal", "Mide bulantısı", "Karın ağrısı"],
        dosage: "500 mg/gün, 3-5 gün",
        contraindications: ["Makrolid alerjisi", "Karaciğer yetmezliği"],
        interactions: ["Warfarin", "Digoksin"],
        synonyms: ["Zithromax", "Z-Pak"]
      }),
      this.createTerm({
        latinName: "Ciprofloxacin",
        turkishName: "Siprofloksasin",
        category: TermCategory.DRUG,
        definition: "Florokinolon grubu geniş spektrumlu antibiyotik. Çeşitli bakteriyel enfeksiyonların tedavisinde kullanılır.",
        components: ["Florokinolon"],
        relatedTerms: ["Antibiyotik", "Florokinolon"],
        etymology: "Cipro- (ciprofloxacin) + -floxacin (florokinolon sonek)",
        usage: "İdrar yolu enfeksiyonları, solunum yolu enfeksiyonları, kemik enfeksiyonları",
        sideEffects: ["Tendon hasarı", "Fototoksisite", "QT uzaması"],
        dosage: "250-750 mg, 12 saatte bir",
        contraindications: ["Hamilelik", "18 yaş altı", "Tendon bozukluğu öyküsü"],
        interactions: ["Antasitler", "Teofilin", "Warfarin"],
        synonyms: ["Cipro"]
      }),
      this.createTerm({
        latinName: "Sertraline",
        turkishName: "Sertralin",
        category: TermCategory.DRUG,
        definition: "Seçici serotonin geri alım inhibitörü (SSRI). Depresyon, anksiyete ve obsesif-kompulsif bozukluk tedavisinde kullanılır.",
        components: ["SSRI"],
        relatedTerms: ["Antidepresan", "SSRI"],
        etymology: "Ser- (serotonin) + -traline (SSRI sonek)",
        usage: "Depresyon, panik bozukluğu, obsesif-kompulsif bozukluk, travma sonrası stres bozukluğu",
        sideEffects: ["Mide bulantısı", "Uykusuzluk", "Cinsel işlev bozukluğu"],
        dosage: "50-200 mg/gün",
        contraindications: ["MAO inhibitörü kullanımı", "Pimozid"],
        interactions: ["MAO inhibitörleri", "Warfarin", "Triptanlar"],
        synonyms: ["Zoloft"]
      }),
      this.createTerm({
        latinName: "Warfarin",
        turkishName: "Varfarin",
        category: TermCategory.DRUG,
        definition: "Oral antikoagülan. Kan pıhtılaşmasını önleyerek tromboembolik olayların tedavi ve önlenmesinde kullanılır.",
        components: ["Kumarin türevi"],
        relatedTerms: ["Antikoagülan", "Kan inceltici"],
        etymology: "Wisconsin Alumni Research Foundation + -arin (kumarin)",
        usage: "Atriyal fibrilasyon, derin ven trombozu, pulmoner emboli, kalp kapak protezi",
        sideEffects: ["Kanama", "Morarma", "Cilt nekrozu (nadir)"],
        dosage: "2-10 mg/gün, INR'ye göre ayarlanır",
        contraindications: ["Aktif kanama", "Hamilelik", "Ciddi karaciğer hastalığı"],
        interactions: ["Aspirin", "NSAID'ler", "Antibiyotikler", "Vitamin K"],
        synonyms: ["Coumadin"]
      }),
      this.createTerm({
        latinName: "Furosemide",
        turkishName: "Furosemid",
        category: TermCategory.DRUG,
        definition: "Loop diüretik. Böbreklerden su ve tuz atılımını artırarak ödem ve yüksek tansiyon tedavisinde kullanılır.",
        components: ["Sülfonamid türevi"],
        relatedTerms: ["Diüretik", "Loop diüretik"],
        etymology: "Fur- (furosemide) + -osemide (diüretik sonek)",
        usage: "Ödem, kalp yetmezliği, böbrek yetmezliği, hipertansiyon",
        sideEffects: ["Dehidratasyon", "Elektrolit dengesizliği", "İşitme kaybı (yüksek dozda)"],
        dosage: "20-80 mg/gün, sabah",
        contraindications: ["Anüri", "Şiddetli hipokalemi"],
        interactions: ["Digoksin", "Aminoglikozitler", "Lityum"],
        synonyms: ["Lasix"]
      }),
      this.createTerm({
        latinName: "Pantoprazole",
        turkishName: "Pantoprazol",
        category: TermCategory.DRUG,
        definition: "Proton pompa inhibitörü (PPI). Mide asidi üretimini azaltarak mide ülseri ve reflü tedavisinde kullanılır.",
        components: ["Benzimidazol türevi"],
        relatedTerms: ["Proton pompa inhibitörü", "Antiasit"],
        etymology: "Panto- (pantoprazole) + -prazole (benzimidazol sonek)",
        usage: "Mide ülseri, gastroözofageal reflü hastalığı (GÖRH), Zollinger-Ellison sendromu",
        sideEffects: ["Baş ağrısı", "İshal", "Karın ağrısı"],
        dosage: "40 mg/gün, sabah aç karnına",
        contraindications: ["Pantoprazole alerjisi"],
        interactions: ["Warfarin", "Ketokonazol"],
        synonyms: ["Protonix"]
      }),
      this.createTerm({
        latinName: "Tramadol",
        turkishName: "Tramadol",
        category: TermCategory.DRUG,
        definition: "Opioid analjezik. Orta-şiddetli ağrı tedavisinde kullanılır. Bağımlılık potansiyeli düşüktür.",
        components: ["Opioid"],
        relatedTerms: ["Analjezik", "Opioid"],
        etymology: "Tram- (tramadol) + -adol (opioid sonek)",
        usage: "Orta-şiddetli ağrı, kronik ağrı, postoperatif ağrı",
        sideEffects: ["Bulantı", "Baş dönmesi", "Kabızlık", "Bağımlılık riski"],
        dosage: "50-100 mg, 4-6 saatte bir",
        contraindications: ["Akut alkol zehirlenmesi", "Opioid bağımlılığı"],
        interactions: ["SSRI'ler", "MAO inhibitörleri", "Karbamazepin"],
        synonyms: ["Ultram"]
      }),
      this.createTerm({
        latinName: "Montelukast",
        turkishName: "Montelukast",
        category: TermCategory.DRUG,
        definition: "Lökotrien reseptör antagonisti. Astım ve alerjik rinit tedavisinde kullanılır.",
        components: ["Lökotrien antagonisti"],
        relatedTerms: ["Astım ilacı", "Antialerjik"],
        etymology: "Monte- (montelukast) + -lukast (lökotrien antagonisti sonek)",
        usage: "Astım, alerjik rinit, egzersiz kaynaklı bronkospazm",
        sideEffects: ["Baş ağrısı", "Karın ağrısı", "Ruh hali değişiklikleri (nadir)"],
        dosage: "10 mg/gün, akşam",
        contraindications: ["Montelukast alerjisi"],
        interactions: ["Fenobarbital", "Rifampin"],
        synonyms: ["Singulair"]
      }),
      this.createTerm({
        latinName: "Losartan",
        turkishName: "Losartan",
        category: TermCategory.DRUG,
        definition: "Anjiyotensin II reseptör blokeri (ARB). Kan basıncını düşürür ve böbrek koruyucu etki gösterir.",
        components: ["ARB"],
        relatedTerms: ["Antihipertansif", "ARB"],
        etymology: "Los- (losartan) + -artan (ARB sonek)",
        usage: "Hipertansiyon, diyabetik nefropati, kalp yetmezliği",
        sideEffects: ["Baş dönmesi", "Yorgunluk", "Hiperkalemi"],
        dosage: "25-100 mg/gün",
        contraindications: ["Hamilelik", "Bilateral renal arter stenozu"],
        interactions: ["Potasyum takviyeleri", "NSAID'ler"],
        synonyms: ["Cozaar"]
      }),
      this.createTerm({
        latinName: "Clopidogrel",
        turkishName: "Klopidogrel",
        category: TermCategory.DRUG,
        definition: "Trombosit agregasyon inhibitörü. Kan pıhtılaşmasını önleyerek kardiyovasküler olayları önler.",
        components: ["Tiyenopiridin"],
        relatedTerms: ["Antiplatelet", "Kan inceltici"],
        etymology: "Clopi- (clopidogrel) + -dogrel (tiyenopiridin sonek)",
        usage: "Akut koroner sendrom, miyokard enfarktüsü sonrası, inme önleme",
        sideEffects: ["Kanama", "Morarma", "Trombositopeni (nadir)"],
        dosage: "75 mg/gün",
        contraindications: ["Aktif kanama", "Şiddetli karaciğer yetmezliği"],
        interactions: ["Warfarin", "NSAID'ler", "Proton pompa inhibitörleri"],
        synonyms: ["Plavix"]
      }),
      this.createTerm({
        latinName: "Gabapentin",
        turkishName: "Gabapentin",
        category: TermCategory.DRUG,
        definition: "Antikonvülzan ve nöropatik ağrı ilacı. Epilepsi ve nöropatik ağrı tedavisinde kullanılır.",
        components: ["GABA analoğu"],
        relatedTerms: ["Antikonvülzan", "Nöropatik ağrı"],
        etymology: "Gaba- (GABA) + -pentin (antikonvülzan sonek)",
        usage: "Epilepsi, nöropatik ağrı, fibromiyalji, huzursuz bacak sendromu",
        sideEffects: ["Baş dönmesi", "Yorgunluk", "Koordinasyon bozukluğu"],
        dosage: "300-3600 mg/gün, üç dozda",
        contraindications: ["Gabapentin alerjisi"],
        interactions: ["Alkol", "Opioidler"],
        synonyms: ["Neurontin"]
      }),
      this.createTerm({
        latinName: "Duloxetine",
        turkishName: "Duloksetin",
        category: TermCategory.DRUG,
        definition: "Serotonin-norepinefrin geri alım inhibitörü (SNRI). Depresyon, anksiyete ve nöropatik ağrı tedavisinde kullanılır.",
        components: ["SNRI"],
        relatedTerms: ["Antidepresan", "SNRI"],
        etymology: "Dulo- (duloxetine) + -xetine (SNRI sonek)",
        usage: "Depresyon, anksiyete, nöropatik ağrı, fibromiyalji",
        sideEffects: ["Mide bulantısı", "Baş dönmesi", "Uykusuzluk"],
        dosage: "30-120 mg/gün",
        contraindications: ["MAO inhibitörü kullanımı", "Glokom"],
        interactions: ["MAO inhibitörleri", "Triptanlar", "NSAID'ler"],
        synonyms: ["Cymbalta"]
      }),
      this.createTerm({
        latinName: "Rosuvastatin",
        turkishName: "Rosuvastatin",
        category: TermCategory.DRUG,
        definition: "HMG-CoA redüktaz inhibitörü (statin). Kolesterol sentezini engelleyerek kan kolesterol seviyesini düşürür.",
        components: ["Statin grubu"],
        relatedTerms: ["Statin", "Kolesterol düşürücü"],
        etymology: "Rosu- (rosuvastatin) + -statin (HMG-CoA redüktaz inhibitörü)",
        usage: "Hiperkolesterolemi, kardiyovasküler hastalık önleme",
        sideEffects: ["Kas ağrısı", "Karaciğer enzim yükselmesi", "Rhabdomiyoliz (nadir)"],
        dosage: "5-40 mg/gün, akşam yemeği ile",
        contraindications: ["Aktif karaciğer hastalığı", "Hamilelik"],
        interactions: ["Eritromisin", "Siklosporin"],
        synonyms: ["Crestor"]
      }),
      this.createTerm({
        latinName: "Tamsulosin",
        turkishName: "Tamsulosin",
        category: TermCategory.DRUG,
        definition: "Alfa-1 adrenerjik reseptör antagonisti. Prostat büyümesi (BPH) ve idrar yolu problemlerinin tedavisinde kullanılır.",
        components: ["Alfa bloker"],
        relatedTerms: ["Alfa bloker", "BPH tedavisi"],
        etymology: "Tam- (tamsulosin) + -sulosin (alfa bloker sonek)",
        usage: "Benign prostat hiperplazisi (BPH), idrar retansiyonu",
        sideEffects: ["Baş dönmesi", "Retrograde ejakülasyon", "Düşük tansiyon"],
        dosage: "0.4 mg/gün, akşam yemeği ile",
        contraindications: ["Tamsulosin alerjisi"],
        interactions: ["Sildenafil", "Tadalafil"],
        synonyms: ["Flomax"]
      }),
    ];
  }

  private createPlantTerms(): PharmacyTerm[] {
    return [
      this.createTerm({
        latinName: "Aloe vera",
        turkishName: "Aloe vera",
        category: TermCategory.PLANT,
        definition: "Yapraklarından jel çıkarılan, yanık ve cilt problemlerinde kullanılan şifalı bitki.",
        components: ["Aloin", "Polisakkaritler", "Vitaminler"],
        relatedTerms: ["Şifalı bitki", "Cilt bakımı"],
        etymology: "Arapça alloeh (acı madde) + Latince vera (gerçek)",
        usage: "Yanık tedavisi, cilt bakımı, sindirim sorunları",
        sideEffects: ["Alerjik reaksiyon (nadir)"],
        dosage: "Jel olarak topikal uygulama",
        contraindications: ["Alerji"],
        interactions: ["Diüretikler"],
        synonyms: ["Sarısabır", "Tıbbi aloe"]
      }),
      this.createTerm({
        latinName: "Ginkgo biloba",
        turkishName: "Ginkgo biloba",
        category: TermCategory.PLANT,
        definition: "Bellek ve dolaşım sistemi için kullanılan, en eski ağaç türlerinden biri.",
        components: ["Ginkgolidler", "Flavonoidler"],
        relatedTerms: ["Nootropik", "Dolaşım"],
        etymology: "Japonca ginkyo (gümüş kayısı) + Latince biloba (iki loblu)",
        usage: "Bellek desteği, dolaşım problemleri",
        sideEffects: ["Baş ağrısı", "Mide rahatsızlığı"],
        dosage: "120-240 mg/gün",
        contraindications: ["Kanama bozuklukları"],
        interactions: ["Antikoagülanlar"],
        synonyms: ["Mabet ağacı"]
      }),
      this.createTerm({
        latinName: "Echinacea purpurea",
        turkishName: "Ekinezya",
        category: TermCategory.PLANT,
        definition: "Bağışıklık sistemini güçlendiren, soğuk algınlığı tedavisinde kullanılan bitki.",
        components: ["Ekinakozid", "Polisakkaritler"],
        relatedTerms: ["İmmünomodülatör", "Soğuk algınlığı"],
        etymology: "Yunanca echinos (kirpi) - dikenli yaprakları nedeniyle",
        usage: "Bağışıklık desteği, soğuk algınlığı",
        sideEffects: ["Alerjik reaksiyon (nadir)"],
        dosage: "300-500 mg, günde 3 kez",
        contraindications: ["Otoimmün hastalıklar"],
        interactions: ["İmmünosupresanlar"],
        synonyms: ["Mor koni çiçeği"]
      }),
      this.createTerm({
        latinName: "Panax ginseng",
        turkishName: "Ginseng",
        category: TermCategory.PLANT,
        definition: "Enerji ve dayanıklılığı artıran, adaptojen özellikli kök bitkisi.",
        components: ["Ginsenosidler", "Polisakkaritler"],
        relatedTerms: ["Adaptojen", "Enerji"],
        etymology: "Yunanca panax (tüm hastalıkları iyileştiren)",
        usage: "Enerji desteği, stres yönetimi, fiziksel performans",
        sideEffects: ["Uykusuzluk", "Yüksek tansiyon"],
        dosage: "200-400 mg/gün",
        contraindications: ["Yüksek tansiyon", "Hamilelik"],
        interactions: ["Antikoagülanlar", "Kafein"],
        synonyms: ["Kore ginsengi", "Asya ginsengi"]
      }),
    ];
  }

  private createInsectTerms(): PharmacyTerm[] {
    return [
      this.createTerm({
        latinName: "Galleria mellonella",
        turkishName: "Balmumu Güvesi",
        category: TermCategory.INSECT,
        definition: "Arı kovanlarında yaşayan, balmumu ile beslenen güve türü. Tıbbi araştırmalarda model organizma olarak kullanılır.",
        components: ["Balmumu", "Proteinler"],
        relatedTerms: ["Arı", "Model organizma"],
        etymology: "Latince galleria (galeri) + mellonella (bal)",
        usage: "Tıbbi araştırmalar, enfeksiyon modelleri",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Büyük balmumu güvesi"]
      }),
      this.createTerm({
        latinName: "Alphitobius diaperinus",
        turkishName: "Kümes Böceği",
        category: TermCategory.INSECT,
        definition: "Kümes hayvanlarında ve tahıl depolama alanlarında bulunan, protein kaynağı olarak kullanılan böcek.",
        components: ["Protein", "Yağ", "Kitin"],
        relatedTerms: ["Protein kaynağı", "Alternatif gıda"],
        etymology: "Yunanca alphiton (un) + bios (yaşam)",
        usage: "Alternatif protein kaynağı, hayvan yemi",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Küçük kara böcek", "Un böceği"]
      }),
      this.createTerm({
        latinName: "Tenebrio molitor",
        turkishName: "Un Kurdu",
        category: TermCategory.INSECT,
        definition: "Yüksek protein içeriği nedeniyle alternatif gıda kaynağı olarak kullanılan böcek türü.",
        components: ["Protein", "Yağ", "Fiber"],
        relatedTerms: ["Alternatif protein", "Sürdürülebilir gıda"],
        etymology: "Latince tenebrio (karanlık) + molitor (değirmenci)",
        usage: "Alternatif protein kaynağı, hayvan yemi, insan gıdası",
        sideEffects: ["Alerji (nadir)"],
        dosage: "",
        contraindications: ["Kabuklu deniz ürünleri alerjisi"],
        interactions: [],
        synonyms: ["Mealworm", "Un kurdu"]
      }),
      this.createTerm({
        latinName: "Apis mellifera",
        turkishName: "Bal Arısı",
        category: TermCategory.INSECT,
        definition: "Bal, propolis ve arı sütü üreten, tıbbi açıdan değerli ürünler sağlayan sosyal böcek.",
        components: ["Bal", "Propolis", "Arı sütü", "Balmumu"],
        relatedTerms: ["Bal", "Propolis", "Apiterapi"],
        etymology: "Latince apis (arı) + mellifera (bal taşıyan)",
        usage: "Apiterapi, doğal antibakteriyel, bağışıklık desteği",
        sideEffects: ["Alerjik reaksiyon (arı sokması)"],
        dosage: "",
        contraindications: ["Arı alerjisi"],
        interactions: [],
        synonyms: ["Bal arısı", "Avrupa bal arısı"]
      }),
    ];
  }

  private createComponentTerms(): PharmacyTerm[] {
    return [
      this.createTerm({
        latinName: "Caffeine",
        turkishName: "Kafein",
        category: TermCategory.COMPONENT,
        definition: "Merkezi sinir sistemini uyaran, uyanıklığı artıran doğal alkaloid. Kahve, çay ve kola içeceklerinde bulunur.",
        components: ["Metilksantin"],
        relatedTerms: ["Uyarıcı", "Alkaloid"],
        etymology: "Almanca Kaffee (kahve) + -in (kimyasal sonek)",
        usage: "Uyanıklık, performans artışı, baş ağrısı tedavisi",
        sideEffects: ["Uykusuzluk", "Anksiyete", "Kalp çarpıntısı"],
        dosage: "100-200 mg (1-2 fincan kahve)",
        contraindications: ["Yüksek tansiyon", "Anksiyete bozukluğu"],
        interactions: ["Teofilin", "Ephedrine"],
        synonyms: ["1,3,7-trimetilksantin", "Guaranin"]
      }),
      this.createTerm({
        latinName: "Curcumin",
        turkishName: "Kurkumin",
        category: TermCategory.COMPONENT,
        definition: "Zerdeçalın aktif bileşeni. Güçlü anti-inflamatuar ve antioksidan özelliklere sahiptir.",
        components: ["Diferuloilmetan"],
        relatedTerms: ["Anti-inflamatuar", "Antioksidan"],
        etymology: "Latince Curcuma (zerdeçal) + -in",
        usage: "İnflamasyon tedavisi, eklem sağlığı, antioksidan",
        sideEffects: ["Mide rahatsızlığı (yüksek dozda)"],
        dosage: "500-1000 mg/gün",
        contraindications: ["Safra taşı"],
        interactions: ["Antikoagülanlar"],
        synonyms: ["Diferuloilmetan"]
      }),
      this.createTerm({
        latinName: "Quercetin",
        turkishName: "Kersetin",
        category: TermCategory.COMPONENT,
        definition: "Soğan, elma ve çayda bulunan, antioksidan ve anti-inflamatuar özellikli flavonoid.",
        components: ["Flavonol"],
        relatedTerms: ["Flavonoid", "Antioksidan"],
        etymology: "Latince quercus (meşe) - meşe ağacında bulunur",
        usage: "Antioksidan, alerji tedavisi, kardiyovasküler sağlık",
        sideEffects: ["Nadir"],
        dosage: "500-1000 mg/gün",
        contraindications: [],
        interactions: ["Antibiyotikler"],
        synonyms: ["3,3',4',5,7-pentahidroksiflavon"]
      }),
    ];
  }

  private createDiseaseTerms(): PharmacyTerm[] {
    return [
      this.createTerm({
        latinName: "Diabetes mellitus",
        turkishName: "Diyabet",
        category: TermCategory.DISEASE,
        definition: "Kan şekeri seviyesinin yükselmesi ile karakterize kronik metabolik hastalık. Tip 1 ve Tip 2 olmak üzere iki ana tipi vardır.",
        components: ["İnsülin eksikliği", "Glukoz intoleransı"],
        relatedTerms: ["Metabolik hastalık", "İnsülin"],
        etymology: "Yunanca diabetes (sifon) + mellitus (tatlı)",
        usage: "Kan şekeri kontrolü, diyet, ilaç tedavisi",
        sideEffects: ["Hipoglisemi", "Hiperglisemi", "Komplikasyonlar"],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Şeker hastalığı", "DM"]
      }),
      this.createTerm({
        latinName: "Hypertension",
        turkishName: "Hipertansiyon",
        category: TermCategory.DISEASE,
        definition: "Kan basıncının sürekli olarak yüksek seyrettiği kardiyovasküler hastalık.",
        components: ["Yüksek kan basıncı"],
        relatedTerms: ["Kardiyovasküler", "Kan basıncı"],
        etymology: "Yunanca hyper (aşırı) + tension (gerilim)",
        usage: "Tansiyon kontrolü, yaşam tarzı değişiklikleri, ilaç tedavisi",
        sideEffects: ["İnme riski", "Kalp hastalığı"],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Yüksek tansiyon", "HT"]
      }),
      this.createTerm({
        latinName: "Asthma",
        turkishName: "Astım",
        category: TermCategory.DISEASE,
        definition: "Hava yollarının daralması ve iltihaplanması ile karakterize kronik solunum yolu hastalığı.",
        components: ["Hava yolu inflamasyonu", "Bronkospazm"],
        relatedTerms: ["Solunum", "İnflamasyon"],
        etymology: "Yunanca asthma (nefes darlığı)",
        usage: "Bronkodilatörler, kortikosteroidler, yaşam tarzı",
        sideEffects: ["Nefes darlığı", "Öksürük", "Hışıltı"],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Bronşiyal astım"]
      }),
    ];
  }

  private createAnatomyTerms(): PharmacyTerm[] {
    return [
      this.createTerm({
        latinName: "Hamstrings",
        turkishName: "Hamstring Kasları",
        category: TermCategory.ANATOMY,
        definition: "Uyluğun arka kısmında bulunan, diz fleksiyonu ve kalça ekstansiyonundan sorumlu üç kas grubu.",
        components: ["Biceps femoris", "Semitendinosus", "Semimembranosus"],
        relatedTerms: ["Kas", "Uyluk", "Diz"],
        etymology: "İngilizce ham (jambon) + string (ip) - kasların görünümü nedeniyle",
        usage: "Yürüme, koşma, diz bükme",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Uyluk arka kasları", "Femur arka kasları"]
      }),
      this.createTerm({
        latinName: "Internal oblique",
        turkishName: "İç Eğik Kas",
        category: TermCategory.ANATOMY,
        definition: "Karın duvarında bulunan, gövde rotasyonu ve lateral fleksiyondan sorumlu kas.",
        components: ["Kas lifleri"],
        relatedTerms: ["Karın kası", "Gövde"],
        etymology: "Latince internus (iç) + obliquus (eğik)",
        usage: "Gövde rotasyonu, lateral fleksiyon, karın basıncı",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Obliquus internus abdominis"]
      }),
      this.createTerm({
        latinName: "Quadriceps femoris",
        turkishName: "Dört Başlı Uyluk Kası",
        category: TermCategory.ANATOMY,
        definition: "Uyluğun ön kısmında bulunan, diz ekstansiyonundan sorumlu dört başlı kas grubu.",
        components: ["Rectus femoris", "Vastus lateralis", "Vastus medialis", "Vastus intermedius"],
        relatedTerms: ["Uyluk", "Diz", "Kas"],
        etymology: "Latince quadri (dört) + caput (baş) + femoris (uyluk)",
        usage: "Diz ekstansiyonu, yürüme, koşma",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Quadriceps", "Dörtlü kas"]
      }),
      this.createTerm({
        latinName: "Deltoid",
        turkishName: "Deltoid Kas",
        category: TermCategory.ANATOMY,
        definition: "Omuz eklemini örten, kolun yukarı kaldırılmasından sorumlu üçgen şeklindeki kas.",
        components: ["Anterior deltoid", "Medial deltoid", "Posterior deltoid"],
        relatedTerms: ["Omuz", "Kol", "Kas"],
        etymology: "Yunanca delta (üçgen) + -oid (benzer) - üçgen şekli nedeniyle",
        usage: "Kol elevasyonu, omuz abdüksiyonu",
        sideEffects: [],
        dosage: "",
        contraindications: [],
        interactions: [],
        synonyms: ["Deltoideus", "Omuz kası"]
      }),
    ];
  }

  private createVitaminTerms(): PharmacyTerm[] {
    return [
      this.createTerm({
        latinName: "Vitamin C",
        turkishName: "C Vitamini",
        category: TermCategory.VITAMIN,
        definition: "Askorbik asit olarak da bilinen, suda çözünen antioksidan vitamin. Bağışıklık sistemi için önemlidir.",
        components: ["Askorbik asit"],
        relatedTerms: ["Antioksidan", "Bağışıklık"],
        etymology: "Latince vita (hayat) + amine",
        usage: "Bağışıklık desteği, kolajen sentezi, demir emilimi",
        sideEffects: ["İshal (yüksek dozda)", "Böbrek taşı riski"],
        dosage: "75-90 mg/gün (kadın/erkek), 1000 mg/gün (maksimum)",
        contraindications: ["Böbrek taşı öyküsü"],
        interactions: ["Demir preparatları"],
        synonyms: ["Askorbik asit", "L-askorbik asit"]
      }),
      this.createTerm({
        latinName: "Vitamin D",
        turkishName: "D Vitamini",
        category: TermCategory.VITAMIN,
        definition: "Kalsiyum emilimi ve kemik sağlığı için gerekli yağda çözünen vitamin. Güneş ışığından sentezlenir.",
        components: ["Kolekalsiferol (D3)", "Ergokalsiferol (D2)"],
        relatedTerms: ["Kalsiyum", "Kemik sağlığı"],
        etymology: "Latince vita (hayat) + amine",
        usage: "Kemik sağlığı, kalsiyum emilimi, bağışıklık",
        sideEffects: ["Hiperkalsemi (aşırı dozda)"],
        dosage: "600-800 IU/gün (yetişkinler)",
        contraindications: ["Hiperkalsemi"],
        interactions: ["Kalsiyum takviyeleri"],
        synonyms: ["Kalsiferol", "Güneş vitamini"]
      }),
      this.createTerm({
        latinName: "Vitamin B12",
        turkishName: "B12 Vitamini",
        category: TermCategory.VITAMIN,
        definition: "Kobalamin olarak da bilinen, DNA sentezi ve sinir sistemi için gerekli suda çözünen vitamin.",
        components: ["Kobalamin"],
        relatedTerms: ["DNA sentezi", "Anemi"],
        etymology: "Latince vita (hayat) + amine",
        usage: "Anemi tedavisi, sinir sistemi sağlığı, DNA sentezi",
        sideEffects: ["Nadir (genellikle güvenli)"],
        dosage: "2.4 mcg/gün (yetişkinler)",
        contraindications: ["Kobalamin alerjisi (nadir)"],
        interactions: ["Metformin"],
        synonyms: ["Kobalamin", "Siyanokobalamin"]
      }),
      this.createTerm({
        latinName: "Folic acid",
        turkishName: "Folik asit",
        category: TermCategory.VITAMIN,
        definition: "B9 vitamini olarak da bilinen, hücre bölünmesi ve DNA sentezi için gerekli suda çözünen vitamin.",
        components: ["Pteroylmonoglutamik asit"],
        relatedTerms: ["DNA sentezi", "Hamilelik"],
        etymology: "Latince folium (yaprak) - yapraklı sebzelerde bulunur",
        usage: "Hamilelik öncesi ve sırasında, anemi tedavisi",
        sideEffects: ["Nadir"],
        dosage: "400 mcg/gün (yetişkinler), 600 mcg/gün (hamilelik)",
        contraindications: ["B12 eksikliği (maskelenebilir)"],
        interactions: ["Metotreksat"],
        synonyms: ["Folat", "B9 vitamini"]
      }),
    ];
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
      const jsonData = require('../data/pharmacyTerms.json');
      const terms: PharmacyTerm[] = [];

      // Map category names to TermCategory enum
      const categoryMap: { [key: string]: TermCategory } = {
        'drugs': TermCategory.DRUG,
        'plants': TermCategory.PLANT,
        'vitamins': TermCategory.VITAMIN,
        'minerals': TermCategory.MINERAL,
        'insects': TermCategory.INSECT,
        'components': TermCategory.COMPONENT,
        'diseases': TermCategory.DISEASE,
        'anatomy': TermCategory.ANATOMY,
      };

      // Process each category
      for (const [categoryKey, categoryValue] of Object.entries(categoryMap)) {
        if (jsonData[categoryKey] && Array.isArray(jsonData[categoryKey])) {
          jsonData[categoryKey].forEach((item: any) => {
            terms.push(this.createTerm({
              latinName: item.latinName,
              turkishName: item.turkishName,
              category: categoryValue,
              definition: item.definition || '',
              components: item.components || [],
              relatedTerms: item.relatedTerms || [],
              etymology: item.etymology,
              usage: item.usage,
              sideEffects: item.sideEffects || [],
              dosage: item.dosage,
              contraindications: item.contraindications || [],
              interactions: item.interactions || [],
              synonyms: item.synonyms || []
            }));
          });
        }
      }

      console.log(`📁 JSON data loaded: ${terms.length} terms`);
      if (terms.length > 0) {
        console.log(`📋 Sample JSON terms:`, terms.slice(0, 3).map(t => `${t.latinName} (${t.category})`));
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

      return data.results.map((drug: any) => {
        const genericName = drug.generic_name?.[0] || drug.brand_name?.[0] || "Unknown";
        return this.createTerm({
          latinName: genericName,
          turkishName: genericName,
          category: TermCategory.DRUG,
          definition: drug.indications_and_usage?.[0] || "FDA onaylı ilaç",
          components: [genericName],
          relatedTerms: ["FDA", "İlaç", "Tıbbi"],
          etymology: "Online API",
          usage: drug.indications_and_usage?.join("; ") || "",
          sideEffects: drug.warnings || [],
          dosage: "Doktor tavsiyesi",
          contraindications: drug.warnings || [],
          interactions: ["Diğer ilaçlar"],
          synonyms: drug.brand_name || []
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
        const existingNames = new Set(this.terms.map(t => t.latinName.toLowerCase()));
        const newTerms = apiTerms.filter(t => !existingNames.has(t.latinName.toLowerCase()));
        
        this.terms = [...this.terms, ...newTerms];
        console.log(`✅ ${newTerms.length} yeni ilaç eklendi (toplam: ${this.terms.length})`);
        return newTerms.length;
      }
      
      return 0;
    } catch (error) {
      console.error("❌ Error refreshing drugs from API:", error);
      return 0;
    }
  }

  private createTerm(data: Partial<PharmacyTerm> & {
    latinName: string;
    turkishName: string;
    category: TermCategory;
    definition: string;
  }): PharmacyTerm {
    return {
      id: uuidv4(),
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
      updatedAt: new Date()
    };
  }
}

// Singleton instance
export const pharmacyTermService = new PharmacyTermService();

