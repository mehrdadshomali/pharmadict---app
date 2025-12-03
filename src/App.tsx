// Pharmadict - Expo Go için React Native
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { PharmacyProvider } from './context/PharmacyContext';
import HomeView from './pages/HomeView';
import SearchView from './pages/SearchView';
import CategoriesView from './pages/CategoriesView';
import BookmarksView from './pages/BookmarksView';
import TermDetailView from './pages/TermDetailView';
import CategoryDetailView from './pages/CategoryDetailView';
import TermDetailScreen from './pages/TermDetailScreen';
import CategoryDetailScreen from './pages/CategoryDetailScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Categories') {
            iconName = 'grid-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = 'heart-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={focused ? 24 : 22} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#e5e7eb',
          height: 58,
          paddingBottom: 16,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeView} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="Search" component={SearchView} options={{ title: 'Arama' }} />
      <Tab.Screen name="Categories" component={CategoriesView} options={{ title: 'Kategoriler' }} />
      <Tab.Screen name="Bookmarks" component={BookmarksView} options={{ title: 'Favoriler' }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <PharmacyProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen 
            name="TermDetail" 
            component={TermDetailScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="CategoryDetail" 
            component={CategoryDetailScreen} 
            options={{ headerShown: false }} 
          />
          {/* Legacy screens - kept for backward compatibility */}
          <Stack.Screen 
            name="TermDetailLegacy" 
            component={TermDetailView} 
            options={{ title: 'Terim Detayı' }} 
          />
          <Stack.Screen 
            name="CategoryDetailLegacy" 
            component={CategoryDetailView} 
            options={{ title: 'Kategori Detayı' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PharmacyProvider>
  );
}

export default App;
