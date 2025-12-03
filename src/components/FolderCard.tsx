// FolderCard.tsx - Folder Card Component
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FolderCardProps {
  folder: {
    id: string;
    name: string;
    color: string;
    termIds: string[];
    createdAt: string;
    updatedAt: string;
  };
  onPress: () => void;
  onLongPress?: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ folder, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: folder.color }]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${folder.color}15` }]}>
          <Ionicons name="folder" size={32} color={folder.color} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.folderName}>{folder.name}</Text>
          <Text style={styles.termCount}>
            {folder.termIds.length} {folder.termIds.length === 1 ? 'terim' : 'terim'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  folderName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  termCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default FolderCard;

