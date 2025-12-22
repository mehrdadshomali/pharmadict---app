// SmartFilterBar.tsx - Premium Smart Filter Bar
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

export interface FilterOption {
  id: string;
  label: string;
  icon: string;
  count?: number;
}

interface SmartFilterBarProps {
  filters: FilterOption[];
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
}

const SmartFilterBar: React.FC<SmartFilterBarProps> = ({
  filters,
  activeFilters,
  onFilterToggle,
}) => {
  const { colors, isDark } = useTheme();

  if (filters.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <TouchableOpacity
            key={filter.id}
            onPress={() => onFilterToggle(filter.id)}
            activeOpacity={0.8}
          >
            {isActive ? (
              <LinearGradient
                colors={colors.gradientPrimary as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.chip}
              >
                <Ionicons name={filter.icon as any} size={16} color="#FFFFFF" />
                <Text style={styles.chipTextActive}>{filter.label}</Text>
                {filter.count !== undefined && (
                  <View style={styles.countBadgeActive}>
                    <Text style={styles.countTextActive}>{filter.count}</Text>
                  </View>
                )}
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.chip,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name={filter.icon as any}
                  size={16}
                  color={colors.textSecondary}
                />
                <Text
                  style={[styles.chipText, { color: colors.textSecondary }]}
                >
                  {filter.label}
                </Text>
                {filter.count !== undefined && (
                  <View
                    style={[
                      styles.countBadge,
                      { backgroundColor: colors.backgroundSecondary },
                    ]}
                  >
                    <Text
                      style={[styles.countText, { color: colors.textTertiary }]}
                    >
                      {filter.count}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { marginBottom: 16 },
  container: { paddingHorizontal: 20, gap: 10 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
    gap: 8,
  },
  chipText: { fontSize: 14, fontWeight: "600" },
  chipTextActive: { fontSize: 14, fontWeight: "600", color: "#FFFFFF" },
  countBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  countBadgeActive: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  countText: { fontSize: 11, fontWeight: "700" },
  countTextActive: { fontSize: 11, fontWeight: "700", color: "#FFFFFF" },
});

export default SmartFilterBar;
