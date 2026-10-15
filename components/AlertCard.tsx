import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { FadeIn, ScalePress } from './Animated';

interface AlertCardProps {
  severity: string;
  time: string;
  title: string;
  description: string;
  onPress?: () => void;
}

export default function AlertCard({ severity, time, title, description, onPress }: AlertCardProps) {
  const severityColor = getSeverityColor(severity);

  return (
    <FadeIn>
      <ScalePress
        style={[styles.container, { borderLeftColor: severityColor }]}
        onPress={onPress}
      >
        <View style={styles.header}>
          <View style={[styles.severityBadge, { backgroundColor: severityColor + '18' }]}>
            <Ionicons name="warning" size={12} color={severityColor} />
            <Text style={[styles.severityText, { color: severityColor }]}>
              {severity.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.viewDetails}>View Details</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
        </View>
      </ScalePress>
    </FadeIn>
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
      return Colors.primary;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.cardPadding,
    borderLeftWidth: 4,
    marginHorizontal: Spacing.screenHorizontal,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Spacing.badgeRadius,
  },
  severityText: {
    ...Typography.label,
    fontSize: 10,
  },
  time: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  title: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewDetails: {
    ...Typography.captionBold,
    color: Colors.primary,
  },
});
