// CategoriesView.tsx - Premium Bento Grid Categories
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { TermCategory, TermCategoryConfig } from "../types/models";
import { usePharmacy } from "../context/PharmacyContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 12;
const PADDING = 20;
const CARD_WIDTH = (SCREEN_WIDTH - PADDING * 2 - CARD_GAP) / 2;

interface CategoryData {
  category: TermCategory;
  icon: string;
  gradient: string[];
  description: string;
}

const categoriesData: CategoryData[] = [
  {
    category: TermCategory.DRUG,
    icon: "medical",
    gradient: ["#3B82F6", "#1D4ED8"],
    description: "İlaçlar ve etken maddeler",
  },
  {
    category: TermCategory.PLANT,
    icon: "leaf",
    gradient: ["#10B981", "#059669"],
    description: "Tıbbi bitkiler ve şifalı otlar",
  },
  {
    category: TermCategory.VITAMIN,
    icon: "flask",
    gradient: ["#F59E0B", "#D97706"],
    description: "Vitaminler ve takviyeler",
  },
  {
    category: TermCategory.MINERAL,
    icon: "diamond",
    gradient: ["#8B5CF6", "#7C3AED"],
    description: "Mineraller ve eser elementler",
  },
  {
    category: TermCategory.DISEASE,
    icon: "fitness",
    gradient: ["#EC4899", "#DB2777"],
    description: "Hastalıklar ve tedaviler",
  },
  {
    category: TermCategory.INSECT,
    icon: "bug",
    gradient: ["#F97316", "#EA580C"],
    description: "Tıbbi böcekler",
  },
  {
    category: TermCategory.COMPONENT,
    icon: "nuclear",
    gradient: ["#EF4444", "#DC2626"],
    description: "Kimyasal bileşenler",
  },
  {
    category: TermCategory.ANATOMY,
    icon: "body",
    gradient: ["#6366F1", "#4F46E5"],
    description: "Anatomi ve organlar",
  },
];

const CategoriesView = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const { terms, getTermsByCategory } = usePharmacy();
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});

  const HEADER_HEIGHT = insets.top + 60;

  useEffect(() => {
    const loadCounts = async () => {
      const counts: { [key: string]: number } = {};
      for (const item of categoriesData) {
        const categoryTerms = await getTermsByCategory(item.category);
        counts[item.category] = categoryTerms.length;
      }
      setCategoryCounts(counts);
    };
    loadCounts();
  }, [terms, getTermsByCategory]);

  const getCategoryKey = (category: TermCategory) => {
    const keyMap: { [key: string]: string } = {
      [TermCategory.DRUG]: "drug",
      [TermCategory.PLANT]: "plant",
      [TermCategory.VITAMIN]: "vitamin",
      [TermCategory.MINERAL]: "mineral",
      [TermCategory.INSECT]: "insect",
      [TermCategory.COMPONENT]: "component",
      [TermCategory.DISEASE]: "disease",
      [TermCategory.ANATOMY]: "anatomy",
    };
    return keyMap[category] || "drug";
  };

  const handleCategoryPress = (category: TermCategory) => {
    navigation.navigate("CategoryDetail" as never, { category } as never);
  };

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
        <Text style={styles.headerTitle}>Kategoriler</Text>
      </BlurView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: HEADER_HEIGHT + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <LinearGradient
            colors={colors.gradientPrimary as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statsGradient}
          >
            <View style={styles.statsContent}>
              <View style={styles.statsIconContainer}>
                <Ionicons name="grid" size={28} color="rgba(255,255,255,0.9)" />
              </View>
              <View style={styles.statsTextContainer}>
                <Text style={styles.statsTitle}>
                  {categoriesData.length} Kategori
                </Text>
                <Text style={styles.statsSubtitle}>
                  Tüm tıbbi terimler kategorize edildi
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Bento Grid */}
        <View style={styles.grid}>
          {categoriesData.map((item, index) => {
            const count = categoryCounts[item.category] || 0;
            const isLarge = index === 0 || index === 3;

            return (
              <TouchableOpacity
                key={item.category}
                style={[styles.card, isLarge && styles.cardLarge]}
                onPress={() => handleCategoryPress(item.category)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={item.gradient as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  {/* Decorative Elements */}
                  <View style={styles.decorativeCircle1} />
                  <View style={styles.decorativeCircle2} />

                  {/* Count Badge */}
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{count}</Text>
                  </View>

                  {/* Content */}
                  <View style={styles.cardContent}>
                    <View style={styles.iconWrapper}>
                      <Ionicons
                        name={item.icon as any}
                        size={isLarge ? 36 : 28}
                        color="rgba(255,255,255,0.95)"
                      />
                    </View>
                    <Text
                      style={[
                        styles.cardTitle,
                        isLarge && styles.cardTitleLarge,
                      ]}
                    >
                      {item.category}
                    </Text>
                    {isLarge && (
                      <Text style={styles.cardDescription}>
                        {item.description}
                      </Text>
                    )}
                  </View>

                  {/* Arrow */}
                  <View style={styles.arrowContainer}>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color="rgba(255,255,255,0.7)"
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

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
      justifyContent: "flex-end",
      paddingBottom: 12,
      paddingHorizontal: 20,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: -0.5,
    },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: PADDING, paddingBottom: 20 },
    statsCard: { marginBottom: 24, borderRadius: 20, overflow: "hidden" },
    statsGradient: { padding: 20 },
    statsContent: { flexDirection: "row", alignItems: "center", gap: 16 },
    statsIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
    statsTextContainer: { flex: 1 },
    statsTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 4,
    },
    statsSubtitle: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: CARD_GAP },
    card: { width: CARD_WIDTH, borderRadius: 20, overflow: "hidden" },
    cardLarge: { width: SCREEN_WIDTH - PADDING * 2 },
    cardGradient: {
      padding: 18,
      minHeight: 140,
      position: "relative",
      overflow: "hidden",
    },
    decorativeCircle1: {
      position: "absolute",
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "rgba(255,255,255,0.1)",
      top: -40,
      right: -40,
    },
    decorativeCircle2: {
      position: "absolute",
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "rgba(255,255,255,0.05)",
      bottom: -20,
      left: -20,
    },
    countBadge: {
      position: "absolute",
      top: 14,
      right: 14,
      backgroundColor: "rgba(255,255,255,0.25)",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
    countText: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
    cardContent: { flex: 1, justifyContent: "flex-end" },
    iconWrapper: { marginBottom: 12 },
    cardTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: "#FFFFFF",
      letterSpacing: -0.3,
    },
    cardTitleLarge: { fontSize: 20 },
    cardDescription: {
      fontSize: 13,
      color: "rgba(255,255,255,0.8)",
      marginTop: 4,
    },
    arrowContainer: { position: "absolute", bottom: 14, right: 14 },
  });

export default CategoriesView;
