// Drug API Service - İlaç verilerini API'lerden çeker
import type { PharmacyTerm } from '../types/models';
import { TermCategory } from '../types/models';
import { v4 as uuidv4 } from 'uuid';

export interface DrugAPIResult {
  success: boolean;
  terms: PharmacyTerm[];
  error?: string;
}

class DrugAPIService {
  // OpenFDA API - Ücretsiz, FDA onaylı ilaçlar
  private readonly OPENFDA_BASE_URL = 'https://api.fda.gov/drug/label.json';
  
  // RxNav API - İlaç bilgileri (alternatif)
  private readonly RXNAV_BASE_URL = 'https://rxnav.nlm.nih.gov/REST';
  
  // DrugBank API - Detaylı ilaç bilgileri (ücretsiz tier)
  private readonly DRUGBANK_BASE_URL = 'https://api.drugbankplus.com/v1';

  /**
   * OpenFDA API'den ilaç verilerini çeker
   */
  async fetchFromOpenFDA(limit: number = 50): Promise<DrugAPIResult> {
    try {
      console.log(`🌐 Fetching ${limit} drugs from OpenFDA API...`);
      
      const url = `${this.OPENFDA_BASE_URL}?limit=${limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`OpenFDA API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.results || !Array.isArray(data.results)) {
        return { success: false, terms: [], error: 'Invalid API response' };
      }

      const terms: PharmacyTerm[] = data.results
        .filter((drug: any) => drug.generic_name || drug.brand_name)
        .map((drug: any) => {
          const genericName = drug.generic_name?.[0] || drug.brand_name?.[0] || 'Unknown';
          const brandName = drug.brand_name?.[0] || genericName;
          
          return {
            id: uuidv4(),
            latinName: genericName,
            turkishName: genericName, // API'den Türkçe gelmiyor, generic name kullanıyoruz
            category: TermCategory.DRUG,
            definition: drug.indications_and_usage?.[0] || 
                       drug.description?.[0] || 
                       drug.purpose?.[0] || 
                       'FDA onaylı ilaç',
            components: drug.active_ingredient?.map((ing: any) => ing.name || ing) || [genericName],
            relatedTerms: ['FDA', 'İlaç', 'Tıbbi'],
            etymology: 'OpenFDA API',
            usage: drug.indications_and_usage?.join('; ') || 
                   drug.purpose?.join('; ') || 
                   'Tıbbi kullanım',
            sideEffects: drug.warnings || 
                        drug.adverse_reactions || 
                        drug.boxed_warning || 
                        [],
            dosage: drug.dosage_and_administration?.[0] || 
                   drug.dosage_forms_and_strengths?.[0] || 
                   'Doktor tavsiyesi',
            contraindications: drug.contraindications || 
                             drug.warnings || 
                             [],
            interactions: drug.drug_interactions?.map((inter: any) => inter.name || inter) || 
                        ['Diğer ilaçlar'],
            synonyms: drug.brand_name || [brandName],
            isBookmarked: false,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        });

      console.log(`✅ OpenFDA: ${terms.length} drugs loaded`);
      return { success: true, terms };
      
    } catch (error) {
      console.error('❌ OpenFDA API error:', error);
      return { 
        success: false, 
        terms: [], 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * RxNav API'den ilaç araması yapar
   */
  async searchRxNav(query: string): Promise<DrugAPIResult> {
    try {
      console.log(`🔍 Searching RxNav for: ${query}`);
      
      // RxNav drug name search
      const searchUrl = `${this.RXNAV_BASE_URL}/drugs.json?name=${encodeURIComponent(query)}`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`RxNav API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.drugGroup?.conceptGroup) {
        return { success: false, terms: [], error: 'No results found' };
      }

      const terms: PharmacyTerm[] = [];
      
      // RxNav response structure
      data.drugGroup.conceptGroup.forEach((group: any) => {
        if (group.conceptProperties) {
          group.conceptProperties.forEach((drug: any) => {
            terms.push({
              id: uuidv4(),
              latinName: drug.name || query,
              turkishName: drug.name || query,
              category: TermCategory.DRUG,
              definition: `RxNav'den gelen ilaç bilgisi: ${drug.name}`,
              components: [drug.name],
              relatedTerms: ['RxNav', 'İlaç'],
              etymology: 'RxNav API',
              usage: 'Tıbbi kullanım',
              sideEffects: [],
              dosage: '',
              contraindications: [],
              interactions: [],
              synonyms: [drug.synonym || drug.name],
              isBookmarked: false,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          });
        }
      });

      console.log(`✅ RxNav: ${terms.length} drugs found`);
      return { success: true, terms };
      
    } catch (error) {
      console.error('❌ RxNav API error:', error);
      return { 
        success: false, 
        terms: [], 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Birden fazla API'den toplu veri çeker
   */
  async fetchFromMultipleSources(limit: number = 50): Promise<PharmacyTerm[]> {
    const allTerms: PharmacyTerm[] = [];
    
    // OpenFDA'dan çek
    const openFDAResult = await this.fetchFromOpenFDA(limit);
    if (openFDAResult.success) {
      allTerms.push(...openFDAResult.terms);
    }
    
    // İleride başka API'ler eklenebilir
    // const rxNavResult = await this.searchRxNav('aspirin');
    // if (rxNavResult.success) {
    //   allTerms.push(...rxNavResult.terms);
    // }
    
    // Duplicate'leri temizle (aynı latinName'e sahip olanlar)
    const uniqueTerms = allTerms.reduce((acc, term) => {
      const exists = acc.find(t => t.latinName.toLowerCase() === term.latinName.toLowerCase());
      if (!exists) {
        acc.push(term);
      }
      return acc;
    }, [] as PharmacyTerm[]);
    
    console.log(`📊 Total unique drugs from APIs: ${uniqueTerms.length}`);
    return uniqueTerms;
  }

  /**
   * Belirli bir ilaç için detaylı bilgi çeker
   */
  async getDrugDetails(drugName: string): Promise<PharmacyTerm | null> {
    try {
      // OpenFDA'da arama
      const searchUrl = `${this.OPENFDA_BASE_URL}?search=openfda.generic_name:"${encodeURIComponent(drugName)}"&limit=1`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        return null;
      }
      
      const drug = data.results[0];
      const genericName = drug.generic_name?.[0] || drug.brand_name?.[0] || drugName;
      
      return {
        id: uuidv4(),
        latinName: genericName,
        turkishName: genericName,
        category: TermCategory.DRUG,
        definition: drug.indications_and_usage?.[0] || drug.description?.[0] || 'İlaç bilgisi',
        components: drug.active_ingredient?.map((ing: any) => ing.name || ing) || [genericName],
        relatedTerms: ['FDA', 'İlaç'],
        etymology: 'OpenFDA API',
        usage: drug.indications_and_usage?.join('; ') || 'Tıbbi kullanım',
        sideEffects: drug.warnings || drug.adverse_reactions || [],
        dosage: drug.dosage_and_administration?.[0] || 'Doktor tavsiyesi',
        contraindications: drug.contraindications || drug.warnings || [],
        interactions: drug.drug_interactions?.map((inter: any) => inter.name || inter) || [],
        synonyms: drug.brand_name || [genericName],
        isBookmarked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
    } catch (error) {
      console.error('❌ Error fetching drug details:', error);
      return null;
    }
  }
}

// Singleton instance
export const drugAPIService = new DrugAPIService();

