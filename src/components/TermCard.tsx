// TermCard.tsx - Pixel-Perfect Design with StyleSheet
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { PharmacyTerm } from '../types/models';
import { TermCategory } from '../types/models';

interface TermCardProps {
  term: PharmacyTerm;
  onPress: () => void;
}

// Category color themes for badge
const getCategoryColor = (category: TermCategory) => {
  const colors = {
    [TermCategory.DRUG]: {
      light: '#EFF6FF', // blue-50
      text: '#2563EB', // blue-600
    },
    [TermCategory.PLANT]: {
      light: '#D1FAE5', // green-100
      text: '#059669', // green-600
    },
    [TermCategory.VITAMIN]: {
      light: '#FEF3C7', // amber-100
      text: '#D97706', // amber-600
    },
    [TermCategory.MINERAL]: {
      light: '#EDE9FE', // violet-100
      text: '#7C3AED', // violet-600
    },
    [TermCategory.INSECT]: {
      light: '#FEF3C7', // amber-100
      text: '#B45309', // amber-700
    },
    [TermCategory.COMPONENT]: {
      light: '#FEE2E2', // red-100
      text: '#DC2626', // red-600
    },
    [TermCategory.DISEASE]: {
      light: '#FCE7F3', // pink-100
      text: '#DB2777', // pink-600
    },
    [TermCategory.ANATOMY]: {
      light: '#E0E7FF', // indigo-100
      text: '#4F46E5', // indigo-600
    },
  };
  return colors[category] || colors[TermCategory.DRUG];
};

const TermCard: React.FC<TermCardProps> = ({ term, onPress }) => {
  const componentCount = term.components?.length || 0;
  const displayComponents = term.components?.slice(0, 3) || [];
  const categoryColor = getCategoryColor(term.category);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      {/* Sol Taraf - İçerik */}
      <View style={styles.contentContainer}>
        {/* Satır 1: Başlık ve Rozet */}
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {term.latinName}
          </Text>
          {componentCount > 0 && (
            <View
              style={[
                styles.badge,
                { backgroundColor: categoryColor.light },
              ]}
            >
              <Text
                style={[styles.badgeText, { color: categoryColor.text }]}
              >
                {componentCount} {componentCount === 1 ? 'bileşen' : 'bileşen'}
              </Text>
            </View>
          )}
        </View>

        {/* Satır 2: Türkçe İsim */}
        <Text style={styles.subtitle} numberOfLines={1}>
          {term.turkishName}
        </Text>

        {/* Satır 3: Tanım */}
        <Text style={styles.description} numberOfLines={2}>
          {term.definition}
        </Text>

        {/* Satır 4: Etiketler */}
        {displayComponents.length > 0 && (
          <View style={styles.tagsContainer}>
            {displayComponents.map((component, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{component}</Text>
              </View>
            ))}
            {term.components.length > 3 && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  +{term.components.length - 3}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Sağ Taraf - İkon */}
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#6B7280',
  },
  iconContainer: {
    marginLeft: 12,
  },
});

export default TermCard;
