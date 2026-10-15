import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { FadeIn, ScalePress } from './Animated';

interface StatCardProps {
  title: string;
  value: string | number;
  badge?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  onPress?: () => void;
  index?: number;
}

export default function StatCard({
  title,
  value,
  badge,
  icon,
  iconColor = Colors.primary,
  onPress,
  index = 0,
}: StatCardProps) {
  return (
    <FadeIn index={index} style={styles.flex}>
      <ScalePress style={styles.container} onPress={onPress}>
        <View style={styles.header}>
          {icon && (
            <View style={[styles.iconContainer, { backgroundColor: iconColor + '18' }]}>
              <Ionicons name={icon} size={18} color={iconColor} />
            </View>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
      </ScalePress>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.cardPadding,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.caption,
    color: Colors.textSecondary,
    flex: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  value: {
    ...Typography.metric,
    fontSize: 28,
    lineHeight: 34,
    color: Colors.textPrimary,
  },
  badge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Spacing.badgeRadius,
  },
  badgeText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '600',
  },
});
