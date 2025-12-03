import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { usePharmacy } from '../context/PharmacyContext';
import { pharmacyTermService } from '../services/PharmacyTermService';
import type { PharmacyTerm } from '../types/models';
import { TermCategoryConfig } from '../types/models';

const TermDetailView = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = (route.params as { id: string }) || {};
  const { toggleBookmark } = usePharmacy();
  const [term, setTerm] = useState<PharmacyTerm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedTerms, setRelatedTerms] = useState<PharmacyTerm[]>([]);

  useEffect(() => {
    if (id) {
      loadTerm(id);
    }
  }, [id]);

  const loadTerm = async (termId: string) => {
    setIsLoading(true);
    const loadedTerm = await pharmacyTermService.getTermById(termId);
    if (loadedTerm) {
      setTerm(loadedTerm);
      const related = await pharmacyTermService.getRelatedTerms(loadedTerm);
      setRelatedTerms(related);
    }
    setIsLoading(false);
  };

  const handleToggleBookmark = async () => {
    if (term) {
      await toggleBookmark(term.id);
      // Reload term to get updated bookmark state
      const updatedTerm = await pharmacyTermService.getTermById(term.id);
      if (updatedTerm) {
        setTerm({
          ...updatedTerm,
          isBookmarked: Boolean(updatedTerm.isBookmarked),
          createdAt: updatedTerm.createdAt instanceof Date ? updatedTerm.createdAt : new Date(updatedTerm.createdAt),
          updatedAt: updatedTerm.updatedAt instanceof Date ? updatedTerm.updatedAt : new Date(updatedTerm.updatedAt),
          components: Array.isArray(updatedTerm.components) ? updatedTerm.components : [],
          relatedTerms: Array.isArray(updatedTerm.relatedTerms) ? updatedTerm.relatedTerms : [],
          synonyms: Array.isArray(updatedTerm.synonyms) ? updatedTerm.synonyms : []
        });
      }
    }
  };

  const handleShare = async () => {
    if (term) {
      try {
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync({
            message: `${term.latinName}\n${term.turkishName}\n\n${term.definition}`,
          });
        }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!term) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Terim bulunamadı</Text>
      </View>
    );
  }

  const config = TermCategoryConfig[term.category];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={handleToggleBookmark}
              style={styles.headerButton}
            >
              <Ionicons
                name={term.isBookmarked ? "heart" : "heart-outline"}
                size={24}
                color={term.isBookmarked ? "#ef4444" : "#9ca3af"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              style={styles.headerButton}
            >
              <Ionicons name="share-outline" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Header Section */}
        <View style={styles.card}>
          <View style={styles.headerSection}>
            <Text style={styles.headerIcon}>{config.icon}</Text>
            <View style={styles.headerText}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{term.category}</Text>
              </View>
              <Text style={styles.title}>{term.latinName}</Text>
              <Text style={styles.subtitle}>{term.turkishName}</Text>
            </View>
          </View>
        </View>

        {/* Definition */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tanım</Text>
          <Text style={styles.sectionText}>{term.definition}</Text>
        </View>

        {/* Etymology */}
        {term.etymology && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Etimoloji</Text>
            <Text style={styles.sectionText}>{term.etymology}</Text>
          </View>
        )}

        {/* Usage */}
        {term.usage && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Kullanım</Text>
            <Text style={styles.sectionText}>{term.usage}</Text>
          </View>
        )}

        {/* Components */}
        {term.components.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Bileşenler</Text>
            <View style={styles.componentsContainer}>
              {term.components.map((component, index) => (
                <View key={index} style={styles.componentTag}>
                  <Text style={styles.componentText}>{component}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Side Effects */}
        {term.sideEffects && term.sideEffects.length > 0 && (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, styles.sideEffectTitle]}>Yan Etkiler</Text>
            {term.sideEffects.map((effect, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{effect}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Dosage */}
        {term.dosage && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Doz</Text>
            <Text style={styles.sectionText}>{term.dosage}</Text>
          </View>
        )}

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>İlgili Terimler</Text>
            <View style={styles.relatedTermsList}>
              {relatedTerms.map((relatedTerm) => (
                <TouchableOpacity
                  key={relatedTerm.id}
                  style={styles.relatedTermItem}
                  onPress={() => {
                    navigation.navigate('TermDetail' as never, { id: relatedTerm.id } as never);
                  }}
                >
                  <Text style={styles.relatedTermTitle}>{relatedTerm.latinName}</Text>
                  <Text style={styles.relatedTermSubtitle}>{relatedTerm.turkishName}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
  errorText: {
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerIcon: {
    fontSize: 40,
  },
  headerText: {
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#1e40af',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  sideEffectTitle: {
    color: '#dc2626',
  },
  sectionText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  componentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  componentTag: {
    backgroundColor: '#fed7aa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  componentText: {
    fontSize: 14,
    color: '#9a3412',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#dc2626',
    marginTop: 2,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  relatedTermsList: {
    gap: 8,
  },
  relatedTermItem: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
  },
  relatedTermTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  relatedTermSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default TermDetailView;

