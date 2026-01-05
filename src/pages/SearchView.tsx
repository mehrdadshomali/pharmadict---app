/**
 * ============================================================================
 * SEARCH VIEW - ARAMA SAYFASI
 * ============================================================================
 * 
 * Kullanıcıların terim araması yapabildiği sayfa.
 * 
 * ÖZELLİKLER:
 * 1. Gerçek zamanlı arama (yazarken sonuçlar güncellenir)
 * 2. Arama geçmişi (AsyncStorage'da saklanır)
 * 3. Popüler aramalar
 * 4. Otomatik tamamlama önerileri
 * 5. Arama sonuçları listesi
 * 
 * ARAMA MANTIĞI:
 * - Latince isim, Türkçe isim, tanım ve eşanlamlılarda arar
 * - Büyük/küçük harf duyarsız
 * - 2 karakterden sonra öneriler gösterilir
 * ============================================================================
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Yerel depolama
import { usePharmacy } from "../context/PharmacyContext";
import { useTheme } from "../context/ThemeContext";
import type { SearchResult, PharmacyTerm } from "../types/models";
import TermCard from "../components/TermCard";

/**
 * SEARCH VIEW BİLEŞENİ
 * --------------------------------
 * Arama sayfası ana bileşeni
 */
const SearchView = () => {
  // HOOK'LAR
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const { searchText, setSearchText, searchResults, searchTerms, terms } = usePharmacy();
  
  // STATE'LER
  const [searchHistory, setSearchHistory] = useState<string[]>([]);      // Arama geçmişi
  const [suggestions, setSuggestions] = useState<PharmacyTerm[]>([]);    // Öneriler
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]); // Popüler aramalar
  const [isSearching, setIsSearching] = useState(false);                  // Aranıyor mu?
  const [showSuggestions, setShowSuggestions] = useState(false);          // Önerileri göster
  const inputRef = useRef<TextInput>(null);                               // Input referansı

  /**
   * SAYFA AÇILDIĞINDA GEÇMİŞ VE POPÜLER ARAMALARI YÜKLE
   */
  useEffect(() => {
    loadHistory();
    loadTrendingSearches();
  }, []);

  /**
   * ARAMA METNİ DEĞİŞTİĞİNDE ÖNERİLER OLUŞTUR
   */
  useEffect(() => {
    if (searchText && searchText.length >= 2) {
      generateSuggestions(searchText);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchText]);

  /**
   * ARAMA GEÇMİŞİNİ YÜKLE
   * AsyncStorage'dan önceki aramaları çeker
   */
  const loadHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("searchHistory");
      if (history) setSearchHistory(JSON.parse(history));
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  };

  const loadTrendingSearches = async () => {
    try {
      // Use terms from context instead of TermService
      const shuffled = [...terms].sort(() => 0.5 - Math.random());
      setTrendingSearches(shuffled.slice(0, 5).map((term) => term.latinName));
    } catch (error) {
      console.error("Error loading trending searches:", error);
    }
  };

  const generateSuggestions = (query: string) => {
    if (!terms || terms.length === 0) return;
    const queryLower = query.toLowerCase();
    const matched = terms
      .filter(
        (term) =>
          term.latinName?.toLowerCase().includes(queryLower) ||
          term.turkishName?.toLowerCase().includes(queryLower)
      )
      .slice(0, 5);
    setSuggestions(matched);
  };

  const handleSearch = async (query: string) => {
    setSearchText(query);
    setShowSuggestions(false);
    setIsSearching(true);
    if (query.trim()) {
      await searchTerms(query);
      const newHistory = [
        query,
        ...searchHistory.filter((h) => h !== query),
      ].slice(0, 10);
      setSearchHistory(newHistory);
      try {
        await AsyncStorage.setItem("searchHistory", JSON.stringify(newHistory));
      } catch (error) {
        console.error("Error saving search history:", error);
      }
    }
    setIsSearching(false);
  };

  const clearHistory = async () => {
    setSearchHistory([]);
    try {
      await AsyncStorage.removeItem("searchHistory");
    } catch (error) {
      console.error("Error clearing search history:", error);
    }
  };

  const hasResults = searchText && searchResults.length > 0;
  const HEADER_HEIGHT = insets.top + 80;
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDark ? ["#0A0E14", "#0F1419"] : ["#FAFBFC", "#F3F4F6"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <BlurView
        intensity={isDark ? 40 : 60}
        tint={isDark ? "dark" : "light"}
        style={[
          styles.header,
          { paddingTop: insets.top, height: HEADER_HEIGHT },
        ]}
      >
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.primary} />
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              value={searchText}
              onChangeText={handleSearch}
              placeholder="Terim, ilaç veya bitki ara..."
              placeholderTextColor={colors.placeholder}
              autoFocus={false}
            />
            {searchText && (
              <TouchableOpacity
                onPress={() => {
                  setSearchText("");
                  handleSearch("");
                }}
                style={styles.clearBtn}
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={colors.textTertiary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </BlurView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_HEIGHT + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Aranıyor...</Text>
          </View>
        ) : hasResults ? (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Sonuçlar</Text>
              <View style={styles.resultsBadge}>
                <Text style={styles.resultsCount}>{searchResults.length}</Text>
              </View>
            </View>
            <View style={styles.resultsList}>
              {searchResults.map((result) => (
                <TermCard
                  key={result.term.id}
                  term={result.term}
                  onPress={() =>
                    navigation.navigate(
                      "TermDetail" as never,
                      { id: result.term.id } as never
                    )
                  }
                />
              ))}
            </View>
          </>
        ) : searchText && searchResults.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons
                name="search-outline"
                size={48}
                color={colors.textTertiary}
              />
            </View>
            <Text style={styles.emptyTitle}>Sonuç bulunamadı</Text>
            <Text style={styles.emptySubtext}>
              "{searchText}" için arama sonucu bulunamadı.
            </Text>
          </View>
        ) : showSuggestions && suggestions.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Öneriler</Text>
            <View style={styles.suggestionsList}>
              {suggestions.map((term) => (
                <TouchableOpacity
                  key={term.id}
                  style={styles.suggestionItem}
                  onPress={() => handleSearch(term.latinName)}
                >
                  <Ionicons
                    name="search-outline"
                    size={18}
                    color={colors.textTertiary}
                  />
                  <View style={styles.suggestionContent}>
                    <Text style={styles.suggestionMain}>{term.latinName}</Text>
                    <Text style={styles.suggestionSub}>{term.turkishName}</Text>
                  </View>
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={colors.textTertiary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <>
            {trendingSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons
                    name="trending-up"
                    size={18}
                    color={colors.primary}
                  />
                  <Text style={styles.sectionTitle}>Popüler Aramalar</Text>
                </View>
                <View style={styles.trendingContainer}>
                  {trendingSearches.map((term, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSearch(term)}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={
                          index === 0
                            ? (colors.gradientPrimary as [string, string])
                            : [colors.surface, colors.surface]
                        }
                        style={[
                          styles.trendingChip,
                          index !== 0 && {
                            borderWidth: 1,
                            borderColor: colors.border,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.trendingText,
                            { color: index === 0 ? "#FFFFFF" : colors.text },
                          ]}
                        >
                          {term}
                        </Text>
                        {index === 0 && (
                          <Ionicons name="flame" size={14} color="#FFFFFF" />
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {searchHistory.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderLeft}>
                    <Ionicons
                      name="time-outline"
                      size={18}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.sectionTitle}>Son Aramalar</Text>
                  </View>
                  <TouchableOpacity onPress={clearHistory}>
                    <Text style={styles.clearText}>Temizle</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.historyList}>
                  {searchHistory.map((term, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.historyItem}
                      onPress={() => handleSearch(term)}
                    >
                      <Ionicons
                        name="time"
                        size={18}
                        color={colors.textTertiary}
                      />
                      <Text style={styles.historyText}>{term}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          const newHistory = searchHistory.filter(
                            (_, i) => i !== index
                          );
                          setSearchHistory(newHistory);
                          AsyncStorage.setItem(
                            "searchHistory",
                            JSON.stringify(newHistory)
                          );
                        }}
                      >
                        <Ionicons
                          name="close"
                          size={18}
                          color={colors.textTertiary}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {searchHistory.length === 0 && trendingSearches.length === 0 && (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconContainer}>
                  <Ionicons name="search" size={48} color={colors.primary} />
                </View>
                <Text style={styles.emptyTitle}>Arama Yapın</Text>
                <Text style={styles.emptySubtext}>
                  Tıbbi terimleri, ilaç isimlerini ve daha fazlasını arayın.
                </Text>
              </View>
            )}
          </>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchContainer: { paddingHorizontal: 20, paddingVertical: 12 },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      fontWeight: "500",
    },
    clearBtn: { padding: 4 },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
    loadingContainer: { alignItems: "center", paddingVertical: 60 },
    loadingText: { marginTop: 12, fontSize: 14, color: colors.textSecondary },
    resultsHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      gap: 10,
    },
    resultsTitle: { fontSize: 20, fontWeight: "700", color: colors.text },
    resultsBadge: {
      backgroundColor: colors.primaryGlow,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
    },
    resultsCount: { fontSize: 13, fontWeight: "700", color: colors.primary },
    resultsList: { gap: 12 },
    section: { marginBottom: 28 },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
      gap: 8,
    },
    sectionHeaderLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: 8,
    },
    sectionTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
    clearText: { fontSize: 14, fontWeight: "600", color: colors.primary },
    trendingContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    trendingChip: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 12,
      gap: 6,
    },
    trendingText: { fontSize: 14, fontWeight: "600" },
    historyList: { gap: 8 },
    historyItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 12,
    },
    historyText: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
      fontWeight: "500",
    },
    suggestionsList: { gap: 8 },
    suggestionItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 12,
    },
    suggestionContent: { flex: 1 },
    suggestionMain: { fontSize: 15, fontWeight: "600", color: colors.text },
    suggestionSub: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
    emptyContainer: { alignItems: "center", paddingVertical: 60 },
    emptyIconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 20,
    },
  });

export default SearchView;
