import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';

interface OutbreakCardProps {
  name: string;
  disease: string;
  status: string;
  demoCaseCount: number;
  transmissionIndex: number;
  region: string;
  onPress?: () => void;
}

export default function OutbreakCard({ name, disease, status, demoCaseCount, transmissionIndex, region, onPress }: OutbreakCardProps) {
  const statusColor = getStatusColor(status);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.disease}>{disease}</Text>
      <Text style={styles.region}>{region}</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Cases</Text>
          <Text style={styles.statValue}>{demoCaseCount.toLocaleString()}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Tx Index</Text>
          <Text style={[styles.statValue, transmissionIndex > 1 ? { color: Colors.critical } : {}]}>
            {transmissionIndex.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'critical': return Colors.critical;
    case 'elevated': return Colors.warning;
    case 'monitoring': return Colors.primaryBlue;
    case 'contained': return Colors.success;
    case 'resolved': return '#6B7280';
    default: return Colors.textMuted;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Spacing.badgeRadius,
  },
  statusText: {
    ...Typography.label,
    fontSize: 10,
  },
  disease: {
    ...Typography.bodySmall,
    color: Colors.primaryBlue,
    marginBottom: 2,
  },
  region: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.paleBlue,
    borderRadius: Spacing.cardRadiusSm,
    padding: Spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
  },
});
