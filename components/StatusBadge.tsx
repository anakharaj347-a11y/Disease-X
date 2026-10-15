import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';

interface StatusBadgeProps {
  status: string;
  variant?: 'filled' | 'outline';
}

export default function StatusBadge({ status, variant = 'filled' }: StatusBadgeProps) {
  const color = getStatusColor(status);
  const isOutline = variant === 'outline';

  return (
    <View style={[
      styles.container,
      { backgroundColor: isOutline ? 'transparent' : color + '15' },
      isOutline && { borderWidth: 1, borderColor: color },
    ]}>
      <Text style={[styles.text, { color }]}>{status}</Text>
    </View>
  );
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'verified': return Colors.success;
    case 'active': return Colors.primaryBlue;
    case 'pending': return Colors.warning;
    case 'under review': return Colors.warning;
    case 'unverified': return Colors.textMuted;
    case 'resolved': return '#6B7280';
    case 'expired': return Colors.textMuted;
    case 'failed': return Colors.critical;
    case 'operational': return Colors.success;
    case 'degraded': return Colors.warning;
    case 'down': return Colors.critical;
    case 'maintenance': return Colors.primaryBlue;
    default: return Colors.textSecondary;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Spacing.badgeRadius,
    alignSelf: 'flex-start',
  },
  text: {
    ...Typography.captionBold,
    fontSize: 11,
  },
});
