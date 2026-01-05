// CategoryDetailView.tsx - Premium Category Detail Screen
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePharmacy } from "../context/PharmacyContext";
import { useTheme } from "../context/ThemeContext";
import { TermCategory, TermCategoryConfig } from "../types/models";
import type { PharmacyTerm } from "../types/models";
import TermCard from "../components/TermCard";

const getCategoryConfig = (category: TermCategory) => {
  const configs: {
    [key: string]: { icon: string; gradient: string[]; description: string };
  } = {
    [TermCategory.DRUG]: {
      icon: "medical",
      gradient: ["#3B82F6", "#1D4ED8"],
      description: "İlaçlar ve etken maddeler",
    },
    [TermCategory.PLANT]: {
      icon: "leaf",
      gradient: ["#10B981", "#059669"],
      description: "Tıbbi bitkiler ve şifalı otlar",
    },
    [TermCategory.VITAMIN]: {
      icon: "flask",
      gradient: ["#F59E0B", "#D97706"],
      description: "Vitaminler ve takviyeler",
    },
    [TermCategory.MINERAL]: {
      icon: "diamond",
      gradient: ["#8B5CF6", "#7C3AED"],
      description: "Mineraller ve eser elementler",
    },
    [TermCategory.INSECT]: {
      icon: "bug",
      gradient: ["#F97316", "#EA580C"],
      description: "Tıbbi böcekler",
    },
    [TermCategory.COMPONENT]: {
      icon: "nuclear",
      gradient: ["#EF4444", "#DC2626"],
      description: "Kimyasal bileşenler",
    },
    [TermCategory.DISEASE]: {
      icon: "fitness",
      gradient: ["#EC4899", "#DB2777"],
      description: "Hastalıklar ve tedaviler",
    },
    [TermCategory.ANATOMY]: {
      icon: "body",
      gradient: ["#6366F1", "#4F46E5"],
      description: "Anatomi ve organlar",
    },
  };
  return configs[category] || configs[TermCategory.DRUG];
};

const CategoryDetailView = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const { category } = (route.params as { category: string }) || {};
  const { getTermsByCategory } = usePharmacy();
  const [terms, setTerms] = useState<PharmacyTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (category) loadTerms(category as TermCategory);
  }, [category]);

  const loadTerms = async (cat: TermCategory) => {
    setIsLoading(true);
    const categoryTerms = await getTermsByCategory(cat);
    setTerms(categoryTerms);
    setIsLoading(false);
  };

  const categoryEnum = category as TermCategory;
  const categoryConfig = getCategoryConfig(categoryEnum);
  const config = TermCategoryConfig[categoryEnum];

  const filteredTerms = terms
    .filter((term) => {
      if (!term || !term.latinName || !term.turkishName || !term.definition)
        return false;
      if (!searchText || searchText.trim().length === 0) return true;
      const searchLower = searchText.toLowerCase();
      return (
        term.latinName.toLowerCase().includes(searchLower) ||
        term.turkishName.toLowerCase().includes(searchLower) ||
        term.definition.toLowerCase().includes(searchLower)
      );
    })
    .map((term) => ({
      ...term,
      isBookmarked: Boolean(term.isBookmarked),
      createdAt:
        term.createdAt instanceof Date
          ? term.createdAt
          : new Date(term.createdAt),
      updatedAt:
        term.updatedAt instanceof Date
          ? term.updatedAt
          : new Date(term.updatedAt),
    }));

  const styles = createStyles(colors, isDark);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={isDark ? ["#0A0E14", "#0F1419"] : ["#FAFBFC", "#F3F4F6"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

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
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <View style={{ width: 44 }} />
      </BlurView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 70 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={categoryConfig.gradient as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroDecorative1} />
            <View style={styles.heroDecorative2} />
            <View style={styles.heroContent}>
              <View style={styles.heroIconContainer}>
                <Ionicons
                  name={categoryConfig.icon as any}
                  size={32}
                  color="rgba(255,255,255,0.95)"
                />
              </View>
              <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>{category}</Text>
                <Text style={styles.heroSubtitle}>
                  {categoryConfig.description}
                </Text>
              </View>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>{terms.length} terim</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.textTertiary} />
            <TextInput
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Bu kategoride ara..."
              placeholderTextColor={colors.placeholder}
            />
            {searchText ? (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={colors.textTertiary}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Results Header */}
        {searchText && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {filteredTerms.length} sonuç bulundu
            </Text>
          </View>
        )}

        {/* Terms List */}
        {filteredTerms.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons
                name="search-outline"
                size={40}
                color={colors.textTertiary}
              />
            </View>
            <Text style={styles.emptyTitle}>
              {searchText
                ? "Sonuç bulunamadı"
                : "Bu kategoride henüz terim yok"}
            </Text>
            <Text style={styles.emptySubtext}>
              {searchText
                ? `"${searchText}" için sonuç bulunamadı.`
                : "Yakında yeni terimler eklenecek."}
            </Text>
          </View>
        ) : (
          <View style={styles.termsList}>
            {filteredTerms.map((term) => (
              <TermCard
                key={term.id}
                term={term}
                onPress={() =>
                  (navigation as any).navigate("TermDetail", { id: term.id })
                }
              />
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backBtn: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    headerTitle: { fontSize: 18, fontWeight: "700", color: colors.text },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
    heroCard: { marginBottom: 20, borderRadius: 24, overflow: "hidden" },
    heroGradient: { padding: 20, position: "relative", overflow: "hidden" },
    heroDecorative1: {
      position: "absolute",
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "rgba(255,255,255,0.1)",
      top: -40,
      right: -40,
    },
    heroDecorative2: {
      position: "absolute",
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "rgba(255,255,255,0.05)",
      bottom: -20,
      left: -20,
    },
    heroContent: { flexDirection: "row", alignItems: "center", gap: 14 },
    heroIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 18,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
    heroTextContainer: { flex: 1 },
    heroTitle: {
      fontSize: 22,
      fontWeight: "800",
      color: "#FFFFFF",
      marginBottom: 4,
      letterSpacing: -0.3,
    },
    heroSubtitle: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
    heroBadge: {
      backgroundColor: "rgba(255,255,255,0.25)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    heroBadgeText: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
    searchContainer: { marginBottom: 20 },
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
    searchInput: { flex: 1, fontSize: 16, color: colors.text },
    resultsHeader: { marginBottom: 16 },
    resultsText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: "500",
    },
    emptyContainer: { alignItems: "center", paddingVertical: 60 },
    emptyIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      paddingHorizontal: 40,
    },
    termsList: { gap: 12 },
  });

export default CategoryDetailView;
