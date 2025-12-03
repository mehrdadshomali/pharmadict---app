// CategoryDetailScreen.js - Pixel-Perfect Design with StyleSheet
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TermService from '../services/TermService';
import TermCard from '../components/TermCard';

const CategoryDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params || {};

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Alfabetik');

  // Category mapping
  const categoryMap = {
    'İlaçlar': 'drug',
    'Bitkiler': 'plant',
    'Vitaminler': 'vitamin',
    'Mineraller': 'mineral',
    'Böcekler': 'insect',
    'Bileşenler': 'component',
    'Hastalıklar': 'disease',
    'Anatomi': 'anatomy',
  };

  // Category descriptions
  const categoryDescriptions = {
    'İlaçlar': 'Farmakoloji alanındaki ilaçlar, etken maddeler ve tedavi edici bileşenler',
    'Bitkiler': 'Tıbbi bitkiler ve fitoterapötik ürünler',
    'Vitaminler': 'Vitaminler ve besin takviyeleri',
    'Mineraller': 'Mineraller ve eser elementler',
    'Böcekler': 'Böcek kaynaklı tıbbi ürünler',
    'Bileşenler': 'Kimyasal bileşenler ve aktif maddeler',
    'Hastalıklar': 'Hastalık isimleri ve tıbbi durumlar',
    'Anatomi': 'Anatomik yapılar ve organlar',
  };

  // Category color themes
  const getCategoryColor = (categoryName) => {
    const colors = {
      'İlaçlar': {
        primary: '#2563eb', // blue-600
        light: '#dbeafe', // blue-50
        text: '#2563eb', // blue-600
      },
      'Bitkiler': {
        primary: '#10b981', // green-500
        light: '#d1fae5', // green-100
        text: '#059669', // green-600
      },
      'Vitaminler': {
        primary: '#f59e0b', // amber-500
        light: '#fef3c7', // amber-100
        text: '#d97706', // amber-600
      },
      'Mineraller': {
        primary: '#8b5cf6', // violet-500
        light: '#ede9fe', // violet-100
        text: '#7c3aed', // violet-600
      },
      'Böcekler': {
        primary: '#d97706', // amber-600
        light: '#fef3c7', // amber-100
        text: '#b45309', // amber-700
      },
      'Bileşenler': {
        primary: '#ef4444', // red-500
        light: '#fee2e2', // red-100
        text: '#dc2626', // red-600
      },
      'Hastalıklar': {
        primary: '#ec4899', // pink-500
        light: '#fce7f3', // pink-100
        text: '#db2777', // pink-600
      },
      'Anatomi': {
        primary: '#6366f1', // indigo-500
        light: '#e0e7ff', // indigo-100
        text: '#4f46e5', // indigo-600
      },
    };
    return colors[categoryName] || colors['İlaçlar'];
  };

  const categoryKey = categoryMap[category] || category?.toLowerCase() || 'drug';
  const categoryName = category || 'İlaçlar';
  const categoryColor = getCategoryColor(categoryName);
  const categoryDescription = categoryDescriptions[categoryName] || '';

  // Get terms by category
  const allTerms = useMemo(() => {
    return TermService.getTermsByCategory(categoryKey);
  }, [categoryKey]);

  // Filter and sort terms
  const filteredTerms = useMemo(() => {
    let terms = [...allTerms];

    // Search filter
    if (searchText.trim().length > 0) {
      const searchLower = searchText.toLowerCase();
      terms = terms.filter(term => {
        return (
          term.latinName?.toLowerCase().includes(searchLower) ||
          term.turkishName?.toLowerCase().includes(searchLower) ||
          term.definition?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Sort filter
    switch (selectedFilter) {
      case 'Alfabetik':
        terms.sort((a, b) => {
          const nameA = a.latinName?.toLowerCase() || '';
          const nameB = b.latinName?.toLowerCase() || '';
          return nameA.localeCompare(nameB, 'tr');
        });
        break;
      case 'Kategoriye Göre':
        // Already filtered by category
        break;
      case 'Son Eklenenler':
        terms.sort((a, b) => {
          const idA = parseInt(a.id) || 0;
          const idB = parseInt(b.id) || 0;
          return idB - idA;
        });
        break;
      default:
        break;
    }

    return terms;
  }, [allTerms, searchText, selectedFilter]);

  const filterOptions = ['Alfabetik', 'Kategoriye Göre', 'Son Eklenenler'];

  const handleTermPress = (term) => {
    navigation.navigate('TermDetail', { id: term.id });
  };

  // List Header Component
  const renderListHeader = () => (
    <View style={styles.headerContainer}>
      {/* Başlık */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <Text style={styles.headerDescription}>{categoryDescription}</Text>
      </View>

      {/* Arama Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Bu kategoride ara..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtreler */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filterOptions.map((filter) => {
          const isSelected = selectedFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterChip,
                isSelected
                  ? { backgroundColor: categoryColor.primary }
                  : { backgroundColor: '#F3F4F6' },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  isSelected ? { color: '#FFFFFF' } : { color: '#374151' },
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  // Render Item
  const renderItem = ({ item }) => (
    <TermCard term={item} onPress={() => handleTermPress(item)} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={categoryColor.primary}
            />
            <Text style={[styles.backButtonText, { color: categoryColor.primary }]}>
              Kategoriler
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms List */}
        {filteredTerms.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
            <Text style={styles.emptySubtext}>
              Farklı bir arama terimi deneyin
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTerms}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderListHeader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            style={styles.list}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButtonContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  searchContainer: {
    backgroundColor: '#F3F4F6',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  filtersContainer: {
    paddingRight: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CategoryDetailScreen;
