// ThemeContext.tsx - Premium Dark/Light Theme System
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  // Core
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceElevated: string;
  card: string;
  cardHover: string;

  // Text
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // Borders
  border: string;
  borderLight: string;
  borderFocus: string;

  // Primary - Teal/Cyan gradient
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryGlow: string;

  // Accent - Purple/Violet
  accent: string;
  accentLight: string;

  // Status
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;

  // Inputs
  inputBackground: string;
  inputBorder: string;
  placeholder: string;

  // Effects
  shadow: string;
  shadowStrong: string;
  overlay: string;
  glassBg: string;
  glassStroke: string;

  // Gradients (as arrays for LinearGradient)
  gradientPrimary: string[];
  gradientAccent: string[];
  gradientCard: string[];
  gradientHero: string[];
}

const darkTheme: ThemeColors = {
  // Core - Deep dark with subtle blue undertone
  background: "#0A0E14",
  backgroundSecondary: "#0F1419",
  surface: "#151B23",
  surfaceElevated: "#1C242E",
  card: "#1A2332",
  cardHover: "#212D3B",

  // Text
  text: "#F0F4F8",
  textSecondary: "#8B9AAB",
  textTertiary: "#5C6B7A",
  textInverse: "#0A0E14",

  // Borders
  border: "#2A3544",
  borderLight: "#1E2836",
  borderFocus: "#14B8A6",

  // Primary - Teal
  primary: "#14B8A6",
  primaryLight: "#2DD4BF",
  primaryDark: "#0D9488",
  primaryGlow: "rgba(20, 184, 166, 0.25)",

  // Accent - Violet
  accent: "#8B5CF6",
  accentLight: "#A78BFA",

  // Status
  success: "#10B981",
  successLight: "rgba(16, 185, 129, 0.15)",
  warning: "#F59E0B",
  warningLight: "rgba(245, 158, 11, 0.15)",
  error: "#EF4444",
  errorLight: "rgba(239, 68, 68, 0.15)",
  info: "#3B82F6",
  infoLight: "rgba(59, 130, 246, 0.15)",

  // Inputs
  inputBackground: "#151B23",
  inputBorder: "#2A3544",
  placeholder: "#5C6B7A",

  // Effects
  shadow: "rgba(0, 0, 0, 0.4)",
  shadowStrong: "rgba(0, 0, 0, 0.6)",
  overlay: "rgba(10, 14, 20, 0.8)",
  glassBg: "rgba(26, 35, 50, 0.7)",
  glassStroke: "rgba(255, 255, 255, 0.08)",

  // Gradients
  gradientPrimary: ["#14B8A6", "#0D9488"],
  gradientAccent: ["#8B5CF6", "#6D28D9"],
  gradientCard: ["#1A2332", "#151B23"],
  gradientHero: ["#0D9488", "#14B8A6", "#2DD4BF"],
};

const lightTheme: ThemeColors = {
  // Core - Clean white with warm undertone
  background: "#FAFBFC",
  backgroundSecondary: "#F3F4F6",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",
  card: "#FFFFFF",
  cardHover: "#F9FAFB",

  // Text
  text: "#111827",
  textSecondary: "#4B5563",
  textTertiary: "#9CA3AF",
  textInverse: "#FFFFFF",

  // Borders
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  borderFocus: "#0D9488",

  // Primary - Teal
  primary: "#0D9488",
  primaryLight: "#14B8A6",
  primaryDark: "#0F766E",
  primaryGlow: "rgba(13, 148, 136, 0.15)",

  // Accent - Violet
  accent: "#7C3AED",
  accentLight: "#8B5CF6",

  // Status
  success: "#059669",
  successLight: "rgba(5, 150, 105, 0.1)",
  warning: "#D97706",
  warningLight: "rgba(217, 119, 6, 0.1)",
  error: "#DC2626",
  errorLight: "rgba(220, 38, 38, 0.1)",
  info: "#2563EB",
  infoLight: "rgba(37, 99, 235, 0.1)",

  // Inputs
  inputBackground: "#F9FAFB",
  inputBorder: "#E5E7EB",
  placeholder: "#9CA3AF",

  // Effects
  shadow: "rgba(0, 0, 0, 0.08)",
  shadowStrong: "rgba(0, 0, 0, 0.15)",
  overlay: "rgba(0, 0, 0, 0.5)",
  glassBg: "rgba(255, 255, 255, 0.8)",
  glassStroke: "rgba(0, 0, 0, 0.05)",

  // Gradients
  gradientPrimary: ["#0D9488", "#14B8A6"],
  gradientAccent: ["#7C3AED", "#8B5CF6"],
  gradientCard: ["#FFFFFF", "#F9FAFB"],
  gradientHero: ["#0F766E", "#0D9488", "#14B8A6"],
};

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => Promise<void>;
  setTheme: (mode: ThemeMode) => Promise<void>;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "pharmadict_theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setTheme = useCallback(async (mode: ThemeMode) => {
    try {
      setThemeState(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    await setTheme(newTheme);
  }, [theme, setTheme]);

  const colors = theme === "light" ? lightTheme : darkTheme;
  const isDark = theme === "dark";

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colors, toggleTheme, setTheme, isDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
