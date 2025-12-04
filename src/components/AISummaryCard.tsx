// AISummaryCard.tsx - AI Summary Card Component
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AISummaryCardProps {
  summary: string;
  sources?: string[];
  onShare?: () => void;
  onCopy?: () => void;
}

const AISummaryCard: React.FC<AISummaryCardProps> = ({
  summary,
  sources = [],
  onShare,
  onCopy,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['#F5F3FF', '#EEF2FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✨ AI Özeti</Text>
          </View>
          <View style={styles.actions}>
            {onCopy && (
              <TouchableOpacity
                onPress={onCopy}
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <Ionicons name="copy-outline" size={18} color="#6B7280" />
              </TouchableOpacity>
            )}
            {onShare && (
              <TouchableOpacity
                onPress={onShare}
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <Ionicons name="share-outline" size={18} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Content */}
        <Text style={styles.content}>{summary}</Text>

        {/* Sources */}
        {sources.length > 0 && (
          <View style={styles.sourcesContainer}>
            <Text style={styles.sourcesLabel}>Kaynaklar:</Text>
            <View style={styles.sourcesList}>
              {sources.map((source, index) => (
                <View key={index} style={styles.sourceIcon}>
                  <Ionicons
                    name={
                      source.toLowerCase().includes('wikipedia')
                        ? 'library-outline'
                        : source.toLowerCase().includes('fda')
                        ? 'shield-checkmark-outline'
                        : 'document-text-outline'
                    }
                    size={16}
                    color="#6366F1"
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  gradient: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366F1',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  content: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 16,
  },
  sourcesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E7FF',
  },
  sourcesLabel: {
    fontSize: 12,
    color: '#64748B',
    marginRight: 8,
    fontWeight: '500',
  },
  sourcesList: {
    flexDirection: 'row',
    gap: 8,
  },
  sourceIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
});

export default AISummaryCard;

