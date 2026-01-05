/**
 * ============================================================================
 * PHARMADICT - ANA UYGULAMA DOSYASI (App.tsx)
 * ============================================================================
 * 
 * Bu dosya uygulamanın ana giriş noktasıdır. Tüm uygulama buradan başlar.
 * 
 * TEMEL GÖREVLER:
 * 1. Splash Screen (Açılış Ekranı) - Uygulama açılırken gösterilen animasyonlu logo
 * 2. Navigation (Sayfa Yönlendirme) - Sayfalar arası geçişi yönetir
 * 3. Tab Bar (Alt Menü) - Ana Sayfa, Arama, Kategoriler, Favoriler sekmeleri
 * 4. Theme & Context Provider - Tema ve veri yönetimi sağlayıcıları
 * 
 * KULLANILAN TEKNOLOJİLER:
 * - React Native: Mobil uygulama geliştirme framework'ü
 * - Expo: React Native için geliştirme araçları
 * - React Navigation: Sayfa yönlendirme kütüphanesi
 * - Linear Gradient: Renk geçişli arka planlar
 * - Animated API: Animasyonlar için React Native API'si
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native"; // Sayfa yönlendirme container'ı
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Stack navigasyon (sayfa üstüne sayfa)
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Alt tab menüsü
import { StatusBar } from "expo-status-bar"; // Üst durum çubuğu
import { View, StyleSheet, Animated, Image } from "react-native"; // Temel React Native bileşenleri
import { Ionicons } from "@expo/vector-icons"; // İkon kütüphanesi
import { LinearGradient } from "expo-linear-gradient"; // Renk geçişli arka plan
import { PharmacyProvider } from "./context/PharmacyContext"; // Eczacılık verileri için context
import { ThemeProvider, useTheme } from "./context/ThemeContext"; // Tema yönetimi (açık/koyu mod)
import HomeView from "./pages/HomeView"; // Ana sayfa
import SearchView from "./pages/SearchView"; // Arama sayfası
import CategoriesView from "./pages/CategoriesView"; // Kategoriler sayfası
import BookmarksView from "./pages/BookmarksView"; // Favoriler sayfası
import TermDetailView from "./pages/TermDetailView"; // Terim detay sayfası
import CategoryDetailView from "./pages/CategoryDetailView"; // Kategori detay sayfası
import AdminView from "./pages/AdminView"; // Admin paneli (terim ekleme)

// Navigator'ları oluştur - React Navigation için gerekli
const Tab = createBottomTabNavigator(); // Alt menü için tab navigator
const Stack = createNativeStackNavigator(); // Sayfa geçişleri için stack navigator

/**
 * SPLASH SCREEN (AÇILIŞ EKRANI)
 * --------------------------------
 * Uygulama açıldığında gösterilen animasyonlu ekran.
 * Logo ve "Merhaba" yazısı animasyonlu şekilde görünür.
 * 2.5 saniye sonra otomatik olarak ana sayfaya geçer.
 */
function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const helloOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo fade in and scale
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Title fade in
    setTimeout(() => {
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 300);

    // Hello text fade in
    setTimeout(() => {
      Animated.timing(helloOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 600);

    // Finish splash after 2.5 seconds
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(helloOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => onFinish());
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={splashStyles.container}>
      <LinearGradient
        colors={["#1a4a5e", "#2d6a7a", "#4a8a9a", "#7ab0b8", "#c4a574"]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Top section with logo */}
      <View style={splashStyles.topSection}>
        <Animated.View
          style={[
            splashStyles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image
            source={require("../assets/icon.png")}
            style={splashStyles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.Text
          style={[splashStyles.brandName, { opacity: titleOpacity }]}
        >
          PHARMADICT
        </Animated.Text>
      </View>

      {/* Center hello text */}
      <View style={splashStyles.centerSection}>
        <Animated.Text
          style={[splashStyles.helloText, { opacity: helloOpacity }]}
        >
          Merhaba
        </Animated.Text>
      </View>

      {/* Bottom spacer */}
      <View style={splashStyles.bottomSection} />
    </View>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingTop: 40,
  },
  logoContainer: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 40,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  brandName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 6,
  },
  centerSection: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  helloText: {
    fontSize: 42,
    fontWeight: "300",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  bottomSection: {
    flex: 1,
  },
});

/**
 * MAIN TABS (ALT MENÜ SEKMELERİ)
 * --------------------------------
 * Uygulamanın alt kısmındaki 4 ana sekmeyi oluşturur:
 * 1. Ana Sayfa (Home) - Öne çıkan terimler ve kategoriler
 * 2. Arama (Search) - Terim arama fonksiyonu
 * 3. Kategoriler (Categories) - Tüm kategorilerin listesi
 * 4. Favoriler (Bookmarks) - Kullanıcının kaydettiği terimler
 */
function MainTabs() {
  const { colors, isDark } = useTheme(); // Tema renklerini al

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

/**
 * APP CONTENT (UYGULAMA İÇERİĞİ)
 * --------------------------------
 * Ana navigasyon yapısını oluşturur.
 * Stack Navigator ile sayfa geçişlerini yönetir.
 * Main (Tab'lar), TermDetail, CategoryDetail ve Admin sayfalarını içerir.
 */
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
        <Stack.Screen
          name="Admin"
          component={AdminView}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * APP (ANA UYGULAMA BİLEŞENİ)
 * --------------------------------
 * Uygulamanın en üst seviye bileşeni.
 * 
 * ÇALIŞMA MANTIĞI:
 * 1. Uygulama açılınca showSplash = true, Splash Screen gösterilir
 * 2. Splash Screen bitince showSplash = false olur
 * 3. ThemeProvider: Tema (açık/koyu mod) yönetimini sağlar
 * 4. PharmacyProvider: Eczacılık verilerini tüm uygulamaya sağlar
 * 5. AppContent: Ana içerik ve navigasyon
 */
function App() {
  const [showSplash, setShowSplash] = useState(true); // Splash ekranı göster/gizle

  // Splash ekranı gösteriliyorsa
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Ana uygulama - Provider'lar ile sarmalanmış
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
