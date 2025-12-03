// CategoryCarousel.tsx - Horizontal Snap Carousel for Categories
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TermCategory } from '../types/models';

const CARD_WIDTH = 145;
const CARD_MARGIN = 15;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN; // 160

interface CategoryItem {
  id: string;
  category: TermCategory;
  name: string;
  count: number;
  icon: string;
  bgColor: string;
  iconColor: string;
}

const categories: CategoryItem[] = [
  {
    id: '1',
    category: TermCategory.DRUG,
    name: 'İlaçlar',
    count: 120,
    icon: 'medical',
    bgColor: '#EFF6FF',
    iconColor: '#3B82F6',
  },
  {
    id: '2',
    category: TermCategory.PLANT,
    name: 'Bitkiler',
    count: 95,
    icon: 'leaf',
    bgColor: '#ECFDF5',
    iconColor: '#10B981',
  },
  {
    id: '3',
    category: TermCategory.VITAMIN,
    name: 'Vitaminler',
    count: 88,
    icon: 'flask',
    bgColor: '#FFF7ED',
    iconColor: '#F59E0B',
  },
  {
    id: '4',
    category: TermCategory.MINERAL,
    name: 'Mineraller',
    count: 75,
    icon: 'diamond',
    bgColor: '#F3E8FF',
    iconColor: '#A855F7',
  },
  {
    id: '5',
    category: TermCategory.INSECT,
    name: 'Böcekler',
    count: 100,
    icon: 'bug',
    bgColor: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    id: '6',
    category: TermCategory.ANATOMY,
    name: 'Anatomi',
    count: 60,
    icon: 'body',
    bgColor: '#EEF2FF',
    iconColor: '#6366F1',
  },
];

const CategoryCarousel: React.FC = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (category: TermCategory) => {
    navigation.navigate('CategoryDetail' as never, { category } as never);
  };

  const renderCategoryCard = ({ item }: { item: CategoryItem }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          { backgroundColor: item.bgColor },
        ]}
        onPress={() => handleCategoryPress(item.category)}
        activeOpacity={0.8}
      >
        {/* Top Row: Icon and Badge */}
        <View style={styles.topRow}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon as any} size={32} color={item.iconColor} />
          </View>
          <View style={[styles.badge, { backgroundColor: item.iconColor }]}>
            <Text style={styles.badgeText}>{item.count}</Text>
          </View>
        </View>

        {/* Bottom Row: Category Name */}
        <View style={styles.bottomRow}>
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        contentContainerStyle={styles.contentContainer}
        snapToAlignment="start"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingRight: 20,
  },
  categoryCard: {
    width: CARD_WIDTH,
    height: 160,
    borderRadius: 24,
    padding: 16,
    marginRight: CARD_MARGIN,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    flex: 1,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomRow: {
    marginTop: 'auto',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
});

export default CategoryCarousel;

