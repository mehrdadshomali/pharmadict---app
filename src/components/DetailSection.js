// DetailSection.js - Reusable detail section component
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DetailSection = ({ 
  title, 
  content, 
  items, 
  theme = 'blue',
  icon 
}) => {
  const themeColors = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      text: 'text-blue-900',
      border: 'border-blue-200'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      text: 'text-purple-900',
      border: 'border-purple-200'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      text: 'text-green-900',
      border: 'border-green-200'
    },
    red: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      text: 'text-red-900',
      border: 'border-red-200'
    },
    yellow: {
      bg: 'bg-yellow-50',
      icon: 'text-yellow-600',
      text: 'text-yellow-900',
      border: 'border-yellow-200'
    }
  };

  const colors = themeColors[theme] || themeColors.blue;
  const defaultIcon = icon || 'information-circle';

  return (
    <View className={`${colors.bg} rounded-2xl p-4 mb-4 border ${colors.border}`}>
      <View className="flex-row items-center mb-3">
        <Ionicons name={defaultIcon} size={20} className={colors.icon} />
        <Text className={`text-base font-bold ml-2 ${colors.text}`}>
          {title}
        </Text>
      </View>
      
      {content && (
        <Text className={`text-sm leading-5 ${colors.text} opacity-90`}>
          {content}
        </Text>
      )}
      
      {items && items.length > 0 && (
        <View className="mt-3">
          {items.map((item, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <View className={`w-1.5 h-1.5 rounded-full ${colors.icon} mt-2 mr-2`} />
              <Text className={`flex-1 text-sm ${colors.text} opacity-90`}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default DetailSection;

