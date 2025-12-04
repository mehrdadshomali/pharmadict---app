// BentoCard.tsx - Bento Grid Card Component
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BentoCardProps {
  title: string;
  icon: string;
  count: number;
  size: 'large' | 'small';
  tags?: string[];
  description?: string;
  bgColor: string;
  iconBgColor: string;
  iconColor: string;
  textColor: string;
  onPress: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  icon,
  count,
  size,
  tags = [],
  description,
  bgColor,
  iconBgColor,
  iconColor,
  textColor,
  onPress,
}) => {
  if (size === 'large') {
    return (
      <TouchableOpacity
        style={[styles.largeCard, { backgroundColor: bgColor }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Badge */}
        <View style={[styles.badge, { backgroundColor: iconColor }]}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>

        {/* Content Row */}
        <View style={styles.largeContent}>
          {/* Left: Icon */}
          <View style={[styles.largeIconContainer, { backgroundColor: iconBgColor }]}>
            <Ionicons name={icon as any} size={48} color={iconColor} />
          </View>

          {/* Right: Text Content */}
          <View style={styles.largeTextContainer}>
            <Text style={[styles.largeTitle, { color: textColor }]}>{title}</Text>
            {description && (
              <Text style={styles.largeDescription} numberOfLines={2}>
                {description}
              </Text>
            )}
            {tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Small Card
  return (
    <TouchableOpacity
      style={[styles.smallCard, { backgroundColor: bgColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Badge */}
      <View style={[styles.badge, { backgroundColor: iconColor }]}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>

      {/* Content Column */}
      <View style={styles.smallContent}>
        {/* Icon */}
        <View style={[styles.smallIconContainer, { backgroundColor: iconBgColor }]}>
          <Ionicons name={icon as any} size={32} color={iconColor} />
        </View>

        {/* Title */}
        <Text style={[styles.smallTitle, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  largeCard: {
    width: '100%',
    borderRadius: 32,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    position: 'relative',
  },
  smallCard: {
    width: '48%',
    height: 160,
    borderRadius: 32,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  largeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  largeIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeTextContainer: {
    flex: 1,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  largeDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  smallContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  smallIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  smallTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default BentoCard;
