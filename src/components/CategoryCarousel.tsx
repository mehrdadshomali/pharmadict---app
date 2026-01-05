// CategoryCarousel.tsx - Premium Horizontal Category Cards
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import { TermCategory } from "../types/models";

const CARD_WIDTH = 140;
const CARD_MARGIN = 12;

interface CategoryItem {
  id: string;
  category: TermCategory;
  name: string;
  icon: string;
  gradient: string[];
  count: number;
}

const categories: CategoryItem[] = [
  {
    id: "1",
    category: TermCategory.DRUG,
    name: "İlaçlar",
    icon: "medical",
    gradient: ["#3B82F6", "#1D4ED8"],
    count: 120,
  },
  {
    id: "2",
    category: TermCategory.PLANT,
    name: "Bitkiler",
    icon: "leaf",
    gradient: ["#10B981", "#059669"],
    count: 95,
  },
  {
    id: "3",
    category: TermCategory.VITAMIN,
    name: "Vitaminler",
    icon: "flask",
    gradient: ["#F59E0B", "#D97706"],
    count: 88,
  },
  {
    id: "4",
    category: TermCategory.MINERAL,
    name: "Mineraller",
    icon: "diamond",
    gradient: ["#8B5CF6", "#7C3AED"],
    count: 75,
  },
  {
    id: "5",
    category: TermCategory.INSECT,
    name: "Böcekler",
    icon: "bug",
    gradient: ["#F97316", "#EA580C"],
    count: 100,
  },
  {
    id: "6",
    category: TermCategory.ANATOMY,
    name: "Anatomi",
    icon: "body",
    gradient: ["#6366F1", "#4F46E5"],
    count: 60,
  },
];

const CategoryCarousel: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();

  const handleCategoryPress = (category: TermCategory) => {
    navigation.navigate("CategoryDetail" as never, { category } as never);
  };

  const renderCategoryCard = ({ item }: { item: CategoryItem }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleCategoryPress(item.category)}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={item.gradient as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {/* Decorative Circle */}
          <View style={styles.decorativeCircle} />

          {/* Count Badge */}
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{item.count}</Text>
          </View>

          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Ionicons
              name={item.icon as any}
              size={32}
              color="rgba(255,255,255,0.95)"
            />
          </View>

          {/* Name */}
          <Text style={styles.categoryName}>{item.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryCard}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + CARD_MARGIN}
      decelerationRate="fast"
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingRight: 8,
  },
  cardContainer: {
    marginRight: CARD_MARGIN,
  },
  card: {
    width: CARD_WIDTH,
    height: 150,
    borderRadius: 20,
    padding: 16,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  decorativeCircle: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    top: -30,
    right: -30,
  },
  countBadge: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  iconWrapper: {
    marginTop: "auto",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
});

export default CategoryCarousel;
