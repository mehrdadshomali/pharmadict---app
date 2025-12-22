// Pharmadict - Premium UI App
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { PharmacyProvider } from "./context/PharmacyContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import HomeView from "./pages/HomeView";
import SearchView from "./pages/SearchView";
import CategoriesView from "./pages/CategoriesView";
import BookmarksView from "./pages/BookmarksView";
import TermDetailView from "./pages/TermDetailView";
import CategoryDetailView from "./pages/CategoryDetailView";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help-outline";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Categories") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Bookmarks") {
            iconName = focused ? "heart" : "heart-outline";
          }
          return (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <Ionicons
                name={iconName}
                size={focused ? 22 : 24}
                color={color}
              />
            </View>
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 88,
          paddingBottom: 28,
          paddingTop: 12,
          elevation: 0,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{ title: "Ana Sayfa" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchView}
        options={{ title: "Arama" }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesView}
        options={{ title: "Kategoriler" }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksView}
        options={{ title: "Favoriler" }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { colors, isDark } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermDetail"
          component={TermDetailView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryDetail"
          component={CategoryDetailView}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PharmacyProvider>
        <AppContent />
      </PharmacyProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  activeIconContainer: {
    backgroundColor: "rgba(20, 184, 166, 0.12)",
    borderRadius: 12,
    padding: 8,
    marginBottom: -4,
  },
});

export default App;
