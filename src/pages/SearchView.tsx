import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePharmacy } from '../context/PharmacyContext';
import type { SearchResult } from '../types/models';
import TermCard from '../components/TermCard';

const SearchView = () => {
  const navigation = useNavigation();
  const { searchText, setSearchText, searchResults, searchTerms } = usePharmacy();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

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

  const handleSearch = async (query: string) => {
    setSearchText(query);
    if (query.trim()) {
      searchTerms(query);
      // Add to history
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
      setSearchHistory(newHistory);
      try {
        await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error saving search history:', error);
      }
    }
  };

  const clearHistory = async () => {
    setSearchHistory([]);
    try {
      await AsyncStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Terim, bileşen veya açıklama ara..."
            placeholderTextColor="#9ca3af"
          />
          {searchText ? (
            <TouchableOpacity
              onPress={() => {
                setSearchText('');
                handleSearch('');
              }}
            >
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {searchText ? (
          // Search Results
          <View>
            <Text style={styles.resultCount}>
              {searchResults.length} sonuç bulundu
            </Text>
            {searchResults.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
              </View>
            ) : (
              <View style={styles.resultsList}>
                {searchResults.map((result) => (
                  <TermCard
                    key={result.id}
                    term={result.term}
                    onPress={() => navigation.navigate('TermDetail' as never, { id: result.term.id } as never)}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          // Search History
          <View>
            {searchHistory.length > 0 && (
              <View style={styles.historySection}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyTitle}>Son Aramalar</Text>
                  <TouchableOpacity onPress={clearHistory}>
                    <Text style={styles.clearButton}>Temizle</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.historyList}>
                  {searchHistory.map((term, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.historyItem}
                      onPress={() => handleSearch(term)}
                    >
                      <Text>{term}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            {searchHistory.length === 0 && (
              <View style={styles.emptyContainer}>
                <Ionicons name="search" size={64} color="#d1d5db" />
                <Text style={styles.emptyText}>Arama Yapın</Text>
                <Text style={styles.emptySubtext}>
                  Tıbbi terimleri, ilaç isimlerini, bitki adlarını ve daha fazlasını arayabilirsiniz.
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
    backgroundColor: '#f9fafb',
  },
  searchContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    padding: 16,
  },
  resultCount: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  resultsList: {
    gap: 12,
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  resultDescription: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  resultBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  resultBadgeText: {
    fontSize: 12,
    color: '#1e40af',
  },
  historySection: {
    marginBottom: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  clearButton: {
    fontSize: 14,
    color: '#2563eb',
  },
  historyList: {
    gap: 8,
  },
  historyItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    width: '100%',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default SearchView;

