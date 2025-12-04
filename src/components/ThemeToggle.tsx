// ThemeToggle.tsx - Theme Toggle Button Component
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.toggleButton, { backgroundColor: colors.surface }]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Ionicons
        name={theme === 'light' ? 'moon' : 'sunny'}
        size={22}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});

export default ThemeToggle;
