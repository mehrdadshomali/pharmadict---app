import { v4 as uuidv4 } from 'uuid';
import { PharmacyTerm } from '../models/PharmacyTerm.js';
import { TermCategory } from '../models/TermCategory.js';
import { createDrugTerms, createPlantTerms, createVitaminTerms, createMineralTerms, createInsectTerms, createComponentTerms, createDiseaseTerms, createAnatomyTerms } from '../data/pharmacyData.js';

class PharmacyTermService {
  constructor() {
    this.terms = [];
    this.bookmarkedTermIds = new Set();
    // Load bookmarks asynchronously (won't block constructor)
    this.loadBookmarks().catch(err => console.error('Error loading bookmarks in constructor:', err));
    this.loadComprehensiveData();
  }

  async loadBookmarks() {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const stored = await AsyncStorage.getItem('pharmadict_bookmarks');
      if (stored) {
        this.bookmarkedTermIds = new Set(JSON.parse(stored));
        // Update terms with bookmark status
        this.terms.forEach(term => {
          term.isBookmarked = this.bookmarkedTermIds.has(term.id);
        });
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  }

  async saveBookmarks() {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.setItem('pharmadict_bookmarks', JSON.stringify([...this.bookmarkedTermIds]));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }

  loadComprehensiveData() {
    // Load local data
    const localTerms = [
      ...createDrugTerms(),
      ...createPlantTerms(),
      ...createVitaminTerms(),
      ...createMineralTerms(),
      ...createInsectTerms(),
      ...createComponentTerms(),
      ...createDiseaseTerms(),
      ...createAnatomyTerms()
    ];

    this.terms = localTerms.map(term => {
      const termObj = new PharmacyTerm(term);
      termObj.isBookmarked = this.bookmarkedTermIds.has(termObj.id);
      return termObj;
    });

    console.log('📊 Initial terms loaded:', this.terms.length);

    // Load online data asynchronously
    this.loadOnlineData().then(onlineTerms => {
      onlineTerms.forEach(term => {
        term.isBookmarked = this.bookmarkedTermIds.has(term.id);
      });
      this.terms = [...this.terms, ...onlineTerms];
      console.log('📊 Online terms loaded:', onlineTerms.length);
      console.log('📊 Total terms:', this.terms.length);
    });
  }

  async loadOnlineData() {
    try {
      const onlineTerms = [];
      
      // Load drugs from OpenFDA API
      const drugs = await this.loadOnlineDrugs();
      onlineTerms.push(...drugs);

      // Load other categories (sample data for now)
      const plants = await this.loadOnlinePlants();
      const vitamins = await this.loadOnlineVitamins();
      const diseases = await this.loadOnlineDiseases();
      const anatomy = await this.loadOnlineAnatomy();
      const minerals = await this.loadOnlineMinerals();
      const insects = await this.loadOnlineInsects();

      onlineTerms.push(...plants, ...vitamins, ...diseases, ...anatomy, ...minerals, ...insects);

      return onlineTerms.map(data => new PharmacyTerm(data));
    } catch (error) {
      console.error('Error loading online data:', error);
      return [];
    }
  }

  async loadOnlineDrugs() {
    try {
      const response = await fetch('https://api.fda.gov/drug/label.json?limit=50');
      const data = await response.json();
      
      if (!data.results) return [];

      return data.results.map((drug, index) => {
        const genericName = drug.openfda?.generic_name?.[0] || 'Unknown';
        const brandName = drug.openfda?.brand_name?.[0] || genericName;
        const indications = drug.indications_and_usage?.[0] || 'Bilgi mevcut değil';
        const warnings = drug.warnings?.[0] || 'Bilgi mevcut değil';

        return {
          latinName: genericName,
          turkishName: brandName,
          category: TermCategory.DRUG,
          definition: `${indications.substring(0, 200)}${indications.length > 200 ? '...' : ''}`,
          components: drug.active_ingredient || [],
          usage: indications,
          sideEffects: warnings ? [warnings] : null,
          synonyms: drug.openfda?.brand_name || []
        };
      });
    } catch (error) {
      console.error('Error loading online drugs:', error);
      return [];
    }
  }

  async loadOnlinePlants() {
    // Sample plant data
    return [
      {
        latinName: 'Echinacea purpurea',
        turkishName: 'Ekinezya',
        category: TermCategory.PLANT,
        definition: 'Bağışıklık sistemini güçlendiren, soğuk algınlığı tedavisinde kullanılan bitki.',
        components: ['Echinacoside', 'Cichoric acid', 'Alkamides']
      }
    ];
  }

  async loadOnlineVitamins() {
    return [
      {
        latinName: 'Ascorbic Acid',
        turkishName: 'C Vitamini',
        category: TermCategory.VITAMIN,
        definition: 'Antioksidan özellikleri olan, bağışıklık sistemi için önemli suda çözünür vitamin.',
        components: ['Ascorbic acid']
      }
    ];
  }

  async loadOnlineDiseases() {
    return [
      {
        latinName: 'Diabetes Mellitus',
        turkishName: 'Diyabet',
        category: TermCategory.DISEASE,
        definition: 'Kan şekeri seviyelerinin yüksek olduğu kronik metabolik hastalık.',
        components: []
      }
    ];
  }

  async loadOnlineAnatomy() {
    // Comprehensive anatomy terms
    const anatomyTerms = [];
    
    // Cardiovascular System
    const cardiovascular = [
      { latin: 'Cor', turkish: 'Kalp', def: 'Kanı vücuda pompalayan kas organı' },
      { latin: 'Atrium', turkish: 'Atriyum', def: 'Kalbin üst odacıkları' },
      { latin: 'Ventriculus', turkish: 'Ventrikül', def: 'Kalbin alt odacıkları' },
      { latin: 'Arteria', turkish: 'Atardamar', def: 'Kalpten vücuda kan taşıyan damar' },
      { latin: 'Vena', turkish: 'Toplardamar', def: 'Vücuttan kalbe kan taşıyan damar' }
    ];

    // Respiratory System
    const respiratory = [
      { latin: 'Pulmo', turkish: 'Akciğer', def: 'Solunum organı' },
      { latin: 'Trachea', turkish: 'Nefes Borusu', def: 'Havayı akciğerlere taşıyan tüp' },
      { latin: 'Bronchus', turkish: 'Bronş', def: 'Akciğerlere açılan hava yolu dalları' }
    ];

    // Digestive System
    const digestive = [
      { latin: 'Stomachus', turkish: 'Mide', def: 'Yiyecekleri sindiren organ' },
      { latin: 'Intestinum', turkish: 'Bağırsak', def: 'Sindirim sisteminin bir parçası' },
      { latin: 'Hepar', turkish: 'Karaciğer', def: 'Metabolizma ve detoksifikasyon organı' }
    ];

    const allSystems = [...cardiovascular, ...respiratory, ...digestive];
    
    allSystems.forEach(({ latin, turkish, def }) => {
      anatomyTerms.push({
        latinName: latin,
        turkishName: turkish,
        category: TermCategory.ANATOMY,
        definition: def,
        components: []
      });
    });

    return anatomyTerms;
  }

  async loadOnlineMinerals() {
    const minerals = [
      { latin: 'Calcium', turkish: 'Kalsiyum', def: 'Kemik ve diş sağlığı için gerekli mineral' },
      { latin: 'Iron', turkish: 'Demir', def: 'Kırmızı kan hücrelerinde oksijen taşıyan mineral' },
      { latin: 'Zinc', turkish: 'Çinko', def: 'Bağışıklık sistemi için önemli eser element' }
    ];

    return minerals.map(m => ({
      latinName: m.latin,
      turkishName: m.turkish,
      category: TermCategory.MINERAL,
      definition: m.def,
      components: []
    }));
  }

  async loadOnlineInsects() {
    return [
      {
        latinName: 'Apis mellifera',
        turkishName: 'Bal Arısı',
        category: TermCategory.INSECT,
        definition: 'Bal üreten, tozlaşmada önemli rol oynayan böcek.',
        components: []
      }
    ];
  }

  getAllTerms() {
    return [...this.terms];
  }

  getTermsByCategory(category) {
    return this.terms.filter(term => term.category === category);
  }

  searchTerms(query, filter = {}) {
    if (!query || query.trim() === '') {
      return [];
    }

    const searchQuery = query.toLowerCase().trim();
    const results = [];

    this.terms.forEach(term => {
      // Apply filters
      if (filter.categories && !filter.categories.includes(term.category)) {
        return;
      }
      if (filter.onlyBookmarked && !term.isBookmarked) {
        return;
      }

      // Search in various fields
      const latinMatch = term.latinName.toLowerCase().includes(searchQuery);
      const turkishMatch = term.turkishName.toLowerCase().includes(searchQuery);
      const definitionMatch = term.definition.toLowerCase().includes(searchQuery);
      const synonymMatch = term.synonyms.some(s => s.toLowerCase().includes(searchQuery));
      const componentMatch = term.components.some(c => c.toLowerCase().includes(searchQuery));

      if (latinMatch || turkishMatch || definitionMatch || synonymMatch || componentMatch) {
        let matchType = 'partial';
        let highlightedText = term.latinName;

        if (latinMatch && term.latinName.toLowerCase() === searchQuery) {
          matchType = 'exact';
        } else if (synonymMatch) {
          matchType = 'synonym';
        } else if (componentMatch) {
          matchType = 'component';
        }

        results.push({
          id: uuidv4(),
          term,
          matchType,
          highlightedText
        });
      }
    });

    // Sort results
    if (filter.sortBy === 'Alfabetik') {
      results.sort((a, b) => a.term.latinName.localeCompare(b.term.latinName));
    } else if (filter.sortBy === 'Kategoriye Göre') {
      results.sort((a, b) => a.term.category.localeCompare(b.term.category));
    } else if (filter.sortBy === 'Son Eklenenler') {
      results.sort((a, b) => b.term.createdAt - a.term.createdAt);
    }

    return results;
  }

  getTermById(id) {
    return this.terms.find(term => term.id === id);
  }

  async getBookmarkedTerms() {
    // Ensure bookmark status is up to date
    this.terms.forEach(term => {
      term.isBookmarked = this.bookmarkedTermIds.has(term.id);
    });
    return this.terms.filter(term => term.isBookmarked);
  }

  async toggleBookmark(termId) {
    const term = this.getTermById(termId);
    if (!term) return false;

    if (this.bookmarkedTermIds.has(termId)) {
      this.bookmarkedTermIds.delete(termId);
      term.isBookmarked = false;
    } else {
      this.bookmarkedTermIds.add(termId);
      term.isBookmarked = true;
    }

    await this.saveBookmarks();
    return term.isBookmarked;
  }

  getRelatedTerms(term) {
    const related = [];
    term.relatedTerms.forEach(relatedName => {
      const found = this.terms.find(t => 
        t.latinName === relatedName || t.turkishName === relatedName
      );
      if (found) related.push(found);
    });
    return related;
  }
}

// Singleton instance
export const pharmacyTermService = new PharmacyTermService();

