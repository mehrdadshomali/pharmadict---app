import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { usePharmacy } from '../context/PharmacyContext';
import type { PharmacyTerm } from '../types/models';
import { TermCategoryConfig } from '../types/models';
import TermCard from '../components/TermCard';

const BookmarksView = () => {
  const navigation = useNavigation();
  const { getBookmarkedTerms } = usePharmacy();
  const [bookmarkedTerms, setBookmarkedTerms] = useState<PharmacyTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    setIsLoading(true);
    const terms = await getBookmarkedTerms();
    // Ensure isBookmarked is always boolean and dates are Date objects
    const normalizedTerms = terms.map(term => ({
      ...term,
      isBookmarked: Boolean(term.isBookmarked),
      createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
      updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
      components: Array.isArray(term.components) ? term.components : [],
      relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
      synonyms: Array.isArray(term.synonyms) ? term.synonyms : []
    }));
    setBookmarkedTerms(normalizedTerms);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (bookmarkedTerms.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Favoriler</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart" size={64} color="#d1d5db" />
          <Text style={styles.emptyText}>Henüz favori terim eklenmemiş</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoriler</Text>
      </View>
      <View style={styles.termsList}>
        {bookmarkedTerms.map((term) => (
          <TermCard
            key={term.id}
            term={term}
            onPress={() => navigation.navigate('TermDetail' as never, { id: term.id } as never)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
  },
  termsList: {
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
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

export default BookmarksView;
