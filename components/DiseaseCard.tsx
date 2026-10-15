import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { ScalePress } from './Animated';

interface DiseaseCardProps {
  name: string;
  category: string;
  demoCaseCount: number;
  severity: string;
  trend: string;
  onPress?: () => void;
}

export default function DiseaseCard({
  name,
  category,
  demoCaseCount,
  severity,
  trend,
  onPress,
}: DiseaseCardProps) {
  const severityColor = getSeverityColor(severity);
  const trendIcon =
    trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'remove-outline';
  const trendColor =
    trend === 'up' ? Colors.critical : trend === 'down' ? Colors.success : Colors.textMuted;

  return (
    <ScalePress style={styles.container} onPress={onPress} scaleTo={0.99}>
      <View style={styles.leftSection}>
        <View style={[styles.severityDot, { backgroundColor: severityColor }]} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.category}>{category}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.caseCount}>{demoCaseCount.toLocaleString()}</Text>
        <Text style={styles.caseLabel}>demo cases</Text>
      </View>
      <Ionicons name={trendIcon as any} size={18} color={trendColor} />
      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
    </ScalePress>
  );
}

function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return Colors.critical;
    case 'high':
      return '#E05D44';
    case 'moderate':
      return Colors.warning;
    case 'low':
      return Colors.success;
    default:
      return Colors.textMuted;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingVertical: 14,
    paddingHorizontal: Spacing.cardPadding,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
    gap: Spacing.sm,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  info: {
    flex: 1,
  },
  name: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
  },
  category: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  rightSection: {
    alignItems: 'flex-end',
    marginRight: 4,
  },
  caseCount: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
  },
  caseLabel: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textMuted,
  },
});
