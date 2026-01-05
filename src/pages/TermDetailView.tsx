// TermDetailView.tsx - Premium Term Detail Screen
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Share,
  Alert,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePharmacy } from "../context/PharmacyContext";
import { useTheme } from "../context/ThemeContext";
import { pharmacyTermService } from "../services/PharmacyTermService";
import { notesService, TermNote } from "../services/NotesService";
import type { PharmacyTerm } from "../types/models";
import { TermCategory, TermCategoryConfig } from "../types/models";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const getCategoryConfig = (category: TermCategory) => {
  const configs: { [key: string]: { icon: string; gradient: string[] } } = {
    [TermCategory.DRUG]: { icon: "medical", gradient: ["#3B82F6", "#1D4ED8"] },
    [TermCategory.PLANT]: { icon: "leaf", gradient: ["#10B981", "#059669"] },
    [TermCategory.VITAMIN]: { icon: "flask", gradient: ["#F59E0B", "#D97706"] },
    [TermCategory.MINERAL]: {
      icon: "diamond",
      gradient: ["#8B5CF6", "#7C3AED"],
    },
    [TermCategory.INSECT]: { icon: "bug", gradient: ["#F97316", "#EA580C"] },
    [TermCategory.COMPONENT]: {
      icon: "nuclear",
      gradient: ["#EF4444", "#DC2626"],
    },
    [TermCategory.DISEASE]: {
      icon: "fitness",
      gradient: ["#EC4899", "#DB2777"],
    },
    [TermCategory.ANATOMY]: { icon: "body", gradient: ["#6366F1", "#4F46E5"] },
  };
  return configs[category] || configs[TermCategory.DRUG];
};

