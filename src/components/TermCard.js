// TermCard.js - Reusable term card component
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TermCard = ({ term, onPress }) => {
  const componentCount = term.components?.length || 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 shadow-sm"
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-2">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            {term.latinName}
          </Text>
          <Text className="text-sm text-gray-600 mb-2">
            {term.turkishName}
          </Text>
          <Text 
            className="text-sm text-gray-500" 
            numberOfLines={2}
          >
            {term.definition}
          </Text>
        </View>
        {componentCount > 0 && (
          <View className="bg-blue-50 px-2 py-1 rounded-lg">
            <Text className="text-xs font-semibold text-blue-600">
              {componentCount} {componentCount === 1 ? 'bileşen' : 'bileşen'}
            </Text>
          </View>
        )}
      </View>
      
      {term.components && term.components.length > 0 && (
        <View className="flex-row flex-wrap mt-2">
          {term.components.slice(0, 3).map((component, index) => (
            <View
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-1"
            >
              <Text className="text-xs text-gray-700">{component}</Text>
            </View>
          ))}
          {term.components.length > 3 && (
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <Text className="text-xs text-gray-700">
                +{term.components.length - 3}
              </Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TermCard;

