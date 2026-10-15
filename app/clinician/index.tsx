import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBadge from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { clinicianProfile, telemetryData, ledgerEntries, vaultRecords, systemStatuses } from '../../data/clinicians';
import { ledgerData } from '../../data/ledger';

type HubTab = 'Telemetry' | 'Ledger' | 'Vault' | 'Systems';

export default function ClinicianHubScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<HubTab>('Telemetry');
  const tabs: HubTab[] = ['Telemetry', 'Ledger', 'Vault', 'Systems'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerLabel}>SECURE ACCESS</Text>
          <Text style={styles.headerTitle}>Clinician Security Hub</Text>
        </View>
        <Ionicons name="shield-checkmark" size={24} color={Colors.primaryNavy} />
      </View>

      {/* Clinician Info */}
      <View style={styles.clinicianBar}>
        <View style={styles.clinicianAvatar}><Ionicons name="person" size={16} color={Colors.white} /></View>
        <View style={styles.clinicianInfo}>
          <Text style={styles.clinicianName}>{clinicianProfile.name}</Text>
          <Text style={styles.clinicianRole}>{clinicianProfile.clearanceLevel}</Text>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'Telemetry' && telemetryData.map(t => (
          <View key={t.id} style={styles.telemetryCard}>
            <View style={styles.telemetryHeader}>
              <Text style={styles.telemetryMetric}>{t.metric}</Text>
              <View style={[styles.telemetryStatus, { backgroundColor: t.status === 'Normal' ? Colors.successBg : Colors.warningBg }]}>
                <Text style={[styles.telemetryStatusText, { color: t.status === 'Normal' ? Colors.success : Colors.warning }]}>{t.status}</Text>
              </View>
            </View>
            <View style={styles.telemetryValueRow}>
              <Text style={styles.telemetryValue}>{t.value}</Text>
              <Text style={styles.telemetryUnit}>{t.unit}</Text>
              <Ionicons name={t.trend === 'up' ? 'trending-up' : t.trend === 'down' ? 'trending-down' : 'remove-outline'} size={16} color={t.trend === 'up' ? Colors.warning : t.trend === 'down' ? Colors.success : Colors.textMuted} />
            </View>
          </View>
        ))}

        {activeTab === 'Ledger' && (
          <>
            <View style={styles.ledgerSummary}>
              <View style={styles.ledgerStat}><Text style={styles.ledgerStatValue}>{ledgerData.totalTransactions.toLocaleString()}</Text><Text style={styles.ledgerStatLabel}>Total Tx</Text></View>
              <View style={styles.ledgerStat}><Text style={styles.ledgerStatValue}>{ledgerData.verifiedPercentage}%</Text><Text style={styles.ledgerStatLabel}>Verified</Text></View>
              <View style={styles.ledgerStat}><Text style={styles.ledgerStatValue}>{ledgerData.networkNodes}</Text><Text style={styles.ledgerStatLabel}>Nodes</Text></View>
            </View>
            {ledgerEntries.map(entry => (
              <View key={entry.id} style={styles.ledgerCard}>
                <View style={styles.ledgerHeader}>
                  <View style={[styles.ledgerType, { backgroundColor: Colors.lightBlue }]}>
                    <Text style={styles.ledgerTypeText}>{entry.type}</Text>
                  </View>
                  <StatusBadge status={entry.verificationStatus} />
                </View>
                <Text style={styles.ledgerDesc}>{entry.description}</Text>
                <Text style={styles.ledgerHash}>{entry.transactionHash}</Text>
                <View style={styles.ledgerMeta}>
                  <Text style={styles.ledgerMetaText}>{entry.actor}</Text>
                  <Text style={styles.ledgerMetaText}>Block #{entry.blockNumber}</Text>
                  <Text style={styles.ledgerMetaText}>{new Date(entry.timestamp).toLocaleTimeString()}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {activeTab === 'Vault' && vaultRecords.map(v => (
          <View key={v.id} style={styles.vaultCard}>
            <View style={styles.vaultHeader}>
              <Ionicons name={v.type === 'Certificate' ? 'ribbon-outline' : v.type === 'Key' ? 'key-outline' : v.type === 'Token' ? 'ticket-outline' : 'card-outline'} size={20} color={Colors.primaryBlue} />
              <View style={styles.vaultInfo}>
                <Text style={styles.vaultName}>{v.name}</Text>
                <Text style={styles.vaultIssuer}>{v.issuer}</Text>
              </View>
              <StatusBadge status={v.status} />
            </View>
            <View style={styles.vaultMeta}>
              <Text style={styles.vaultMetaText}>Issued: {new Date(v.issuedAt).toLocaleDateString()}</Text>
              <Text style={styles.vaultMetaText}>Expires: {new Date(v.expiresAt).toLocaleDateString()}</Text>
            </View>
          </View>
        ))}

        {activeTab === 'Systems' && systemStatuses.map(s => (
          <View key={s.id} style={styles.systemCard}>
            <View style={styles.systemHeader}>
              <View style={[styles.systemDot, { backgroundColor: s.status === 'Operational' ? Colors.success : s.status === 'Degraded' ? Colors.warning : Colors.critical }]} />
              <Text style={styles.systemName}>{s.name}</Text>
              <StatusBadge status={s.status} />
            </View>
            <View style={styles.systemMeta}>
              <Text style={styles.systemMetaText}>Uptime: {s.uptime}</Text>
              <Text style={styles.systemMetaText}>Response: {s.responseTime}ms</Text>
              <Text style={styles.systemMetaText}>Last: {new Date(s.lastCheck).toLocaleTimeString()}</Text>
            </View>
          </View>
        ))}

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
  headerLabel: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  clinicianBar: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingHorizontal: Spacing.screenHorizontal, paddingVertical: Spacing.md, backgroundColor: Colors.primaryNavy },
  clinicianAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primaryBlue, alignItems: 'center', justifyContent: 'center' },
  clinicianInfo: { flex: 1 },
  clinicianName: { ...Typography.subtitle, color: Colors.white },
  clinicianRole: { ...Typography.caption, color: Colors.white, opacity: 0.7 },
  tabScroll: { paddingHorizontal: Spacing.screenHorizontal, paddingVertical: Spacing.sm, gap: 8, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.paleBlue },
  tabActive: { backgroundColor: Colors.primaryBlue },
  tabText: { ...Typography.captionBold, color: Colors.textSecondary },
  tabTextActive: { color: Colors.white },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.screenHorizontal, paddingTop: Spacing.md },

  telemetryCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.sm },
  telemetryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  telemetryMetric: { ...Typography.subtitle, color: Colors.textPrimary },
  telemetryStatus: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  telemetryStatusText: { ...Typography.label, fontSize: 10 },
  telemetryValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  telemetryValue: { ...Typography.metric, color: Colors.textPrimary },
  telemetryUnit: { ...Typography.body, color: Colors.textMuted },

  ledgerSummary: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  ledgerStat: { flex: 1, backgroundColor: Colors.card, borderRadius: Spacing.cardRadiusSm, padding: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  ledgerStatValue: { ...Typography.subtitle, color: Colors.primaryBlue },
  ledgerStatLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  ledgerCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.sm },
  ledgerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  ledgerType: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  ledgerTypeText: { ...Typography.captionBold, color: Colors.primaryBlue, fontSize: 11 },
  ledgerDesc: { ...Typography.body, color: Colors.textPrimary, marginBottom: 4 },
  ledgerHash: { ...Typography.caption, color: Colors.textMuted, fontFamily: 'monospace', marginBottom: 8 },
  ledgerMeta: { flexDirection: 'row', gap: 12 },
  ledgerMetaText: { ...Typography.caption, color: Colors.textSecondary },

  vaultCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.sm },
  vaultHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  vaultInfo: { flex: 1 },
  vaultName: { ...Typography.subtitle, color: Colors.textPrimary },
  vaultIssuer: { ...Typography.caption, color: Colors.textSecondary },
  vaultMeta: { flexDirection: 'row', gap: 16, marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border },
  vaultMetaText: { ...Typography.caption, color: Colors.textMuted },

  systemCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.sm },
  systemHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  systemDot: { width: 10, height: 10, borderRadius: 5 },
  systemName: { ...Typography.subtitle, color: Colors.textPrimary, flex: 1 },
  systemMeta: { flexDirection: 'row', gap: 12, marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border },
  systemMetaText: { ...Typography.caption, color: Colors.textSecondary },
});
