import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBadge from '../../components/StatusBadge';
import PrimaryButton from '../../components/PrimaryButton';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { getAlertById } from '../../data/alerts';

export default function AlertDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const alert = getAlertById(id);

  if (!alert) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Alert not found</Text>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.backLink}>Go back</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  const sevColor = alert.severity === 'Critical' ? Colors.critical : alert.severity === 'High' ? '#E05D44' : alert.severity === 'Moderate' ? Colors.warning : Colors.success;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alert Details</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.sevBar, { backgroundColor: sevColor }]}>
          <Ionicons name="warning" size={16} color={Colors.white} />
          <Text style={styles.sevBarText}>{alert.severity.toUpperCase()} ALERT</Text>
        </View>

        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.description}>{alert.description}</Text>

        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.label}>Disease</Text><Text style={styles.value}>{alert.disease}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Region</Text><Text style={styles.value}>{alert.region}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Period</Text><Text style={styles.value}>{alert.reportingPeriod}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Demo Cases</Text><Text style={styles.value}>{alert.demoCaseCount}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Change</Text><Text style={[styles.value, { color: alert.percentageChange > 0 ? Colors.critical : Colors.success }]}>
            {alert.percentageChange > 0 ? '+' : ''}{alert.percentageChange}%
          </Text></View>
          <View style={styles.row}><Text style={styles.label}>Status</Text><StatusBadge status={alert.status} /></View>
          <View style={styles.row}><Text style={styles.label}>Source</Text><Text style={styles.value}>{alert.sourceOrganization}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Verification</Text><StatusBadge status={alert.verificationStatus} /></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>RECOMMENDED FOLLOW-UP</Text>
          {alert.recommendedFollowUp.map((r, i) => (
            <View key={i} style={styles.followUpItem}>
              <View style={styles.followUpDot} />
              <Text style={styles.followUpText}>{r}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>AUDIT HISTORY</Text>
          {alert.auditHistory.map((a, i) => (
            <View key={i} style={styles.auditItem}>
              <View style={styles.auditDot} />
              <View style={styles.auditContent}>
                <Text style={styles.auditAction}>{a.action}</Text>
                <Text style={styles.auditDetails}>{a.details}</Text>
                <Text style={styles.auditMeta}>{a.actor} · {new Date(a.timestamp).toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionRow}>
          <PrimaryButton title="Mark as Read" onPress={() => router.back()} fullWidth />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: { ...Typography.h3, color: Colors.textSecondary, textAlign: 'center', marginTop: 100 },
  backLink: { ...Typography.button, color: Colors.primaryBlue, textAlign: 'center', marginTop: 16 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.screenHorizontal, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: Spacing.md },
  backBtn: { padding: 4 },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.screenHorizontal, paddingTop: Spacing.lg },
  sevBar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginBottom: Spacing.md },
  sevBarText: { ...Typography.label, color: Colors.white },
  title: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 8 },
  description: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22, marginBottom: Spacing.lg },
  card: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  label: { ...Typography.caption, color: Colors.textSecondary },
  value: { ...Typography.body, color: Colors.textPrimary },
  sectionTitle: { ...Typography.label, color: Colors.textSecondary, marginBottom: Spacing.md, fontSize: 10 },
  followUpItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  followUpDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primaryBlue, marginTop: 6 },
  followUpText: { ...Typography.body, color: Colors.textPrimary, flex: 1 },
  auditItem: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  auditDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success, marginTop: 5 },
  auditContent: { flex: 1 },
  auditAction: { ...Typography.subtitle, color: Colors.textPrimary },
  auditDetails: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  auditMeta: { ...Typography.caption, color: Colors.textMuted, marginTop: 4 },
  actionRow: { marginTop: Spacing.lg },
});
