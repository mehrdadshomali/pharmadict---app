/**
 * ============================================================================
 * TERM CARD - TERİM KARTI BİLEŞENİ
 * ============================================================================
 * 
 * Bu bileşen, eczacılık terimlerini kart formatında gösterir.
 * Ana sayfa, arama sonuçları ve kategori detaylarında kullanılır.
 * 
 * ÖZELLİKLER:
 * - Kategori bazlı renk kodlaması (İlaç=mavi, Bitki=yeşil, vb.)
 * - İki farklı görünüm: "default" (liste) ve "featured" (öne çıkan)
 * - Latince ve Türkçe isim gösterimi
 * - Bileşen sayısı badge'i
 * - Tıklanabilir kart yapısı
 * 
 * PROPS (Parametreler):
 * - term: PharmacyTerm - Gösterilecek terim verisi
 * - onPress: () => void - Karta tıklandığında çalışacak fonksiyon
 * - variant: "default" | "featured" - Kart görünüm tipi
 * ============================================================================
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import type { PharmacyTerm } from "../types/models";
import { TermCategory } from "../types/models";

// Bileşen props tanımı (TypeScript interface)
interface TermCardProps {
  term: PharmacyTerm;        // Terim verisi
  onPress: () => void;       // Tıklama fonksiyonu
  variant?: "default" | "featured" | "compact"; // Görünüm tipi
}

/**
 * KATEGORİ YAPILANDIRMASI
 * --------------------------------
 * Her kategori için ikon, renk ve gradient tanımları.
 * Bu sayede her kategori farklı renkte görünür.
 */
const getCategoryConfig = (category: TermCategory) => {
  const configs = {
    [TermCategory.DRUG]: {
      icon: "medical",                           // İlaç ikonu
      gradient: ["#3B82F6", "#1D4ED8"],         // Mavi gradient
      lightBg: "rgba(59, 130, 246, 0.1)",       // Açık mavi arka plan
      color: "#3B82F6",                          // Ana renk
    },
    [TermCategory.PLANT]: {
      icon: "leaf",                              // Yaprak ikonu
      gradient: ["#10B981", "#059669"],         // Yeşil gradient
      lightBg: "rgba(16, 185, 129, 0.1)",
      color: "#10B981",
    },
    [TermCategory.VITAMIN]: {
      icon: "flask",                             // Şişe ikonu
      gradient: ["#F59E0B", "#D97706"],         // Turuncu gradient
      lightBg: "rgba(245, 158, 11, 0.1)",
      color: "#F59E0B",
    },
    [TermCategory.MINERAL]: {
      icon: "diamond",                           // Elmas ikonu
      gradient: ["#8B5CF6", "#7C3AED"],         // Mor gradient
      lightBg: "rgba(139, 92, 246, 0.1)",
      color: "#8B5CF6",
    },
    [TermCategory.INSECT]: {
      icon: "bug",                               // Böcek ikonu
      gradient: ["#F97316", "#EA580C"],         // Turuncu gradient
      lightBg: "rgba(249, 115, 22, 0.1)",
      color: "#F97316",
    },
    [TermCategory.COMPONENT]: {
      icon: "nuclear",                           // Atom ikonu
      gradient: ["#EF4444", "#DC2626"],         // Kırmızı gradient
      lightBg: "rgba(239, 68, 68, 0.1)",
      color: "#EF4444",
    },
    [TermCategory.DISEASE]: {
      icon: "fitness",                           // Sağlık ikonu
      gradient: ["#EC4899", "#DB2777"],         // Pembe gradient
      lightBg: "rgba(236, 72, 153, 0.1)",
      color: "#EC4899",
    },
    [TermCategory.ANATOMY]: {
      icon: "body",                              // Vücut ikonu
      gradient: ["#6366F1", "#4F46E5"],         // İndigo gradient
      lightBg: "rgba(99, 102, 241, 0.1)",
      color: "#6366F1",
    },
  };
  return configs[category] || configs[TermCategory.DRUG];
};

