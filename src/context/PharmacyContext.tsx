/**
 * ============================================================================
 * PHARMACY CONTEXT - ECZACILIK VERİ YÖNETİMİ
 * ============================================================================
 * 
 * Bu dosya React Context API kullanarak uygulama genelinde veri yönetimi sağlar.
 * Tüm bileşenler bu context üzerinden verilere erişir.
 * 
 * CONTEXT API NEDİR?
 * - React'ın global state yönetim çözümü
 * - Props drilling (prop'ları her seviyeye geçirme) sorununu çözer
 * - Tüm alt bileşenler verilere doğrudan erişebilir
 * 
 * SAĞLANAN VERİLER:
 * - terms: Tüm eczacılık terimleri
 * - isLoading: Yükleme durumu
 * - error: Hata mesajı
 * - searchText: Arama metni
 * - searchResults: Arama sonuçları
 * - filter: Filtreleme seçenekleri
 * 
 * SAĞLANAN FONKSİYONLAR:
 * - setSearchText: Arama metnini güncelle
 * - searchTerms: Arama yap
 * - getTermsByCategory: Kategoriye göre terimleri getir
 * - toggleBookmark: Favori durumunu değiştir
 * - getBookmarkedTerms: Favorileri getir
 * - refresh: Verileri yenile
 * - loadDrugsFromAPI: API'den ilaç verisi yükle
 * ============================================================================
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { pharmacyTermService } from '../services/PharmacyTermService';
import type { PharmacyTerm, TermCategory, SearchResult, TermFilter } from '../types/models';
import { createDefaultFilter } from '../types/models';

// Context için TypeScript tip tanımı
interface PharmacyContextType {
  // STATE (Durum Verileri)
  terms: PharmacyTerm[];           // Tüm terimler
  isLoading: boolean;              // Yükleniyor mu?
  error: string | null;            // Hata mesajı
  searchText: string;              // Arama metni
  searchResults: SearchResult[];   // Arama sonuçları
  filter: TermFilter;              // Filtre ayarları
  
  // ACTIONS (Eylemler/Fonksiyonlar)
  setSearchText: (text: string) => void;
  setFilter: (filter: TermFilter) => void;
  searchTerms: (query: string) => Promise<void>;
  getTermsByCategory: (category: TermCategory) => Promise<PharmacyTerm[]>;
  toggleBookmark: (termId: string) => Promise<void>;
  getBookmarkedTerms: () => Promise<PharmacyTerm[]>;
  refresh: () => Promise<void>;
  loadDrugsFromAPI: (limit?: number) => Promise<number>;
}

// Context oluştur (başlangıçta undefined)
const PharmacyContext = createContext<PharmacyContextType | undefined>(undefined);

/**
 * PHARMACY PROVIDER
 * --------------------------------
 * Context verilerini sağlayan ana bileşen.
 * App.tsx'de tüm uygulamayı sarar.
 */
