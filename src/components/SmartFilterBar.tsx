// SmartFilterBar.tsx - Smart Filter Bar Component
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface FilterOption {
  id: string;
  label: string;
  icon: string;
  count?: number;
}

interface SmartFilterBarProps {
  filters: FilterOption[];
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
}

const SmartFilterBar: React.FC<SmartFilterBarProps> = ({
  filters,
  activeFilters,
  onFilterToggle,
}) => {
  if (filters.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.chip,
              isActive && styles.chipActive,
            ]}
            onPress={() => onFilterToggle(filter.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={filter.icon as any}
              size={16}
              color={isActive ? '#FFFFFF' : '#64748B'}
              style={styles.icon}
            />
            <Text
              style={[
                styles.chipText,
                isActive && styles.chipTextActive,
              ]}
            >
              {filter.label}
            </Text>
            {filter.count !== undefined && (
              <View
                style={[
                  styles.countBadge,
                  isActive && styles.countBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    isActive && styles.countTextActive,
                  ]}
                >
                  {filter.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#1E293B',
    borderColor: '#1E293B',
  },
  icon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  countBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  countTextActive: {
    color: '#FFFFFF',
  },
});

export default SmartFilterBar;

