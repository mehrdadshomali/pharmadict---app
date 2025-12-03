// CategoriesView.tsx - Modern Bento Grid Design
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TermCategory, TermCategoryConfig } from '../types/models';
import TermService from '../services/TermService';
import BentoCard from '../components/BentoCard';

interface CategoryData {
  category: TermCategory;
  size: 'large' | 'small';
  tags: string[];
}

const CategoriesView = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});
  
  // Header height calculation
  const HEADER_HEIGHT = insets.top + 60;

  // Bento Grid Category Data with sizes and tags
  const bentoCategories: CategoryData[] = [
    {
      category: TermCategory.DRUG,
      size: 'large',
      tags: ['Reçeteli', 'Reçetesiz', 'Ağrı Kesici'],
    },
    {
      category: TermCategory.PLANT,
      size: 'large',
      tags: ['Tıbbi Bitkiler', 'Şifalı'],
    },
    {
      category: TermCategory.VITAMIN,
      size: 'large',
      tags: ['Takviye', 'Sağlık'],
    },
    {
      category: TermCategory.MINERAL,
      size: 'large',
      tags: ['Eser Element', 'Makro'],
    },
    {
      category: TermCategory.DISEASE,
      size: 'large',
      tags: ['Hastalık', 'Tedavi', 'Teşhis'],
    },
    {
      category: TermCategory.INSECT,
      size: 'large',
      tags: ['Tıbbi Böcek'],
    },
    {
      category: TermCategory.COMPONENT,
      size: 'large',
      tags: ['Kimyasal'],
    },
    {
      category: TermCategory.ANATOMY,
      size: 'large',
      tags: ['Vücut', 'Organ'],
    },
  ];

  useEffect(() => {
    // Get term counts for each category
    const counts: { [key: string]: number } = {};
    bentoCategories.forEach((item) => {
      const categoryKey = getCategoryKey(item.category);
      const terms = TermService.getTermsByCategory(categoryKey);
      counts[item.category] = terms.length;
    });
    setCategoryCounts(counts);
  }, []);

  // Category key mapping
  const getCategoryKey = (category: TermCategory) => {
    const keyMap = {
      [TermCategory.DRUG]: 'drug',
      [TermCategory.PLANT]: 'plant',
      [TermCategory.VITAMIN]: 'vitamin',
      [TermCategory.MINERAL]: 'mineral',
      [TermCategory.INSECT]: 'insect',
      [TermCategory.COMPONENT]: 'component',
      [TermCategory.DISEASE]: 'disease',
      [TermCategory.ANATOMY]: 'anatomy',
    };
    return keyMap[category] || 'drug';
  };

  // Category color themes
  const getCategoryTheme = (category: TermCategory) => {
    const themes = {
      [TermCategory.DRUG]: {
        bg: '#EFF6FF',
        iconBg: '#DBEAFE',
        icon: '#3B82F6',
        text: '#1E40AF',
      },
      [TermCategory.PLANT]: {
        bg: '#F0FDF4',
        iconBg: '#D1FAE5',
        icon: '#10B981',
        text: '#047857',
      },
      [TermCategory.VITAMIN]: {
        bg: '#FFF7ED',
        iconBg: '#FEF3C7',
        icon: '#F59E0B',
        text: '#B45309',
      },
      [TermCategory.MINERAL]: {
        bg: '#F3E8FF',
        iconBg: '#EDE9FE',
        icon: '#A855F7',
        text: '#6D28D9',
      },
      [TermCategory.INSECT]: {
        bg: '#FEF3C7',
        iconBg: '#FDE68A',
        icon: '#D97706',
        text: '#92400E',
      },
      [TermCategory.COMPONENT]: {
        bg: '#FEF2F2',
        iconBg: '#FEE2E2',
        icon: '#EF4444',
        text: '#B91C1C',
      },
      [TermCategory.DISEASE]: {
        bg: '#FDF2F8',
        iconBg: '#FCE7F3',
        icon: '#EC4899',
        text: '#BE185D',
      },
      [TermCategory.ANATOMY]: {
        bg: '#EEF2FF',
        iconBg: '#E0E7FF',
        icon: '#6366F1',
        text: '#4338CA',
      },
    };
    return themes[category] || themes[TermCategory.DRUG];
  };

  // Category icon mapping
  const getCategoryIcon = (category: TermCategory) => {
    const iconMap = {
      [TermCategory.DRUG]: 'medical',
      [TermCategory.PLANT]: 'leaf',
      [TermCategory.VITAMIN]: 'flask',
      [TermCategory.MINERAL]: 'diamond',
      [TermCategory.INSECT]: 'bug',
      [TermCategory.COMPONENT]: 'nuclear',
      [TermCategory.DISEASE]: 'medical-outline',
      [TermCategory.ANATOMY]: 'body',
    };
    return iconMap[category] || 'medical';
  };

  const handleCategoryPress = (category: TermCategory) => {
    navigation.navigate('CategoryDetail' as never, { category } as never);
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header with Glassmorphism */}
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
        <View style={styles.header}>
          <Text style={styles.title}>Kategoriler</Text>
        </View>
      </BlurView>

      {/* ScrollView Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_HEIGHT + 20, paddingBottom: 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Bento Grid Container */}
        <View style={styles.bentoGrid}>
          {bentoCategories.map((item) => {
            const config = TermCategoryConfig[item.category];
            const theme = getCategoryTheme(item.category);
            const icon = getCategoryIcon(item.category);
            const count = categoryCounts[item.category] || 0;

            return (
              <BentoCard
                key={item.category}
                title={item.category}
                icon={icon}
                count={count}
                size={item.size}
                tags={item.tags}
                description={config.description}
                bgColor={theme.bg}
                iconBgColor={theme.iconBg}
                iconColor={theme.icon}
                textColor={theme.text}
                onPress={() => handleCategoryPress(item.category)}
              />
            );
          })}
        </View>
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
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: 0.2,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default CategoriesView;
