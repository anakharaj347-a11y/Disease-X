import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterChips from '../../components/FilterChips';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { useAlerts } from '../../hooks/useAlerts';

export default function AlertsScreen() {
  const router = useRouter();
  const { alerts, selectedSeverity, setSelectedSeverity, unreadCount } = useAlerts();
  const severities = ['All', 'Critical', 'High', 'Moderate', 'Low', 'Info'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Alerts</Text>
          <Text style={styles.headerSubtitle}>{unreadCount} unread</Text>
        </View>
      </View>
      <FilterChips options={severities} selected={selectedSeverity} onSelect={setSelectedSeverity} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {alerts.map(alert => {
          const sevColor = alert.severity === 'Critical' ? Colors.critical : alert.severity === 'High' ? '#E05D44' : alert.severity === 'Moderate' ? Colors.warning : Colors.success;
          return (
            <TouchableOpacity key={alert.id} style={[styles.alertCard, { borderLeftColor: sevColor }]} onPress={() => router.push(`/alerts/${alert.id}`)}>
              <View style={styles.alertHeader}>
                <View style={[styles.sevBadge, { backgroundColor: sevColor + '15' }]}>
                  <Text style={[styles.sevText, { color: sevColor }]}>{alert.severity.toUpperCase()}</Text>
                </View>
                {!alert.read && <View style={styles.unreadDot} />}
                <Text style={styles.alertTime}>{new Date(alert.createdAt).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDesc} numberOfLines={2}>{alert.description}</Text>
              <View style={styles.alertMeta}>
                <Text style={styles.metaText}>{alert.disease}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaText}>{alert.region}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.screenHorizontal, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: Spacing.md },
  backBtn: { padding: 4 },
  headerContent: { flex: 1 },
  headerTitle: { ...Typography.h2, color: Colors.textPrimary },
  headerSubtitle: { ...Typography.caption, color: Colors.textMuted },
  scroll: { flex: 1 },
  alertCard: { backgroundColor: Colors.card, marginHorizontal: Spacing.screenHorizontal, marginTop: Spacing.sm, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, borderLeftWidth: 4 },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  sevBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  sevText: { ...Typography.label, fontSize: 10 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primaryBlue },
  alertTime: { ...Typography.caption, color: Colors.textMuted, marginLeft: 'auto' },
  alertTitle: { ...Typography.subtitle, color: Colors.textPrimary, marginBottom: 4 },
  alertDesc: { ...Typography.bodySmall, color: Colors.textSecondary, marginBottom: 8 },
  alertMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { ...Typography.caption, color: Colors.textMuted },
  metaDot: { color: Colors.textMuted },
});
