// BentoCard.tsx - Premium Bento Grid Card
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

interface BentoCardProps {
  title: string;
  icon: string;
  count: number;
  size: "large" | "small";
  tags?: string[];
  description?: string;
  bgColor: string;
  iconBgColor: string;
  iconColor: string;
  textColor: string;
  onPress: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  icon,
  count,
  size,
  tags = [],
  description,
  bgColor,
  iconBgColor,
  iconColor,
  textColor,
  onPress,
}) => {
  const { colors, isDark } = useTheme();

  // Use gradient based on icon color
  const getGradient = () => {
    const gradients: { [key: string]: string[] } = {
      "#3B82F6": ["#3B82F6", "#1D4ED8"],
      "#10B981": ["#10B981", "#059669"],
      "#F59E0B": ["#F59E0B", "#D97706"],
      "#A855F7": ["#8B5CF6", "#7C3AED"],
      "#D97706": ["#F97316", "#EA580C"],
      "#EF4444": ["#EF4444", "#DC2626"],
      "#EC4899": ["#EC4899", "#DB2777"],
      "#6366F1": ["#6366F1", "#4F46E5"],
    };
    return gradients[iconColor] || ["#3B82F6", "#1D4ED8"];
  };

  if (size === "large") {
    return (
      <TouchableOpacity
        style={styles.largeContainer}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={getGradient() as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.largeCard}
        >
          {/* Decorative Elements */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />

          {/* Count Badge */}
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{count}</Text>
          </View>

          {/* Content */}
          <View style={styles.largeContent}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={icon as any}
                size={40}
                color="rgba(255,255,255,0.95)"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.largeTitle}>{title}</Text>
              {description && (
                <Text style={styles.description}>{description}</Text>
              )}
              {tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {tags.slice(0, 3).map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Arrow */}
          <View style={styles.arrowContainer}>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="rgba(255,255,255,0.7)"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Small Card
  return (
    <TouchableOpacity
      style={styles.smallContainer}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={getGradient() as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.smallCard}
      >
        {/* Decorative Circle */}
        <View style={styles.smallDecorativeCircle} />

        {/* Count Badge */}
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>

        {/* Content */}
        <View style={styles.smallContent}>
          <View style={styles.smallIconContainer}>
            <Ionicons
              name={icon as any}
              size={28}
              color="rgba(255,255,255,0.95)"
            />
          </View>
          <Text style={styles.smallTitle}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  largeContainer: {
    width: "100%",
    marginBottom: 12,
  },
  largeCard: {
    borderRadius: 24,
    padding: 20,
    minHeight: 140,
    position: "relative",
    overflow: "hidden",
  },
  smallContainer: {
    width: "48%",
    marginBottom: 12,
  },
  smallCard: {
    borderRadius: 20,
    padding: 16,
    height: 140,
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
  smallDecorativeCircle: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    top: -30,
    right: -30,
  },
  countBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 1,
  },
  countText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  largeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  largeTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 12,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  arrowContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  smallContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  smallIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  smallTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
});

export default BentoCard;
