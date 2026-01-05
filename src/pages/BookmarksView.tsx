// BookmarksView.tsx - Premium Favorites Screen
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePharmacy } from "../context/PharmacyContext";
import { useTheme } from "../context/ThemeContext";
import { notesService } from "../services/NotesService";
import type { PharmacyTerm } from "../types/models";
import TermCard from "../components/TermCard";

const BookmarksView = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const { getBookmarkedTerms } = usePharmacy();
  const [bookmarkedTerms, setBookmarkedTerms] = useState<PharmacyTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [termIdsWithNotes, setTermIdsWithNotes] = useState<string[]>([]);

  const HEADER_HEIGHT = insets.top + 60;

  useFocusEffect(
    React.useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    setIsLoading(true);
    const terms = await getBookmarkedTerms();
    const normalizedTerms = terms.map((term) => ({
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
      components: Array.isArray(term.components) ? term.components : [],
      relatedTerms: Array.isArray(term.relatedTerms) ? term.relatedTerms : [],
      synonyms: Array.isArray(term.synonyms) ? term.synonyms : [],
    }));
    setBookmarkedTerms(normalizedTerms);

    // Not olan terimleri yükle
    const noteIds = await notesService.getTermIdsWithNotes();
    setTermIdsWithNotes(noteIds);

    setIsLoading(false);
  };

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
        style={[
          styles.header,
          { paddingTop: insets.top, height: HEADER_HEIGHT },
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Favoriler</Text>
          {bookmarkedTerms.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{bookmarkedTerms.length}</Text>
            </View>
          )}
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
        {bookmarkedTerms.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <LinearGradient
                colors={["#EC4899", "#DB2777"]}
                style={styles.emptyIconGradient}
              >
                <Ionicons name="heart" size={40} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <Text style={styles.emptyTitle}>Henüz favori yok</Text>
            <Text style={styles.emptySubtext}>
              Beğendiğiniz terimleri favorilere ekleyerek buradan hızlıca
              erişebilirsiniz.
            </Text>
          </View>
        ) : (
          <>
            {/* Stats Card */}
            <View style={styles.statsCard}>
              <LinearGradient
                colors={["#EC4899", "#DB2777"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statsGradient}
              >
                <View style={styles.statsContent}>
                  <View style={styles.statsIconContainer}>
                    <Ionicons
                      name="heart"
                      size={24}
                      color="rgba(255,255,255,0.9)"
                    />
                  </View>
                  <View style={styles.statsTextContainer}>
                    <Text style={styles.statsTitle}>
                      {bookmarkedTerms.length} Favori Terim
                    </Text>
                    <Text style={styles.statsSubtitle}>
                      Kaydettiğiniz terimler burada
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Terms List */}
            <View style={styles.termsList}>
              {bookmarkedTerms.map((term) => (
                <View key={term.id} style={styles.termItemContainer}>
                  <TouchableOpacity
                    style={styles.termItemWrapper}
                    onPress={() =>
                      (navigation as any).navigate("TermDetail", {
                        id: term.id,
                      })
                    }
                    activeOpacity={0.7}
                  >
                    <TermCard term={term} onPress={() => {}} />
                  </TouchableOpacity>
                  {termIdsWithNotes.includes(term.id) && (
                    <View style={styles.noteIndicator}>
                      <Ionicons name="create" size={12} color="#FFFFFF" />
                    </View>
                  )}
                </View>
              ))}
            </View>
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
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      justifyContent: "flex-end",
      paddingBottom: 12,
      paddingHorizontal: 20,
    },
    headerContent: { flexDirection: "row", alignItems: "center", gap: 12 },
    headerTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: -0.5,
    },
    countBadge: {
      backgroundColor: "rgba(236, 72, 153, 0.15)",
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 12,
    },
    countText: { fontSize: 14, fontWeight: "700", color: "#EC4899" },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
    emptyContainer: { alignItems: "center", paddingVertical: 80 },
    emptyIconContainer: { marginBottom: 24 },
    emptyIconGradient: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 10,
    },
    emptySubtext: {
      fontSize: 15,
      color: colors.textSecondary,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 22,
    },
    statsCard: { marginBottom: 24, borderRadius: 20, overflow: "hidden" },
    statsGradient: { padding: 20 },
    statsContent: { flexDirection: "row", alignItems: "center", gap: 16 },
    statsIconContainer: {
      width: 50,
      height: 50,
      borderRadius: 14,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
    statsTextContainer: { flex: 1 },
    statsTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 4,
    },
    statsSubtitle: { fontSize: 13, color: "rgba(255,255,255,0.8)" },
    termsList: { gap: 12 },
    termItemContainer: {
      position: "relative",
    },
    termItemWrapper: {
      flex: 1,
    },
    noteIndicator: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: "#8B5CF6",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#8B5CF6",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
  });

export default BookmarksView;
