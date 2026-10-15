import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';

interface RiskBadgeProps {
  level: string;
  size?: 'small' | 'medium';
}

export default function RiskBadge({ level, size = 'small' }: RiskBadgeProps) {
  const color = getRiskColor(level);
  return (
    <View style={[styles.container, { backgroundColor: color + '15' }, size === 'medium' && styles.medium]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }, size === 'medium' && styles.mediumText]}>{level.toUpperCase()}</Text>
    </View>
  );
}

function getRiskColor(level: string): string {
  switch (level.toLowerCase()) {
    case 'critical': return Colors.critical;
    case 'high': return '#E05D44';
    case 'elevated': return Colors.warning;
    case 'moderate': return Colors.warning;
    case 'low': return Colors.success;
    case 'monitoring': return Colors.primaryBlue;
    default: return Colors.textMuted;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Spacing.badgeRadius,
    alignSelf: 'flex-start',
  },
  medium: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    ...Typography.label,
    fontSize: 10,
  },
  mediumText: {
    fontSize: 11,
  },
});
