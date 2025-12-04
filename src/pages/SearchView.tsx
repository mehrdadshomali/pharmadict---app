// SearchView.tsx - Generative UI Search Screen with AI Summary
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePharmacy } from '../context/PharmacyContext';
import type { SearchResult, PharmacyTerm } from '../types/models';
import TermCard from '../components/TermCard';
import AISummaryCard from '../components/AISummaryCard';
import SmartFilterBar, { FilterOption } from '../components/SmartFilterBar';
import TermService from '../services/TermService';

const SearchView = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { searchText, setSearchText, searchResults, searchTerms, terms } = usePharmacy();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<PharmacyTerm[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    loadHistory();
    loadTrendingSearches();
  }, []);

  // Real-time suggestions as user types
  useEffect(() => {
    if (searchText && searchText.length >= 2) {
      generateSuggestions(searchText);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchText]);

  const loadHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const loadTrendingSearches = async () => {
    try {
      const mostVisited = await TermService.getMostVisitedTerms(5);
      const trending = mostVisited.map(term => term.latinName).slice(0, 5);
      setTrendingSearches(trending);
    } catch (error) {
      console.error('Error loading trending searches:', error);
    }
  };

  const generateSuggestions = (query: string) => {
    if (!terms || terms.length === 0) return;
    
    const queryLower = query.toLowerCase();
    const matched = terms
      .filter(term => {
        const latinMatch = term.latinName?.toLowerCase().includes(queryLower);
        const turkishMatch = term.turkishName?.toLowerCase().includes(queryLower);
        return latinMatch || turkishMatch;
      })
      .slice(0, 5);
    
    setSuggestions(matched);
  };

  // Generate AI Summary from search results
  const generateAISummary = (results: SearchResult[]): string => {
    if (!results || results.length === 0) return '';
    
    const topResult = results[0]?.term;
    if (!topResult) return '';

    // Generate contextual summary based on term data
    let summary = '';
    
    if (topResult.definition) {
      summary = topResult.definition;
    } else if (topResult.usage) {
      summary = `${topResult.latinName} (${topResult.turkishName}), ${topResult.usage}`;
    } else {
      summary = `${topResult.latinName} (${topResult.turkishName}), ${topResult.category} kategorisinde bir terimdir.`;
    }

    // Add additional context if available
    if (topResult.components && topResult.components.length > 0) {
      summary += ` Ana bileşenleri: ${topResult.components.slice(0, 3).join(', ')}.`;
    }

    // Limit summary length
    if (summary.length > 200) {
      summary = summary.substring(0, 197) + '...';
    }

    return summary;
  };

  // Generate smart filters based on search results
  const generateSmartFilters = (results: SearchResult[]): FilterOption[] => {
    if (!results || results.length === 0) return [];

    const filters: FilterOption[] = [];
    
    // Check if results have dosage information
    const hasDosage = results.some(r => r.term.usage?.toLowerCase().includes('doz') || r.term.usage?.toLowerCase().includes('mg'));
    if (hasDosage) {
      filters.push({
        id: 'dosage',
        label: 'Dozaj',
        icon: 'medical-outline',
        count: results.filter(r => r.term.usage?.toLowerCase().includes('doz')).length,
      });
    }

    // Check if results have side effects
    const hasSideEffects = results.some(r => r.term.sideEffects && r.term.sideEffects.length > 0);
    if (hasSideEffects) {
      filters.push({
        id: 'side-effects',
        label: 'Yan Etkiler',
        icon: 'warning-outline',
        count: results.filter(r => r.term.sideEffects && r.term.sideEffects.length > 0).length,
      });
    }

    // Check if results have interactions
    const hasInteractions = results.some(r => r.term.interactions && r.term.interactions.length > 0);
    if (hasInteractions) {
      filters.push({
        id: 'interactions',
        label: 'Etkileşimler',
        icon: 'swap-horizontal-outline',
        count: results.filter(r => r.term.interactions && r.term.interactions.length > 0).length,
      });
    }

    // Check for children/pediatric use
    const hasPediatric = results.some(r => 
      r.term.usage?.toLowerCase().includes('çocuk') || 
      r.term.usage?.toLowerCase().includes('pediatri')
    );
    if (hasPediatric) {
      filters.push({
        id: 'pediatric',
        label: 'Çocuklar İçin',
        icon: 'people-outline',
        count: results.filter(r => 
          r.term.usage?.toLowerCase().includes('çocuk') || 
          r.term.usage?.toLowerCase().includes('pediatri')
        ).length,
      });
    }

    // Check for pregnancy/lactation
    const hasPregnancy = results.some(r => 
      r.term.contraindications?.some(c => 
        c.toLowerCase().includes('hamile') || 
        c.toLowerCase().includes('gebelik')
      )
    );
    if (hasPregnancy) {
      filters.push({
        id: 'pregnancy',
        label: 'Gebelik',
        icon: 'heart-outline',
        count: results.filter(r => 
          r.term.contraindications?.some(c => 
            c.toLowerCase().includes('hamile') || 
            c.toLowerCase().includes('gebelik')
          )
        ).length,
      });
    }

    return filters;
  };

  const handleSearch = async (query: string) => {
    setSearchText(query);
    setShowSuggestions(false);
    setIsSearching(true);
    setActiveFilters([]);
    
    if (query.trim()) {
      await searchTerms(query);
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
      setSearchHistory(newHistory);
      try {
        await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error saving search history:', error);
      }
    }
    
    setIsSearching(false);
  };

  const handleFilterToggle = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleCopySummary = () => {
    const summary = generateAISummary(searchResults);
    if (summary) {
      // Clipboard functionality - can be enhanced with expo-clipboard
      Alert.alert('Kopyalandı', 'Özet panoya kopyalandı');
    }
  };

  const handleShareSummary = () => {
    // Share functionality can be implemented with expo-sharing
    Alert.alert('Paylaş', 'Paylaşım özelliği yakında eklenecek');
  };

  const clearHistory = async () => {
    setSearchHistory([]);
    try {
      await AsyncStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  // Filter results based on active filters
  const filteredResults = useMemo(() => {
    if (!searchResults || searchResults.length === 0) return [];
    if (activeFilters.length === 0) return searchResults;

    return searchResults.filter(result => {
      const term = result.term;
      
      if (activeFilters.includes('dosage')) {
        return term.usage?.toLowerCase().includes('doz') || term.usage?.toLowerCase().includes('mg');
      }
      if (activeFilters.includes('side-effects')) {
        return term.sideEffects && term.sideEffects.length > 0;
      }
      if (activeFilters.includes('interactions')) {
        return term.interactions && term.interactions.length > 0;
      }
      if (activeFilters.includes('pediatric')) {
        return term.usage?.toLowerCase().includes('çocuk') || term.usage?.toLowerCase().includes('pediatri');
      }
      if (activeFilters.includes('pregnancy')) {
        return term.contraindications?.some(c => 
          c.toLowerCase().includes('hamile') || c.toLowerCase().includes('gebelik')
        );
      }
      
      return true;
    });
  }, [searchResults, activeFilters]);

  const aiSummary = useMemo(() => generateAISummary(searchResults), [searchResults]);
  const smartFilters = useMemo(() => generateSmartFilters(searchResults), [searchResults]);
  const hasResults = searchText && searchResults.length > 0;

  const HEADER_HEIGHT = insets.top + 80;

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <BlurView
        intensity={50}
        tint="light"
        style={[
          styles.stickyHeader,
          {
            paddingTop: insets.top,
            height: HEADER_HEIGHT,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={22} color="#3B82F6" style={styles.searchIcon} />
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              value={searchText}
              onChangeText={handleSearch}
              placeholder="Akıllı arama yapın..."
              placeholderTextColor="#9CA3AF"
              autoFocus={false}
            />
            {searchText ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchText('');
                  handleSearch('');
                  inputRef.current?.focus();
                }}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={22} color="#9CA3AF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => inputRef.current?.focus()}
                style={styles.voiceButton}
              >
                <Ionicons name="mic-outline" size={22} color="#3B82F6" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </BlurView>

      {/* Smart Filter Bar - Always visible when there are results */}
      {hasResults && smartFilters.length > 0 && (
        <View style={styles.filterBarContainer}>
          <SmartFilterBar
            filters={smartFilters}
            activeFilters={activeFilters}
            onFilterToggle={handleFilterToggle}
          />
        </View>
      )}

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_HEIGHT + (hasResults && smartFilters.length > 0 ? 60 : 20) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Aranıyor...</Text>
          </View>
        ) : hasResults ? (
          <>
            {/* AI Summary Card */}
            {aiSummary && (
              <AISummaryCard
                summary={aiSummary}
                sources={['Wikipedia', 'FDA', 'Medical Database']}
                onCopy={handleCopySummary}
                onShare={handleShareSummary}
              />
            )}

            {/* Results Header */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>İlgili Terimler</Text>
              <Text style={styles.resultsCount}>
                {filteredResults.length} sonuç
              </Text>
            </View>

            {/* Results List */}
            {filteredResults.length > 0 ? (
              <View style={styles.resultsList}>
                {filteredResults.map((result) => (
                  <TermCard
                    key={result.term.id}
                    term={result.term}
                    onPress={() =>
                      navigation.navigate('TermDetail' as never, {
                        id: result.term.id,
                      } as never)
                    }
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="filter-outline" size={48} color="#9CA3AF" />
                <Text style={styles.emptyText}>
                  Seçilen filtreler için sonuç bulunamadı
                </Text>
                <TouchableOpacity
                  style={styles.clearFiltersButton}
                  onPress={() => setActiveFilters([])}
                >
                  <Text style={styles.clearFiltersText}>Filtreleri Temizle</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : searchText && searchResults.length === 0 ? (
          // No Results State
          <View style={styles.emptyContainer}>
            <LinearGradient
              colors={['#F3F4F6', '#E5E7EB']}
              style={styles.emptyIconContainer}
            >
              <Ionicons name="search-outline" size={64} color="#9CA3AF" />
            </LinearGradient>
            <Text style={styles.emptyTitle}>Sonuç bulunamadı</Text>
            <Text style={styles.emptySubtext}>
              "{searchText}" için arama sonucu bulunamadı.
            </Text>
          </View>
        ) : showSuggestions && suggestions.length > 0 ? (
          // Real-time Suggestions
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Öneriler</Text>
            <View style={styles.suggestionsList}>
              {suggestions.map((term) => (
                <TouchableOpacity
                  key={term.id}
                  style={styles.suggestionItem}
                  onPress={() => handleSearch(term.latinName)}
                >
                  <Ionicons
                    name="search-outline"
                    size={18}
                    color="#6B7280"
                    style={styles.suggestionIcon}
                  />
                  <View style={styles.suggestionContent}>
                    <Text style={styles.suggestionMainText}>
                      {term.latinName}
                    </Text>
                    <Text style={styles.suggestionSubText}>
                      {term.turkishName}
                    </Text>
                  </View>
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          // Discovery State
          <View>
            {/* Trending Searches */}
            {trendingSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="trending-up" size={20} color="#3B82F6" />
                  <Text style={styles.sectionTitle}>Popüler Aramalar</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.trendingContainer}
                >
                  {trendingSearches.map((term, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.trendingChip}
                      onPress={() => handleSearch(term)}
                    >
                      <LinearGradient
                        colors={['#3B82F6', '#2563EB']}
                        style={styles.trendingChipGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Text style={styles.trendingChipText}>{term}</Text>
                        {index === 0 && (
                          <Ionicons
                            name="flame"
                            size={14}
                            color="#FFFFFF"
                            style={styles.flameIcon}
                          />
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Search History */}
            {searchHistory.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderLeft}>
                    <Ionicons name="time-outline" size={20} color="#6B7280" />
                    <Text style={styles.sectionTitle}>Son Aramalar</Text>
                  </View>
                  <TouchableOpacity onPress={clearHistory}>
                    <Text style={styles.clearButtonText}>Temizle</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.historyList}>
                  {searchHistory.map((term, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.historyItem}
                      onPress={() => handleSearch(term)}
                    >
                      <Ionicons
                        name="time"
                        size={18}
                        color="#9CA3AF"
                        style={styles.historyIcon}
                      />
                      <Text style={styles.historyText}>{term}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          const newHistory = searchHistory.filter(
                            (_, i) => i !== index
                          );
                          setSearchHistory(newHistory);
                          AsyncStorage.setItem(
                            'searchHistory',
                            JSON.stringify(newHistory)
                          );
                        }}
                      >
                        <Ionicons
                          name="close"
                          size={18}
                          color="#9CA3AF"
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Empty State */}
            {searchHistory.length === 0 && trendingSearches.length === 0 && (
              <View style={styles.emptyContainer}>
                <LinearGradient
                  colors={['#EFF6FF', '#DBEAFE']}
                  style={styles.emptyIconContainer}
                >
                  <Ionicons name="search" size={64} color="#3B82F6" />
                </LinearGradient>
                <Text style={styles.emptyTitle}>Arama Yapın</Text>
                <Text style={styles.emptySubtext}>
                  Tıbbi terimleri, ilaç isimlerini, bitki adlarını ve daha
                  fazlasını arayabilirsiniz.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  voiceButton: {
    marginLeft: 8,
    padding: 4,
  },
  filterBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9,
    paddingTop: 60,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  resultsList: {
    gap: 12,
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  suggestionsList: {
    gap: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionMainText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  suggestionSubText: {
    fontSize: 13,
    color: '#6B7280',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
  },
  clearFiltersButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  trendingContainer: {
    gap: 10,
    paddingRight: 20,
  },
  trendingChip: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  trendingChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  trendingChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  flameIcon: {
    marginLeft: 2,
  },
  historyList: {
    gap: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyIcon: {
    marginRight: 12,
  },
  historyText: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default SearchView;