/**
 * TERM CARD BİLEŞENİ
 * --------------------------------
 * Ana kart bileşeni. variant prop'una göre farklı görünümler sunar.
 */
const TermCard: React.FC<TermCardProps> = ({
  term,
  onPress,
  variant = "default",
}) => {
  const { colors, isDark } = useTheme(); // Tema renklerini al
  const categoryConfig = getCategoryConfig(term.category); // Kategori yapılandırmasını al
  const componentCount = term.components?.length || 0; // Bileşen sayısı
  const displayComponents = term.components?.slice(0, 2) || []; // İlk 2 bileşeni göster

  // ÖNE ÇIKAN (FEATURED) GÖRÜNÜM - Yatay kaydırmalı kartlar için
  if (variant === "featured") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.featuredContainer}
      >
        <LinearGradient
          colors={
            isDark
              ? [colors.card, colors.surface]
              : [colors.card, colors.backgroundSecondary]
          }
          style={[styles.featuredCard, { borderColor: colors.border }]}
        >
          {/* Category Badge */}
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: categoryConfig.lightBg },
            ]}
          >
            <Ionicons
              name={categoryConfig.icon as any}
              size={14}
              color={categoryConfig.color}
            />
            <Text
              style={[
                styles.categoryBadgeText,
                { color: categoryConfig.color },
              ]}
            >
              {term.category}
            </Text>
          </View>

          {/* Content */}
          <Text
            style={[styles.featuredTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {term.latinName}
          </Text>
          <Text
            style={[styles.featuredSubtitle, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            {term.turkishName}
          </Text>
          <Text
            style={[styles.featuredDescription, { color: colors.textTertiary }]}
            numberOfLines={2}
          >
            {term.definition}
          </Text>

          {/* Footer */}
          <View style={styles.featuredFooter}>
            {componentCount > 0 && (
              <View
                style={[
                  styles.componentBadge,
                  { backgroundColor: colors.primaryGlow },
                ]}
              >
                <Text
                  style={[styles.componentBadgeText, { color: colors.primary }]}
                >
                  {componentCount} bileşen
                </Text>
              </View>
            )}
            <Ionicons name="arrow-forward" size={18} color={colors.primary} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Default variant
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      {/* Left Icon */}
      <LinearGradient
        colors={categoryConfig.gradient as [string, string]}
        style={styles.iconContainer}
      >
        <Ionicons name={categoryConfig.icon as any} size={20} color="#FFFFFF" />
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {term.latinName}
          </Text>
          {componentCount > 0 && (
            <View
              style={[
                styles.badge,
                { backgroundColor: categoryConfig.lightBg },
              ]}
            >
              <Text style={[styles.badgeText, { color: categoryConfig.color }]}>
                {componentCount}
              </Text>
            </View>
          )}
        </View>
        <Text
          style={[styles.subtitle, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {term.turkishName}
        </Text>
        <Text
          style={[styles.description, { color: colors.textTertiary }]}
          numberOfLines={2}
        >
          {term.definition}
        </Text>

        {/* Tags */}
        {displayComponents.length > 0 && (
          <View style={styles.tagsContainer}>
            {displayComponents.map((component, index) => (
              <View
                key={index}
                style={[
                  styles.tag,
                  { backgroundColor: colors.backgroundSecondary },
                ]}
              >
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>
                  {component}
                </Text>
              </View>
            ))}
            {term.components && term.components.length > 2 && (
              <View
                style={[
                  styles.tag,
                  { backgroundColor: colors.backgroundSecondary },
                ]}
              >
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>
                  +{term.components.length - 2}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Arrow */}
      <View style={styles.arrowContainer}>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textTertiary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
    letterSpacing: -0.2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: -0.1,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "500",
  },
  arrowContainer: {
    marginLeft: 8,
  },
  // Featured variant styles
  featuredContainer: {
    flex: 1,
  },
  featuredCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 180,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 5,
    marginBottom: 12,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  featuredTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  featuredSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  featuredDescription: {
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
    letterSpacing: -0.1,
  },
  featuredFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  componentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  componentBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default TermCard;
