import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { usePharmacy } from '../context/PharmacyContext';
import { TermCategory, TermCategoryConfig } from '../types/models';
import type { PharmacyTerm } from '../types/models';

const CategoryDetailView = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = (route.params as { category: string }) || {};
  const { getTermsByCategory } = usePharmacy();
  const [terms, setTerms] = useState<PharmacyTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (category) {
      loadTerms(category as TermCategory);
    }
  }, [category]);

  const loadTerms = async (cat: TermCategory) => {
    setIsLoading(true);
    const categoryTerms = await getTermsByCategory(cat);
    setTerms(categoryTerms);
    setIsLoading(false);
  };

  const categoryEnum = category as TermCategory;
  const config = TermCategoryConfig[categoryEnum];
  const filteredTerms = terms
    .filter(term => {
      if (!term) return false;
      if (!term.latinName || !term.turkishName || !term.definition) return false;
      if (!searchText || searchText.trim().length === 0) return true;
      const searchLower = searchText.toLowerCase();
      return (term.latinName && term.latinName.toLowerCase().includes(searchLower)) ||
             (term.turkishName && term.turkishName.toLowerCase().includes(searchLower)) ||
             (term.definition && term.definition.toLowerCase().includes(searchLower));
    })
    .map(term => ({
      ...term,
      isBookmarked: Boolean(term.isBookmarked),
      createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
      updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt)
    }));

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{category}</Text>
        <Text style={styles.headerDescription}>{config?.description}</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Bu kategoride ara..."
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Terms List */}
      <ScrollView style={styles.content}>
        {filteredTerms.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchText ? 'Sonuç bulunamadı' : 'Bu kategoride henüz terim yok'}
            </Text>
          </View>
        ) : (
          <View style={styles.termsList}>
            {filteredTerms.map((term) => (
              <TouchableOpacity
                key={term.id}
                style={styles.termCard}
                onPress={() => navigation.navigate('TermDetail' as never, { id: term.id } as never)}
              >
                <Text style={styles.termIcon}>{config?.icon}</Text>
                <View style={styles.termContent}>
                  <Text style={styles.termTitle}>{term.latinName}</Text>
                  <Text style={styles.termSubtitle}>{term.turkishName}</Text>
                  <Text style={styles.termDescription} numberOfLines={2}>
                    {term.definition}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
  termsList: {
    gap: 12,
  },
  termCard: {
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
  termIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  termContent: {
    flex: 1,
  },
  termTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  termSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  termDescription: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
});

export default CategoryDetailView;