const TermDetailView = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const { id } = (route.params as { id: string }) || {};
  const { toggleBookmark } = usePharmacy();
  const [term, setTerm] = useState<PharmacyTerm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedTerms, setRelatedTerms] = useState<PharmacyTerm[]>([]);
  const [note, setNote] = useState<TermNote | null>(null);
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (id) loadTerm(id);
  }, [id]);

  const loadTerm = async (termId: string) => {
    setIsLoading(true);
    const loadedTerm = await pharmacyTermService.getTermById(termId);
    if (loadedTerm) {
      setTerm(loadedTerm);
      const related = await pharmacyTermService.getRelatedTerms(loadedTerm);
      setRelatedTerms(related);
      // Not yükle
      const termNote = await notesService.getNote(termId);
      setNote(termNote);
      setNoteText(termNote?.content || "");
    }
    setIsLoading(false);
  };

  const handleOpenNoteModal = () => {
    setNoteText(note?.content || "");
    setIsNoteModalVisible(true);
  };

  const handleSaveNote = async () => {
    if (term) {
      const savedNote = await notesService.saveNote(term.id, noteText);
      if (noteText.trim() === "") {
        setNote(null);
      } else {
        setNote(savedNote);
      }
      setIsNoteModalVisible(false);
    }
  };

  const handleDeleteNote = async () => {
    if (term) {
      Alert.alert("Notu Sil", "Bu notu silmek istediğinizden emin misiniz?", [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          style: "destructive",
          onPress: async () => {
            await notesService.deleteNote(term.id);
            setNote(null);
            setNoteText("");
            setIsNoteModalVisible(false);
          },
        },
      ]);
    }
  };

  const handleToggleBookmark = async () => {
    if (term) {
      await toggleBookmark(term.id);
      const updatedTerm = await pharmacyTermService.getTermById(term.id);
      if (updatedTerm) {
        setTerm({
          ...updatedTerm,
          isBookmarked: Boolean(updatedTerm.isBookmarked),
          createdAt:
            updatedTerm.createdAt instanceof Date
              ? updatedTerm.createdAt
              : new Date(updatedTerm.createdAt),
          updatedAt:
            updatedTerm.updatedAt instanceof Date
              ? updatedTerm.updatedAt
              : new Date(updatedTerm.updatedAt),
          components: Array.isArray(updatedTerm.components)
            ? updatedTerm.components
            : [],
          relatedTerms: Array.isArray(updatedTerm.relatedTerms)
            ? updatedTerm.relatedTerms
            : [],
          synonyms: Array.isArray(updatedTerm.synonyms)
            ? updatedTerm.synonyms
            : [],
        });
      }
    }
  };

  const handleShare = async () => {
    if (!term) return;

    try {
      const shareMessage = `📚 ${term.latinName} (${term.turkishName})

📖 Tanım: ${term.definition}

🏷️ Kategori: ${term.category}
${term.usage ? `\n💊 Kullanım: ${term.usage}` : ""}
${
  term.components && term.components.length > 0
    ? `\n🧪 Bileşenler: ${term.components.join(", ")}`
    : ""
}

📱 Pharmadict uygulamasından paylaşıldı`;

      await Share.share({
        message: shareMessage,
        title: `${term.latinName} - Pharmadict`,
      });
    } catch (error) {
      console.error("Share error:", error);
      Alert.alert("Hata", "Paylaşım yapılamadı");
    }
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

  if (!term) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={isDark ? ["#0A0E14", "#0F1419"] : ["#FAFBFC", "#F3F4F6"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Terim bulunamadı</Text>
        </View>
      </View>
    );
  }

  const categoryConfig = getCategoryConfig(term.category);
  const config = TermCategoryConfig[term.category];

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
          style={styles.headerBtn}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={handleToggleBookmark}
            style={styles.headerBtn}
          >
            <Ionicons
              name={term.isBookmarked ? "heart" : "heart-outline"}
              size={24}
              color={term.isBookmarked ? "#EC4899" : colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} onPress={handleShare}>
            <Ionicons
              name="share-outline"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </BlurView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 60 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
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
                  size={40}
                  color="rgba(255,255,255,0.95)"
                />
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{term.category}</Text>
              </View>
              <Text style={styles.heroTitle}>{term.latinName}</Text>
              <Text style={styles.heroSubtitle}>{term.turkishName}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Definition Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.cardTitle}>Tanım</Text>
          </View>
          <Text style={styles.cardText}>{term.definition}</Text>
        </View>

        {/* Etymology */}
        {term.etymology && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="book-outline" size={20} color={colors.accent} />
              <Text style={styles.cardTitle}>Etimoloji</Text>
            </View>
            <Text style={styles.cardText}>{term.etymology}</Text>
          </View>
        )}

        {/* Usage */}
        {term.usage && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={colors.info}
              />
              <Text style={styles.cardTitle}>Kullanım</Text>
            </View>
            <Text style={styles.cardText}>{term.usage}</Text>
          </View>
        )}

        {/* Components */}
        {term.components && term.components.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons
                name="layers-outline"
                size={20}
                color={colors.warning}
              />
              <Text style={styles.cardTitle}>Bileşenler</Text>
            </View>
            <View style={styles.tagsContainer}>
              {term.components.map((component, index) => (
                <View
                  key={index}
                  style={[styles.tag, { backgroundColor: colors.warningLight }]}
                >
                  <Text style={[styles.tagText, { color: colors.warning }]}>
                    {component}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Side Effects */}
        {term.sideEffects && term.sideEffects.length > 0 && (
          <View
            style={[styles.card, { borderColor: colors.error, borderWidth: 1 }]}
          >
            <View style={styles.cardHeader}>
              <Ionicons name="warning-outline" size={20} color={colors.error} />
              <Text style={[styles.cardTitle, { color: colors.error }]}>
                Yan Etkiler
              </Text>
            </View>
            {term.sideEffects.map((effect, index) => (
              <View key={index} style={styles.listItem}>
                <View
                  style={[styles.bullet, { backgroundColor: colors.error }]}
                />
                <Text style={styles.listText}>{effect}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Dosage */}
        {term.dosage && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons
                name="medical-outline"
                size={20}
                color={colors.success}
              />
              <Text style={styles.cardTitle}>Doz</Text>
            </View>
            <Text style={styles.cardText}>{term.dosage}</Text>
          </View>
        )}

        {/* Personal Notes Section */}
        <View style={[styles.card, styles.notesCard]}>
          <View style={styles.cardHeader}>
            <Ionicons name="create-outline" size={20} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Kişisel Notlarım</Text>
          </View>
          {note && note.content ? (
            <TouchableOpacity onPress={handleOpenNoteModal} activeOpacity={0.7}>
              <View style={styles.noteContent}>
                <Text style={styles.noteText} numberOfLines={5}>
                  {note.content}
                </Text>
                <View style={styles.noteFooter}>
                  <Text style={styles.noteDate}>
                    Son güncelleme: {note.updatedAt.toLocaleDateString("tr-TR")}
                  </Text>
                  <View style={styles.noteEditBadge}>
                    <Ionicons name="pencil" size={12} color="#8B5CF6" />
                    <Text style={styles.noteEditText}>Düzenle</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addNoteButton}
              onPress={handleOpenNoteModal}
            >
              <Ionicons name="add-circle-outline" size={24} color="#8B5CF6" />
              <Text style={styles.addNoteText}>Not ekle</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="link-outline" size={20} color={colors.primary} />
              <Text style={styles.cardTitle}>İlgili Terimler</Text>
            </View>
            <View style={styles.relatedList}>
              {relatedTerms.map((relatedTerm) => (
                <TouchableOpacity
                  key={relatedTerm.id}
                  style={styles.relatedItem}
                  onPress={() =>
                    (navigation as any).navigate("TermDetail", {
                      id: relatedTerm.id,
                    })
                  }
                >
                  <View style={styles.relatedContent}>
                    <Text style={styles.relatedTitle}>
                      {relatedTerm.latinName}
                    </Text>
                    <Text style={styles.relatedSubtitle}>
                      {relatedTerm.turkishName}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.textTertiary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Note Modal */}
      <Modal
        visible={isNoteModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsNoteModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <BlurView
              intensity={isDark ? 80 : 90}
              tint={isDark ? "dark" : "light"}
              style={styles.modalContent}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>📝 Not Ekle</Text>
                <TouchableOpacity
                  onPress={() => setIsNoteModalVisible(false)}
                  style={styles.modalCloseBtn}
                >
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSubtitle}>
                {term?.latinName} için kişisel notunuz
              </Text>

              <TextInput
                style={styles.noteInput}
                multiline
                placeholder="Notunuzu buraya yazın... (örn: Sınavda çıkabilir, yan etkilere dikkat!)"
                placeholderTextColor={colors.textTertiary}
                value={noteText}
                onChangeText={setNoteText}
                textAlignVertical="top"
              />

              <View style={styles.modalActions}>
                {note && note.content && (
                  <TouchableOpacity
                    style={styles.deleteNoteBtn}
                    onPress={handleDeleteNote}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setIsNoteModalVisible(false)}
                >
                  <Text style={styles.cancelBtnText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveNoteBtn}
                  onPress={handleSaveNote}
                >
                  <LinearGradient
                    colors={["#8B5CF6", "#7C3AED"]}
                    style={styles.saveNoteBtnGradient}
                  >
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    <Text style={styles.saveNoteBtnText}>Kaydet</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    errorText: { fontSize: 16, color: colors.textSecondary },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerBtn: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    headerActions: { flexDirection: "row", gap: 10 },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
    heroSection: { marginBottom: 24, borderRadius: 24, overflow: "hidden" },
    heroGradient: { padding: 24, position: "relative", overflow: "hidden" },
    heroDecorative1: {
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "rgba(255,255,255,0.1)",
      top: -50,
      right: -50,
    },
    heroDecorative2: {
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "rgba(255,255,255,0.05)",
      bottom: -30,
      left: -30,
    },
    heroContent: { alignItems: "center" },
    heroIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 24,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    categoryBadge: {
      backgroundColor: "rgba(255,255,255,0.25)",
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 12,
      marginBottom: 12,
    },
    categoryBadgeText: { fontSize: 12, fontWeight: "700", color: "#FFFFFF" },
    heroTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: "#FFFFFF",
      textAlign: "center",
      marginBottom: 6,
      letterSpacing: -0.5,
    },
    heroSubtitle: {
      fontSize: 18,
      color: "rgba(255,255,255,0.85)",
      textAlign: "center",
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 14,
    },
    cardTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
    cardText: { fontSize: 15, color: colors.textSecondary, lineHeight: 24 },
    tagsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    tag: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
    tagText: { fontSize: 13, fontWeight: "600" },
    listItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 10,
      gap: 10,
    },
    bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
    listText: {
      flex: 1,
      fontSize: 15,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    relatedList: { gap: 10 },
    relatedItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    relatedContent: { flex: 1 },
    relatedTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 2,
    },
    relatedSubtitle: { fontSize: 13, color: colors.textSecondary },
    // Notes styles
    notesCard: {
      borderColor: "rgba(139, 92, 246, 0.3)",
      borderWidth: 1,
    },
    noteContent: {
      backgroundColor: isDark
        ? "rgba(139, 92, 246, 0.1)"
        : "rgba(139, 92, 246, 0.05)",
      borderRadius: 12,
      padding: 14,
    },
    noteText: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 22,
    },
    noteFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDark
        ? "rgba(139, 92, 246, 0.2)"
        : "rgba(139, 92, 246, 0.15)",
    },
    noteDate: {
      fontSize: 12,
      color: colors.textTertiary,
    },
    noteEditBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: isDark
        ? "rgba(139, 92, 246, 0.2)"
        : "rgba(139, 92, 246, 0.1)",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    noteEditText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#8B5CF6",
    },
    addNoteButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: isDark
        ? "rgba(139, 92, 246, 0.1)"
        : "rgba(139, 92, 246, 0.05)",
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: "rgba(139, 92, 246, 0.2)",
      borderStyle: "dashed",
    },
    addNoteText: {
      fontSize: 15,
      fontWeight: "600",
      color: "#8B5CF6",
    },
    // Modal styles
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
      maxHeight: "80%",
    },
    modalContent: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      paddingBottom: 40,
      overflow: "hidden",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    modalCloseBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    modalSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    noteInput: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      fontSize: 15,
      color: colors.text,
      minHeight: 150,
      maxHeight: 250,
      borderWidth: 1,
      borderColor: colors.border,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 12,
      marginTop: 16,
    },
    deleteNoteBtn: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "auto",
    },
    cancelBtn: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
    cancelBtnText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.textSecondary,
    },
    saveNoteBtn: {
      borderRadius: 12,
      overflow: "hidden",
    },
    saveNoteBtnGradient: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    saveNoteBtnText: {
      fontSize: 15,
      fontWeight: "700",
      color: "#FFFFFF",
    },
  });

export default TermDetailView;
