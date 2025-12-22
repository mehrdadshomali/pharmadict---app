// AdminView.tsx - Admin panel for adding and managing terms
import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { geminiService } from "../services/GeminiService";
import { firebaseService } from "../services/FirebaseService";
import { TermCategory } from "../types/models";

const AdminView: React.FC = () => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [termName, setTermName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleAnalyze = async () => {
    if (!termName.trim()) {
      setMessage({ type: "error", text: "Lütfen bir terim adı girin" });
      return;
    }

    setIsAnalyzing(true);
    setMessage(null);
    setAnalysisResult(null);

    try {
      const result = await geminiService.createTermFromName(termName.trim());

      if (result) {
        setAnalysisResult(result);
        setMessage({ type: "success", text: "Terim başarıyla analiz edildi!" });
      } else {
        setMessage({
          type: "error",
          text: "Terim analiz edilemedi. Lütfen tekrar deneyin.",
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setMessage({
        type: "error",
        text: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToFirebase = async () => {
    if (!analysisResult) {
      setMessage({ type: "error", text: "Önce bir terim analiz edin" });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const termId = await firebaseService.addTerm(analysisResult);

      if (termId) {
        setMessage({
          type: "success",
          text: `Terim Firebase'e kaydedildi! ID: ${termId}`,
        });
        setTermName("");
        setAnalysisResult(null);
      } else {
        setMessage({
          type: "error",
          text: "Terim kaydedilemedi. Lütfen tekrar deneyin.",
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      setMessage({
        type: "error",
        text: "Kaydetme hatası. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getCategoryColor = (category: TermCategory) => {
    const categoryColors: Record<string, string> = {
      [TermCategory.DRUG]: "#EF4444",
      [TermCategory.PLANT]: "#22C55E",
      [TermCategory.INSECT]: "#F59E0B",
      [TermCategory.COMPONENT]: "#8B5CF6",
      [TermCategory.DISEASE]: "#EC4899",
      [TermCategory.ANATOMY]: "#06B6D4",
      [TermCategory.VITAMIN]: "#F97316",
    };
    return categoryColors[category] || colors.primary;
  };

  const styles = createStyles(colors, isDark);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={isDark ? ["#0A0E14", "#0F1419"] : ["#FAFBFC", "#F3F4F6"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* AI Analysis Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>AI ile Terim Ekle</Text>
          </View>

          <Text style={styles.description}>
            Terim adını girin, Gemini AI otomatik olarak kategorize edecek ve
            detayları dolduracak.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={termName}
              onChangeText={setTermName}
              placeholder="Terim adı (örn: Aspirin, Papatya, Vitamin C)"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <TouchableOpacity
            style={[styles.analyzeButton, isAnalyzing && styles.buttonDisabled]}
            onPress={handleAnalyze}
            disabled={isAnalyzing}
          >
            <LinearGradient
              colors={colors.gradientPrimary as [string, string]}
              style={styles.buttonGradient}
            >
              {isAnalyzing ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="search" size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>AI ile Analiz Et</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Message */}
        {message && (
          <View
            style={[
              styles.messageContainer,
              message.type === "error"
                ? styles.errorMessage
                : styles.successMessage,
            ]}
          >
            <Ionicons
              name={
                message.type === "error" ? "alert-circle" : "checkmark-circle"
              }
              size={20}
              color={message.type === "error" ? colors.error : colors.success}
            />
            <Text
              style={[
                styles.messageText,
                {
                  color:
                    message.type === "error" ? colors.error : colors.success,
                },
              ]}
            >
              {message.text}
            </Text>
          </View>
        )}

        {/* Analysis Result */}
        {analysisResult && (
          <View style={styles.resultSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Analiz Sonucu</Text>
            </View>

            <View style={styles.resultCard}>
              {/* Category Badge */}
              <View
                style={[
                  styles.categoryBadge,
                  {
                    backgroundColor: getCategoryColor(analysisResult.category),
                  },
                ]}
              >
                <Text style={styles.categoryText}>
                  {analysisResult.category}
                </Text>
              </View>

              {/* Term Names */}
              <Text style={styles.resultLabel}>Latince Ad:</Text>
              <Text style={styles.resultValue}>{analysisResult.latinName}</Text>

              <Text style={styles.resultLabel}>Türkçe Ad:</Text>
              <Text style={styles.resultValue}>
                {analysisResult.turkishName}
              </Text>

              {/* Definition */}
              <Text style={styles.resultLabel}>Tanım:</Text>
              <Text style={styles.resultValue}>
                {analysisResult.definition}
              </Text>

              {/* Etymology */}
              {analysisResult.etymology && (
                <>
                  <Text style={styles.resultLabel}>Etimoloji:</Text>
                  <Text style={styles.resultValue}>
                    {analysisResult.etymology}
                  </Text>
                </>
              )}

              {/* Usage */}
              {analysisResult.usage && (
                <>
                  <Text style={styles.resultLabel}>Kullanım:</Text>
                  <Text style={styles.resultValue}>{analysisResult.usage}</Text>
                </>
              )}

              {/* Components */}
              {analysisResult.components?.length > 0 && (
                <>
                  <Text style={styles.resultLabel}>Bileşenler:</Text>
                  <View style={styles.tagContainer}>
                    {analysisResult.components.map(
                      (comp: string, index: number) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{comp}</Text>
                        </View>
                      )
                    )}
                  </View>
                </>
              )}

              {/* Side Effects */}
              {analysisResult.sideEffects?.length > 0 && (
                <>
                  <Text style={styles.resultLabel}>Yan Etkiler:</Text>
                  <View style={styles.tagContainer}>
                    {analysisResult.sideEffects.map(
                      (effect: string, index: number) => (
                        <View
                          key={index}
                          style={[styles.tag, styles.warningTag]}
                        >
                          <Text style={styles.tagText}>{effect}</Text>
                        </View>
                      )
                    )}
                  </View>
                </>
              )}

              {/* Related Terms */}
              {analysisResult.relatedTerms?.length > 0 && (
                <>
                  <Text style={styles.resultLabel}>İlişkili Terimler:</Text>
                  <View style={styles.tagContainer}>
                    {analysisResult.relatedTerms.map(
                      (term: string, index: number) => (
                        <View
                          key={index}
                          style={[styles.tag, styles.relatedTag]}
                        >
                          <Text style={styles.tagText}>{term}</Text>
                        </View>
                      )
                    )}
                  </View>
                </>
              )}
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveButton, isSaving && styles.buttonDisabled]}
              onPress={handleSaveToFirebase}
              disabled={isSaving}
            >
              <LinearGradient
                colors={["#22C55E", "#16A34A"]}
                style={styles.buttonGradient}
              >
                {isSaving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="cloud-upload" size={20} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Firebase'e Kaydet</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

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
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.text,
    },
    description: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
      lineHeight: 20,
    },
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    analyzeButton: {
      borderRadius: 12,
      overflow: "hidden",
    },
    saveButton: {
      borderRadius: 12,
      overflow: "hidden",
      marginTop: 16,
    },
    buttonGradient: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      gap: 8,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#FFFFFF",
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    messageContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 12,
      marginBottom: 16,
      gap: 8,
    },
    errorMessage: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
    },
    successMessage: {
      backgroundColor: "rgba(34, 197, 94, 0.1)",
    },
    messageText: {
      fontSize: 14,
      fontWeight: "500",
      flex: 1,
    },
    resultSection: {
      marginBottom: 24,
    },
    resultCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryBadge: {
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      marginBottom: 16,
    },
    categoryText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#FFFFFF",
    },
    resultLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.textTertiary,
      marginTop: 12,
      marginBottom: 4,
    },
    resultValue: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 22,
    },
    tagContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 4,
    },
    tag: {
      backgroundColor: colors.primaryGlow,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
    },
    warningTag: {
      backgroundColor: "rgba(245, 158, 11, 0.15)",
    },
    relatedTag: {
      backgroundColor: "rgba(139, 92, 246, 0.15)",
    },
    tagText: {
      fontSize: 12,
      fontWeight: "500",
      color: colors.text,
    },
  });

export default AdminView;
