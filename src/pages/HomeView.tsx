import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Nunito_800ExtraBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { usePharmacy } from '../context/PharmacyContext';
import { TermCategory, TermCategoryConfig } from '../types/models';
import type { PharmacyTerm } from '../types/models';
import TermCard from '../components/TermCard';
import MiniQuizCard from '../components/MiniQuizCard';
import CategoryCarousel from '../components/CategoryCarousel';
import LivingBackground from '../components/LivingBackground';
import TermService from '../services/TermService';

const HomeView = () => {
  const navigation = useNavigation();
  const { terms, isLoading, setSearchText, searchTerms } = usePharmacy();
  const [recentTerms, setRecentTerms] = useState<PharmacyTerm[]>([]);
  const [featuredTerms, setFeaturedTerms] = useState<PharmacyTerm[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  
  // Load Nunito font (rounded, clean font)
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
  });
  
  // Header height calculation (compact design: logo + minimal padding)
  const HEADER_HEIGHT = insets.top + 60;
  
  

  useEffect(() => {
    loadData();
  }, [terms]);

  useEffect(() => {
    // Sürekli 360 derece dönen animasyon - program çalıştıkça döner
    rotateAnim.setValue(0);
    const animation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      { iterations: -1 } // Sonsuz döngü
    );
    animation.start();
    
    return () => {
      animation.stop();
      animation.reset();
    };
  }, []);

  const loadData = async () => {
    console.log('🔍 HomeView - Total terms:', terms?.length || 0);
    if (!terms || terms.length === 0) {
      console.log('⚠️ HomeView - No terms available');
      setRecentTerms([]);
      setFeaturedTerms([]);
      return;
    }
    
    // Get recent terms (sorted by date)
    const allTerms = [...terms].sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime();
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    setRecentTerms(allTerms.slice(0, 5));
    
    // Get most visited terms for featured section using PharmacyContext terms
    try {
      // Get visit counts from AsyncStorage
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const visitsData = await AsyncStorage.getItem('term_visits');
      const visits = visitsData ? JSON.parse(visitsData) : {};
      
      // Map terms with visit counts and sort by visits
      const termsWithVisits = terms
        .map(term => ({
          ...term,
          visitCount: visits[term.id] || 0,
        }))
        .filter(term => term.visitCount > 0) // Only include visited terms
        .sort((a, b) => b.visitCount - a.visitCount) // Sort by visit count descending
        .slice(0, 5); // Get top 5
      
      if (termsWithVisits.length > 0) {
        // Normalize terms
        const normalizedFeatured = termsWithVisits.map(term => ({
          ...term,
          components: term.components || [],
          relatedTerms: term.relatedTerms || [],
          synonyms: term.synonyms || [],
          isBookmarked: Boolean(term.isBookmarked),
          createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
          updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
        }));
        setFeaturedTerms(normalizedFeatured);
        console.log('⭐ HomeView - Setting featured terms (most visited):', normalizedFeatured.map(t => t.latinName));
      } else {
        // Fallback to random terms if no visits yet
        const randomTerms = [...terms].sort(() => Math.random() - 0.5).slice(0, 3).map(term => ({
          ...term,
          components: term.components || [],
          relatedTerms: term.relatedTerms || [],
          synonyms: term.synonyms || [],
          isBookmarked: Boolean(term.isBookmarked),
          createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
          updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
        }));
        setFeaturedTerms(randomTerms);
        console.log('⭐ HomeView - Setting featured terms (random fallback):', randomTerms.map(t => t.latinName));
      }
    } catch (error) {
      console.error('Error loading featured terms:', error);
      // Fallback to random terms on error
      const randomTerms = [...terms].sort(() => Math.random() - 0.5).slice(0, 3).map(term => ({
        ...term,
        components: term.components || [],
        relatedTerms: term.relatedTerms || [],
        synonyms: term.synonyms || [],
        isBookmarked: Boolean(term.isBookmarked),
        createdAt: term.createdAt instanceof Date ? term.createdAt : new Date(term.createdAt),
        updatedAt: term.updatedAt instanceof Date ? term.updatedAt : new Date(term.updatedAt),
      }));
      setFeaturedTerms(randomTerms);
    }
  };

  const categories = Object.values(TermCategory).slice(0, 4);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchText(query);
    if (query.trim()) {
      searchTerms(query);
      navigation.navigate('Search' as never);
    }
  };

  const categoryColors: { [key: string]: { bg: string; icon: string; border: string } } = {
    [TermCategory.DRUG]: { bg: '#EFF6FF', icon: '#3B82F6', border: '#DBEAFE' }, // Pastel Mavi
    [TermCategory.PLANT]: { bg: '#ECFDF5', icon: '#10B981', border: '#D1FAE5' }, // Pastel Yeşil
    [TermCategory.VITAMIN]: { bg: '#FFF7ED', icon: '#F59E0B', border: '#FFEDD5' }, // Pastel Turuncu
    [TermCategory.MINERAL]: { bg: '#F3E8FF', icon: '#A855F7', border: '#E9D5FF' }, // Pastel Mor
  };

  return (
    <View style={styles.container}>
      {/* Living Background / Aurora Effect - En arkada */}
      <LivingBackground />
      
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
        <View style={styles.appHeader}>
          <Animated.View 
            style={[
              styles.headerLogoContainer,
              {
                transform: [
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Ionicons name="medical" size={32} color="#3B82F6" />
          </Animated.View>
          <Text style={[styles.appName, !fontsLoaded && styles.appNameFallback]}>Pharmadict</Text>
        </View>
      </BlurView>

      {/* ScrollView Content - LivingBackground'ın üzerinde */}
      <ScrollView
        style={[styles.scrollView, { zIndex: 1 }]}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_HEIGHT + 20, paddingBottom: 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content Card */}
      <LinearGradient
        colors={['#EFF6FF', '#DBEAFE', '#BFDBFE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.mainCard}
      >
        <View style={styles.cardContent}>
          <View style={styles.pillIconContainer}>
            {/* Glow Effect Behind Icons */}
            <View style={styles.iconGlow} />
            {/* Two Pills Icons */}
            <View style={styles.pillsWrapper}>
              {/* Top Pill - Capsule (diagonal, upward right) */}
              <View style={[styles.pillIcon, styles.pillCapsule]}>
                <Ionicons name="ellipse" size={24} color="#00BFFF" />
              </View>
              {/* Bottom Pill - Tablet (round with line) */}
              <View style={[styles.pillIcon, styles.pillTablet]}>
                <Ionicons name="ellipse" size={20} color="#00BFFF" />
              </View>
            </View>
          </View>
          <View style={styles.cardText}>
            <Text style={[styles.cardTitle, !fontsLoaded && styles.cardTitleFallback]}>
              <Text style={[styles.cardTitleMain, !fontsLoaded && styles.cardTitleFallback]}>Pharmadict</Text>{' '}
              ile{' '}
              <Text style={[styles.cardTitleHighlight, !fontsLoaded && styles.cardTitleFallback]}>keşfet</Text>
            </Text>
            <Text style={[styles.cardSubtitle, !fontsLoaded && styles.cardSubtitleFallback]}>
              Güncel terimlere kolayca{' '}
              <Text style={[styles.cardSubtitleHighlight, !fontsLoaded && styles.cardSubtitleFallback]}>eriş</Text>
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Terim ara..."
            placeholderTextColor="#9ca3af"
            onSubmitEditing={() => {
              if (searchQuery.trim()) {
                navigation.navigate('Search' as never);
              }
            }}
          />
        </View>
      </View>

      {/* Categories Carousel */}
      <View style={styles.categoriesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories' as never)}>
            <Text style={styles.linkText}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <CategoryCarousel />
      </View>

      {/* Featured Terms - Most Visited */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        ) : featuredTerms.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredTerms.map((term) => (
              <React.Fragment key={term.id}>
                <View style={{ width: 300, marginRight: 12 }}>
                  <TermCard
                    term={term}
                    onPress={() => (navigation as any).navigate('TermDetail', { id: term.id })}
                  />
                </View>
              </React.Fragment>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyFeaturedContainer}>
            <Text style={styles.emptyFeaturedText}>Henüz ziyaret edilen terim yok</Text>
          </View>
        )}
      </View>

      {/* Mini Quiz Widget */}
      <MiniQuizCard />

      {/* Son Eklenenler Section */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Son Eklenenler</Text>
        <View style={styles.recentList}>
          {recentTerms.map((term) => (
            <TermCard
              key={term.id}
              term={term}
              onPress={() => (navigation as any).navigate('TermDetail', { id: term.id })}
            />
          ))}
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Very light gray background to show LivingBackground
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
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    gap: 10,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent', // Transparent to show LivingBackground
  },
  scrollContent: {
    backgroundColor: 'transparent', // Transparent to show LivingBackground
  },
  headerLogoContainer: {
    width: 36,
    height: 36,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  appName: {
    fontSize: 24,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#00BFFF',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 191, 255, 0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,
  },
  appNameFallback: {
    fontWeight: '800',
    ...(Platform.OS === 'ios' ? {} : { fontFamily: 'System' }),
  },
  termsCounter: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  debugText: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 4,
  },
  mainCard: {
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 30,
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#93C5FD',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  pillIconContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#60A5FA',
    opacity: 0.2,
    borderRadius: 30,
    shadowColor: '#60A5FA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 5,
  },
  pillsWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  pillIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillCapsule: {
    top: 0,
    left: 0,
    transform: [{ rotate: '15deg' }],
  },
  pillTablet: {
    bottom: 2,
    right: 2,
    transform: [{ rotate: '-10deg' }],
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
    color: '#00BFFF',
    marginBottom: 4,
  },
  cardTitleMain: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
    color: '#00BFFF',
  },
  cardTitleHighlight: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
    color: '#00BFFF',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
    color: '#00BFFF',
    marginTop: 4,
  },
  cardSubtitleHighlight: {
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
    color: '#00BFFF',
  },
  cardTitleFallback: {
    fontWeight: '700',
    ...(Platform.OS === 'ios' ? {} : { fontFamily: 'System' }),
  },
  cardSubtitleFallback: {
    fontWeight: '700',
    ...(Platform.OS === 'ios' ? {} : { fontFamily: 'System' }),
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  linkText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    borderRadius: 24, // rounded-3xl
    padding: 20,
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIconContainer: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
    marginTop: 8,
  },
  featuredSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  featuredCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    width: 200,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featuredIcon: {
    marginBottom: 8,
  },
  featuredContent: {
    marginTop: 0,
  },
  termTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
  },
  termSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  categoryBadgeGray: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryBadgeTextGray: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  recentSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  recentList: {
    gap: 12,
    marginTop: 16,
  },
  recentItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recentIcon: {
    marginRight: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  recentSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  recentBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, // rounded-full
  },
  recentBadgeText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyFeaturedContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyFeaturedText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default HomeView;

