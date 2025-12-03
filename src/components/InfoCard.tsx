// InfoCard.tsx - Reusable info card component with StyleSheet
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InfoCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  theme: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'yellow';
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, theme, children }) => {
  const themeColors = {
    blue: {
      backgroundColor: '#EFF6FF',
      borderColor: '#DBEAFE',
      iconColor: '#2563EB',
    },
    purple: {
      backgroundColor: '#F5F3FF',
      borderColor: '#EDE9FE',
      iconColor: '#7C3AED',
    },
    green: {
      backgroundColor: '#F0FDF4',
      borderColor: '#DCFCE7',
      iconColor: '#059669',
    },
    red: {
      backgroundColor: '#FEF2F2',
      borderColor: '#FEE2E2',
      iconColor: '#DC2626',
    },
    orange: {
      backgroundColor: '#FFF7ED',
      borderColor: '#FFEDD5',
      iconColor: '#EA580C',
    },
    yellow: {
      backgroundColor: '#FEFCE8',
      borderColor: '#FEF9C3',
      iconColor: '#EAB308',
    },
  };

  const colors = themeColors[theme] || themeColors.blue;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
        },
      ]}
    >
      <View style={styles.header}>
        <Ionicons name={icon} size={20} color={colors.iconColor} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    color: '#1F2937',
  },
  content: {
    marginTop: 4,
  },
});

export default InfoCard;