export const PharmacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // STATE TANIMLARI
  const [terms, setTerms] = useState<PharmacyTerm[]>([]);        // Terimler listesi
  const [isLoading, setIsLoading] = useState(false);              // Yükleme durumu
  const [error, setError] = useState<string | null>(null);        // Hata mesajı
  const [searchText, setSearchText] = useState("");               // Arama metni
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // Arama sonuçları
  const [filter, setFilter] = useState<TermFilter>(createDefaultFilter()); // Filtre

  /**
   * UYGULAMA AÇILDIĞINDA TERİMLERİ YÜKLE
   * useEffect hook'u component mount olduğunda çalışır
   */
  useEffect(() => {
    loadAllTerms();
  }, []);

  /**
   * ARAMA METNİ DEĞİŞTİĞİNDE OTOMATİK ARAMA YAP
   * 300ms debounce ile gereksiz API çağrılarını önler
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText && searchText.trim().length > 0) {
        performSearch(searchText);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms bekle (debounce)

    return () => clearTimeout(timeoutId); // Cleanup
  }, [searchText]);

  /**
   * TÜM TERİMLERİ YÜKLE
   * Firebase'den tüm terimleri çeker ve state'e kaydeder
   */
  const loadAllTerms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🔄 PharmacyContext - Loading terms...');
      const allTerms = await pharmacyTermService.getAllTerms();
      console.log('✅ PharmacyContext - Terms loaded:', allTerms.length);
      console.log('📊 PharmacyContext - Drug terms:', allTerms.filter(t => t.category === 'İlaçlar').length);
      // Ensure isBookmarked is always boolean and dates are Date objects
      const normalizedTerms = allTerms.map(term => ({
        ...term,
        isBookmarked: Boolean(term.isBookmarked),
        createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
        updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
        components: Array.isArray(term.components) ? term.components : [],
        relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
        synonyms: Array.isArray(term.synonyms) ? term.synonyms : []
      }));
      console.log('✅ PharmacyContext - Setting terms:', normalizedTerms.length);
      setTerms(normalizedTerms);
    } catch (err) {
      console.error('❌ PharmacyContext - Error loading terms:', err);
      setError(err instanceof Error ? err.message : "Veri yüklenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const performSearch = async (query: string) => {
    if (!query || query.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await pharmacyTermService.searchTerms(query, filter);
      // Ensure isBookmarked is always boolean in search results
      const normalizedResults = (results || []).map(result => ({
        ...result,
        term: {
          ...result.term,
          isBookmarked: Boolean(result.term.isBookmarked),
          createdAt: result.term.createdAt instanceof Date ? result.term.createdAt : new Date(result.term.createdAt),
          updatedAt: result.term.updatedAt instanceof Date ? result.term.updatedAt : new Date(result.term.updatedAt),
          components: Array.isArray(result.term.components) ? result.term.components : [],
          relatedTerms: Array.isArray(result.term.relatedTerms) ? result.term.relatedTerms : [],
          synonyms: Array.isArray(result.term.synonyms) ? result.term.synonyms : []
        }
      }));
      setSearchResults(normalizedResults);
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : "Arama yapılırken hata oluştu");
      setSearchResults([]);
    }
  };

  const getTermsByCategory = useCallback(async (category: TermCategory): Promise<PharmacyTerm[]> => {
    try {
      const terms = await pharmacyTermService.getTermsByCategory(category);
      // Ensure isBookmarked is always boolean and dates are Date objects
      return terms.map(term => ({
        ...term,
        isBookmarked: Boolean(term.isBookmarked),
        createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
        updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
        components: Array.isArray(term.components) ? term.components : [],
        relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
        synonyms: Array.isArray(term.synonyms) ? term.synonyms : []
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kategori verileri yüklenirken hata oluştu");
      return [];
    }
  }, []);

  const toggleBookmark = useCallback(async (termId: string) => {
    try {
      const newBookmarkState = await pharmacyTermService.toggleBookmark(termId);
      setTerms(prevTerms =>
        prevTerms.map(term =>
          term.id === termId
            ? { ...term, isBookmarked: Boolean(newBookmarkState) }
            : term
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Favori eklenirken hata oluştu");
    }
  }, []);

  const getBookmarkedTerms = useCallback(async (): Promise<PharmacyTerm[]> => {
    try {
      const terms = await pharmacyTermService.getBookmarkedTerms();
      // Ensure isBookmarked is always boolean and dates are Date objects
      return terms.map(term => ({
        ...term,
        isBookmarked: Boolean(term.isBookmarked),
        createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
        updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
        components: Array.isArray(term.components) ? term.components : [],
        relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
        synonyms: Array.isArray(term.synonyms) ? term.synonyms : []
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Favoriler yüklenirken hata oluştu");
      return [];
    }
  }, []);

  const refresh = useCallback(async () => {
    await loadAllTerms();
  }, []);

  const loadDrugsFromAPI = useCallback(async (limit: number = 100): Promise<number> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`🔄 Loading ${limit} drugs from API...`);
      const count = await pharmacyTermService.refreshDrugsFromAPI(limit);
      
      // Refresh terms list
      await loadAllTerms();
      
      console.log(`✅ ${count} new drugs loaded from API`);
      return count;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "API'den veri yüklenirken hata oluştu";
      console.error("❌ Error loading drugs from API:", err);
      setError(errorMessage);
      return 0;
    } finally {
      setIsLoading(false);
    }
  }, [loadAllTerms]);

  const value: PharmacyContextType = {
    terms,
    isLoading,
    error,
    searchText,
    searchResults,
    filter,
    setSearchText,
    setFilter,
    searchTerms: performSearch,
    getTermsByCategory,
    toggleBookmark,
    getBookmarkedTerms,
    refresh,
    loadDrugsFromAPI
  };

  return (
    <PharmacyContext.Provider value={value}>
      {children}
    </PharmacyContext.Provider>
  );
};

/**
 * usePharmacy HOOK
 * --------------------------------
 * Context'e erişim sağlayan custom hook.
 * Herhangi bir bileşende kullanılabilir:
 * 
 * const { terms, searchTerms, toggleBookmark } = usePharmacy();
 */
export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (context === undefined) {
    throw new Error('usePharmacy must be used within a PharmacyProvider');
  }
  return context;
};
