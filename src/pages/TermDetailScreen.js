// TermDetailScreen.js - Pixel-Perfect Design with StyleSheet
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TermService from '../services/TermService';
import InfoCard from '../components/InfoCard';
import TermCard from '../components/TermCard';
import { usePharmacy } from '../context/PharmacyContext';

const TermDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};
  const { toggleBookmark, terms } = usePharmacy();

  const [term, setTerm] = useState(null);
  const [relatedTerms, setRelatedTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [isNoteSaving, setIsNoteSaving] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  // Category color themes for header
  const getCategoryHeaderColors = (category) => {
    const colors = {
      'İlaçlar': { primary: '#2563EB', light: '#EFF6FF', text: '#2563EB' },
      'Bitkiler': { primary: '#10B981', light: '#F0FDF4', text: '#059669' },
      'Vitaminler': { primary: '#F59E0B', light: '#FFFBEB', text: '#D97706' },
      'Mineraller': { primary: '#8B5CF6', light: '#F5F3FF', text: '#7C3AED' },
      'Böcekler': { primary: '#D97706', light: '#FEF3C7', text: '#B45309' },
      'Bileşenler': { primary: '#EF4444', light: '#FEF2F2', text: '#DC2626' },
      'Hastalıklar': { primary: '#EC4899', light: '#FDF2F8', text: '#DB2777' },
      'Anatomi': { primary: '#6366F1', light: '#EEF2FF', text: '#4F46E5' },
    };
    return colors[category] || colors['İlaçlar'];
  };

  // Category icon mapping for header
  const getCategoryHeaderIcon = (category) => {
    const iconMap = {
      'İlaçlar': 'medical',
      'Bitkiler': 'leaf',
      'Vitaminler': 'flask',
      'Mineraller': 'diamond',
      'Böcekler': 'bug',
      'Bileşenler': 'nuclear',
      'Hastalıklar': 'medical-outline',
      'Anatomi': 'body',
    };
    return iconMap[category] || 'medical';
  };

  useEffect(() => {
    loadTerm();
    loadUserNote();
    // Track visit when term is loaded
    if (id) {
      TermService.incrementVisitCount(id);
    }
  }, [id]);

  // Update bookmark state when terms change
  useEffect(() => {
    if (id && terms.length > 0) {
      const currentTerm = terms.find(t => t.id === id);
      if (currentTerm) {
        setIsBookmarked(Boolean(currentTerm.isBookmarked));
      }
    }
  }, [id, terms]);

  const loadTerm = () => {
    setIsLoading(true);
    
    // First try to find term in PharmacyContext terms
    let loadedTerm = terms.find(t => t.id === id);
    
    // If not found in context, try TermService
    if (!loadedTerm) {
      loadedTerm = TermService.getTermById(id);
    }

    if (loadedTerm) {
      setTerm(loadedTerm);
      setIsBookmarked(loadedTerm.isBookmarked || false);

      // Load related terms
      const related = TermService.getRelatedTerms(id, 5);
      setRelatedTerms(related);
    }

    setIsLoading(false);
  };

  const loadUserNote = async () => {
    try {
      const note = await TermService.getUserNote(id);
      if (note) {
        setUserNote(note);
      }
    } catch (error) {
      console.error('Error loading user note:', error);
    }
  };

  const handleSaveNote = async () => {
    if (isNoteSaving) return;
    
    setIsNoteSaving(true);
    setNoteSaved(false);
    
    try {
      await TermService.saveUserNote(id, userNote);
      setNoteSaved(true);
      // Hide saved indicator after 2 seconds
      setTimeout(() => {
        setNoteSaved(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsNoteSaving(false);
    }
  };

  const handleNoteChange = (text) => {
    setUserNote(text);
    setNoteSaved(false);
  };

  const handleToggleBookmark = async () => {
    try {
      await toggleBookmark(id);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleRelatedTermPress = (relatedTermId) => {
    navigation.replace('TermDetail', { id: relatedTermId });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      </SafeAreaView>
    );
  }

  if (!term) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#D1D5DB" />
          <Text style={styles.emptyText}>Terim bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  const categoryColors = getCategoryHeaderColors(term.category);
  const categoryIconName = getCategoryHeaderIcon(term.category);
  const lastUpdateDate = term.updatedAt
    ? new Date(term.updatedAt).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Bilinmiyor';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back and Action Buttons */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={categoryColors.primary}
            />
            <Text style={[styles.backButtonText, { color: categoryColors.primary }]}>
              {term.category}
            </Text>
          </TouchableOpacity>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={handleToggleBookmark}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isBookmarked ? 'heart' : 'heart-outline'}
                size={24}
                color={isBookmarked ? '#EF4444' : '#6B7280'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                /* Implement share functionality */
              }}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Ionicons name="share-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Header Card */}
        <View
          style={[
            styles.headerCard,
            {
              backgroundColor: categoryColors.light,
              borderColor: categoryColors.light === '#EFF6FF' ? '#DBEAFE' : '#E5E7EB',
            },
          ]}
        >
          <View style={styles.headerTop}>
            <View style={styles.categoryTag}>
              <Ionicons name={categoryIconName} size={16} color={categoryColors.primary} />
              <Text style={[styles.categoryTagText, { color: categoryColors.primary }]}>
                {term.category}
              </Text>
            </View>
          </View>
          <Text style={styles.updateDate}>Son güncelleme: {lastUpdateDate}</Text>
          <Text style={styles.latinName}>{term.latinName}</Text>
          <Text style={styles.turkishName}>{term.turkishName}</Text>
        </View>

        {/* Information Cards */}
        <View style={styles.infoSection}>
          {/* Definition */}
          {term.definition && (
            <InfoCard title="Tanım" icon="book" theme="blue">
              <Text style={styles.infoText}>{term.definition}</Text>
            </InfoCard>
          )}

          {/* Etymology */}
          {term.etymology && (
            <InfoCard title="Etimoloji" icon="book-outline" theme="purple">
              <Text style={styles.infoText}>{term.etymology}</Text>
            </InfoCard>
          )}

          {/* Usage */}
          {term.usage && (
            <InfoCard title="Kullanım" icon="medical" theme="green">
              <Text style={styles.infoText}>{term.usage}</Text>
            </InfoCard>
          )}

          {/* Components */}
          {term.components && term.components.length > 0 && (
            <InfoCard title="Bileşenler" icon="nuclear" theme="orange">
              <View style={styles.componentsContainer}>
                {term.components.map((component, index) => (
                  <View key={index} style={styles.componentTag}>
                    <Text style={styles.componentTagText}>{component}</Text>
                  </View>
                ))}
              </View>
            </InfoCard>
          )}

          {/* Side Effects */}
          {term.sideEffects && term.sideEffects.length > 0 && (
            <InfoCard title="Yan Etkiler" icon="warning" theme="red">
              <View style={styles.listContainer}>
                {term.sideEffects.map((effect, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listText}>{effect}</Text>
                  </View>
                ))}
              </View>
            </InfoCard>
          )}

          {/* Contraindications */}
          {term.contraindications && term.contraindications.length > 0 && (
            <InfoCard title="Kontrendikasyonlar" icon="hand-left-outline" theme="red">
              <View style={styles.listContainer}>
                {term.contraindications.map((contra, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listText}>{contra}</Text>
                  </View>
                ))}
              </View>
            </InfoCard>
          )}

          {/* Interactions */}
          {term.interactions && term.interactions.length > 0 && (
            <InfoCard title="İlaç Etkileşimleri" icon="refresh" theme="yellow">
              <View style={styles.listContainer}>
                {term.interactions.map((interaction, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listText}>{interaction}</Text>
                  </View>
                ))}
              </View>
            </InfoCard>
          )}

          {/* Synonyms */}
          {term.synonyms && term.synonyms.length > 0 && (
            <InfoCard title="Eş Anlamlılar" icon="list" theme="purple">
              <View style={styles.componentsContainer}>
                {term.synonyms.map((synonym, index) => (
                  <View key={index} style={styles.componentTag}>
                    <Text style={styles.componentTagText}>{synonym}</Text>
                  </View>
                ))}
              </View>
            </InfoCard>
          )}

          {/* Personal Notes */}
          <View
            style={[
              styles.personalNotesCard,
              {
                backgroundColor: '#FEFCE8',
                borderColor: '#FEF9C3',
              },
            ]}
          >
            <View style={styles.personalNotesHeader}>
              <View style={styles.personalNotesTitleRow}>
                <Ionicons name="create-outline" size={20} color="#EAB308" />
                <Text style={styles.personalNotesTitle}>Kişisel Notlarım</Text>
              </View>
              {noteSaved && (
                <View style={styles.savedIndicator}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.savedText}>Kaydedildi</Text>
                </View>
              )}
            </View>
            <TextInput
              style={styles.noteInput}
              value={userNote}
              onChangeText={handleNoteChange}
              onEndEditing={handleSaveNote}
              placeholder="Bu terimle ilgili notlarınızı buraya ekleyin..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>İlgili Terimler</Text>
            {relatedTerms.map((relatedTerm) => (
              <TermCard
                key={relatedTerm.id}
                term={relatedTerm}
                onPress={() => handleRelatedTermPress(relatedTerm.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 12,
    padding: 4,
  },
  headerCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 20,
  },
  headerTop: {
    marginBottom: 8,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  updateDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  latinName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  turkishName: {
    fontSize: 20,
    color: '#6B7280',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
  },
  componentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  componentTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  componentTagText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  listContainer: {
    marginTop: 4,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#DC2626',
    marginRight: 8,
    marginTop: 2,
  },
  listText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    flex: 1,
  },
  relatedSection: {
    marginTop: 8,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  personalNotesCard: {
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  personalNotesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  personalNotesTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personalNotesTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    color: '#1F2937',
  },
  savedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 4,
  },
  noteInput: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    minHeight: 120,
    padding: 0,
  },
});

export default TermDetailScreen;
