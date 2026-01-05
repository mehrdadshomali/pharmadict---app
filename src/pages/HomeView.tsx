import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { usePharmacy } from "../context/PharmacyContext";
import { useTheme } from "../context/ThemeContext";
import type { PharmacyTerm } from "../types/models";
import TermCard from "../components/TermCard";
import MiniQuizCard from "../components/MiniQuizCard";
import CategoryCarousel from "../components/CategoryCarousel";

const HomeView = () => {
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme } = useTheme();
  const { terms, isLoading, setSearchText, searchTerms } = usePharmacy();
  const [recentTerms, setRecentTerms] = useState<PharmacyTerm[]>([]);
  const [featuredTerms, setFeaturedTerms] = useState<PharmacyTerm[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Poppins_700Bold,
  });

  const HEADER_HEIGHT = insets.top + 64;

  const loadData = async () => {
    console.log("🏠 HomeView loadData - terms count:", terms?.length || 0);

    if (!terms || terms.length === 0) {
      console.log("⚠️ HomeView - No terms available");
      setRecentTerms([]);
      setFeaturedTerms([]);
      return;
    }

    const allTerms = [...terms].sort((a, b) => {
      const dateA =
        a.createdAt instanceof Date
          ? a.createdAt.getTime()
          : new Date(a.createdAt).getTime();
      const dateB =
        b.createdAt instanceof Date
          ? b.createdAt.getTime()
          : new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    setRecentTerms(allTerms.slice(0, 5));

    try {
      const AsyncStorage =
        require("@react-native-async-storage/async-storage").default;
      const visitsData = await AsyncStorage.getItem("term_visits");
      const visits = visitsData ? JSON.parse(visitsData) : {};

      const termsWithVisits = terms
        .map((term) => ({ ...term, visitCount: visits[term.id] || 0 }))
        .filter((term) => term.visitCount > 0)
        .sort((a, b) => b.visitCount - a.visitCount)
        .slice(0, 5);

      if (termsWithVisits.length > 0) {
        setFeaturedTerms(
          termsWithVisits.map((term) => ({
            ...term,
            components: term.components || [],
            relatedTerms: term.relatedTerms || [],
            synonyms: term.synonyms || [],
            isBookmarked: Boolean(term.isBookmarked),
            createdAt:
              term.createdAt instanceof Date
                ? term.createdAt
                : new Date(term.createdAt),
            updatedAt:
              term.updatedAt instanceof Date
                ? term.updatedAt
                : new Date(term.updatedAt),
          }))
        );
      } else {
        const randomTerms = [...terms]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((term) => ({
            ...term,
            components: term.components || [],
            relatedTerms: term.relatedTerms || [],
            synonyms: term.synonyms || [],
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
        setFeaturedTerms(randomTerms);
      }
    } catch (error) {
      const randomTerms = [...terms]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((term) => ({
          ...term,
          components: term.components || [],
          relatedTerms: term.relatedTerms || [],
          synonyms: term.synonyms || [],
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
      setFeaturedTerms(randomTerms);
    }
  };

  useEffect(() => {
    loadData();
  }, [terms]);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  // Logo rotation animation
  useEffect(() => {
    const startRotation = () => {
      rotateAnim.setValue(0);
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== "web",
        })
      ).start();
    };
    startRotation();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Wait for fonts to load
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchText(query);
    if (query.trim()) {
      searchTerms(query);
      navigation.navigate("Search" as never);
    }
  };

  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container}>
      {/* Ambient Background Gradient */}
      <LinearGradient
        colors={
          isDark
            ? ["#0A0E14", "#0F1419", "#151B23"]
            : ["#FAFBFC", "#F3F4F6", "#E5E7EB"]
        }
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative Orbs */}
      <Animated.View
        style={[styles.orb, styles.orb1, { transform: [{ scale: pulseAnim }] }]}
      />
      <Animated.View
        style={[styles.orb, styles.orb2, { transform: [{ scale: pulseAnim }] }]}
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
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <LinearGradient
                colors={colors.gradientPrimary as [string, string]}
                style={styles.logoGradient}
              >
                <Ionicons name="medical" size={22} color="#FFFFFF" />
              </LinearGradient>
            </Animated.View>
            <Text style={styles.logoText}>Pharmadict</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => (navigation as any).navigate("Admin")}
              style={styles.adminButton}
            >
              <Ionicons
                name="add-circle-outline"
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
              <Ionicons
                name={isDark ? "sunny-outline" : "moon-outline"}
                size={22}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_HEIGHT + 32 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={colors.gradientHero as [string, string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>Pharmadict İle</Text>
                <Text style={styles.heroTitleAccent}>Keşfet</Text>
                <Text style={styles.heroSubtitle}>
                  1000'den fazla terim ile eczacılık dünyasını keşfet
                </Text>
              </View>
              <View style={styles.heroIconContainer}>
                <Ionicons
                  name="flask"
                  size={64}
                  color="rgba(255,255,255,0.3)"
                />
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
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Terim, ilaç veya bitki ara..."
              placeholderTextColor={colors.placeholder}
              onSubmitEditing={() =>
                searchQuery.trim() && navigation.navigate("Search" as never)
              }
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kategoriler</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Categories" as never)}
            >
              <Text style={styles.seeAllText}>Tümü</Text>
            </TouchableOpacity>
          </View>
          <CategoryCarousel />
        </View>

        {/* Featured Terms */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="star" size={18} color={colors.warning} />
              <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
            </View>
          </View>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : featuredTerms.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {featuredTerms.map((term) => (
                <View key={term.id} style={styles.featuredCardWrapper}>
                  <TermCard
                    term={term}
                    onPress={() =>
                      (navigation as any).navigate("TermDetail", {
                        id: term.id,
                      })
                    }
                    variant="featured"
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Henüz ziyaret edilen terim yok
              </Text>
            </View>
          )}
        </View>

        {/* Quiz Widget */}
        <MiniQuizCard />

        {/* Recent Terms */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="time-outline" size={18} color={colors.primary} />
              <Text style={styles.sectionTitle}>Son Eklenenler</Text>
            </View>
          </View>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : recentTerms.length > 0 ? (
            <View style={styles.recentList}>
              {recentTerms.map((term, index) => (
                <View
                  key={term.id}
                  style={index > 0 ? { marginTop: 12 } : undefined}
                >
                  <TermCard
                    term={term}
                    onPress={() =>
                      (navigation as any).navigate("TermDetail", {
                        id: term.id,
                      })
                    }
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Henüz terim eklenmemiş</Text>
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    orb: {
      position: "absolute",
      borderRadius: 999,
      opacity: isDark ? 0.12 : 0.08,
    },
    orb1: {
      width: 300,
      height: 300,
      backgroundColor: colors.primary,
      top: -100,
      right: -100,
    },
    orb2: {
      width: 250,
      height: 250,
      backgroundColor: colors.accent,
      bottom: 200,
      left: -100,
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    logoGradient: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      fontSize: 21,
      fontFamily: "Poppins_700Bold",
      color: colors.text,
      letterSpacing: 0.2,
    },
    themeToggle: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    adminButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.primaryGlow,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.primary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    heroContainer: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    heroCard: {
      borderRadius: 24,
      padding: 24,
      overflow: "hidden",
    },
    heroContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    heroTextContainer: {
      flex: 1,
    },
    heroTitle: {
      fontSize: 26,
      fontFamily: "Inter_700Bold",
      color: "#FFFFFF",
      letterSpacing: -0.3,
    },
    heroTitleAccent: {
      fontSize: 30,
      fontFamily: "Inter_700Bold",
      color: "rgba(255,255,255,0.95)",
      letterSpacing: -0.3,
      marginBottom: 10,
    },
    heroSubtitle: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: "rgba(255,255,255,0.85)",
      lineHeight: 21,
    },
    heroIconContainer: {
      marginLeft: 16,
    },
    searchContainer: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
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
      fontSize: 15,
      fontFamily: "Inter_400Regular",
      color: colors.text,
    },
    section: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    sectionTitle: {
      fontSize: 17,
      fontFamily: "Inter_600SemiBold",
      color: colors.text,
    },
    seeAllText: {
      fontSize: 14,
      fontFamily: "Inter_500Medium",
      color: colors.primary,
    },
    horizontalScroll: {
      paddingLeft: 20,
    },
    featuredCardWrapper: {
      width: 300,
      marginRight: 16,
    },
    loadingContainer: {
      paddingVertical: 40,
      alignItems: "center",
    },
    emptyContainer: {
      paddingVertical: 32,
      alignItems: "center",
    },
    emptyText: {
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      color: colors.textTertiary,
    },
    recentList: {
      paddingHorizontal: 20,
    },
  });

export default HomeView;
