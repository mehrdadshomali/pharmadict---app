// AISummaryCard.tsx - Premium AI Summary Card
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface AISummaryCardProps {
  summary: string;
  sources?: string[];
  onShare?: () => void;
  onCopy?: () => void;
}

const AISummaryCard: React.FC<AISummaryCardProps> = ({
  summary,
  sources = [],
  onShare,
  onCopy,
}) => {
  const { colors, isDark } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={isDark ? ["#1A2332", "#151B23"] : ["#F5F3FF", "#EEF2FF"]}
        style={[
          styles.card,
          { borderColor: isDark ? colors.border : "#C7D2FE" },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: isDark ? "rgba(139, 92, 246, 0.2)" : "#EDE9FE",
              },
            ]}
          >
            <Ionicons name="sparkles" size={14} color={colors.accent} />
            <Text style={[styles.badgeText, { color: colors.accent }]}>
              AI Özeti
            </Text>
          </View>
          <View style={styles.actions}>
            {onCopy && (
              <TouchableOpacity
                onPress={onCopy}
                style={[
                  styles.actionBtn,
                  { backgroundColor: colors.backgroundSecondary },
                ]}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="copy-outline"
                  size={16}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            )}
            {onShare && (
              <TouchableOpacity
                onPress={onShare}
                style={[
                  styles.actionBtn,
                  { backgroundColor: colors.backgroundSecondary },
                ]}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="share-outline"
                  size={16}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Content */}
        <Text style={[styles.content, { color: colors.textSecondary }]}>
          {summary}
        </Text>

        {/* Sources */}
        {sources.length > 0 && (
          <View
            style={[
              styles.sourcesContainer,
              { borderTopColor: isDark ? colors.border : "#E0E7FF" },
            ]}
          >
            <Text style={[styles.sourcesLabel, { color: colors.textTertiary }]}>
              Kaynaklar:
            </Text>
            <View style={styles.sourcesList}>
              {sources.map((source, index) => (
                <View
                  key={index}
                  style={[
                    styles.sourceIcon,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      source.toLowerCase().includes("wikipedia")
                        ? "library-outline"
                        : source.toLowerCase().includes("fda")
                        ? "shield-checkmark-outline"
                        : "document-text-outline"
                    }
                    size={14}
                    color={colors.accent}
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  card: { padding: 18, borderRadius: 20, borderWidth: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 6,
  },
  badgeText: { fontSize: 12, fontWeight: "700" },
  actions: { flexDirection: "row", gap: 8 },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { fontSize: 14, lineHeight: 22, marginBottom: 14 },
  sourcesContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 14,
    borderTopWidth: 1,
  },
  sourcesLabel: { fontSize: 12, fontWeight: "500", marginRight: 10 },
  sourcesList: { flexDirection: "row", gap: 8 },
  sourceIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});

export default AISummaryCard;
