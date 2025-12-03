// InfoSection.tsx - Reusable info section component
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InfoSectionProps {
  title: string;
  content?: string | string[];
  iconName: keyof typeof Ionicons.glyphMap;
  colorTheme: 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'yellow';
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  content,
  iconName,
  colorTheme,
}) => {
  // Don't render if no content
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null;
  }

  // Color theme mapping
  const themeColors = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      icon: '#2563eb', // blue-600
      text: 'text-blue-900',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      icon: '#059669', // green-600
      text: 'text-green-900',
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      icon: '#dc2626', // red-600
      text: 'text-red-900',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      icon: '#ea580c', // orange-600
      text: 'text-orange-900',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      icon: '#9333ea', // purple-600
      text: 'text-purple-900',
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-100',
      icon: '#ca8a04', // yellow-600
      text: 'text-yellow-900',
    },
  };

  const colors = themeColors[colorTheme];

  return (
    <View className={`p-4 mb-4 rounded-2xl border ${colors.bg} ${colors.border}`}>
      {/* Başlık Satırı */}
      <View className="flex-row items-center mb-2">
        <Ionicons name={iconName} size={20} color={colors.icon} />
        <Text className={`text-base font-bold ml-2 ${colors.text}`}>
          {title}
        </Text>
      </View>

      {/* İçerik */}
      {Array.isArray(content) ? (
        <View className="mt-2">
          {content.map((item, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <View
                className="w-1.5 h-1.5 rounded-full mt-2 mr-2"
                style={{ backgroundColor: colors.icon }}
              />
              <Text className="text-gray-700 text-base leading-relaxed flex-1">
                {item}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text className="mt-2 text-gray-700 text-base leading-relaxed">
          {content}
        </Text>
      )}
    </View>
  );
};

export default InfoSection;

