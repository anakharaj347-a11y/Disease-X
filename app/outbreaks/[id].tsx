import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBadge from '../../components/StatusBadge';
import RiskBadge from '../../components/RiskBadge';
import DemoDataBadge from '../../components/DemoDataBadge';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { getClusterById, getIncidentsByCluster } from '../../data/outbreaks';
import { formatNumber } from '../../utils/format';

export default function OutbreakDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const cluster = getClusterById(id);

  if (!cluster) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Outbreak not found</Text>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.backLink}>Go back</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  const incidents = getIncidentsByCluster(id);
  const statusColor = cluster.status === 'Critical' ? Colors.critical : cluster.status === 'Elevated' ? Colors.warning : Colors.primaryBlue;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>{cluster.name}</Text>
          <Text style={styles.headerSubtitle}>Outbreak Dossier</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{cluster.status.toUpperCase()}</Text>
        </View>
      </View>
      <DemoDataBadge />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Overview Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>CLUSTER OVERVIEW</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Disease</Text>
            <Text style={styles.value}>{cluster.disease}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Region</Text>
            <Text style={styles.value}>{cluster.region}, {cluster.district}</Text>
          </View>
          {cluster.vector && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Vector</Text>
              <Text style={styles.value}>{cluster.vector}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Last Recorded</Text>
            <Text style={styles.value}>{new Date(cluster.lastRecorded).toLocaleString()}</Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatNumber(cluster.demoCaseCount)}</Text>
            <Text style={styles.statLabel}>Reported Cases</Text>
            <Text style={[styles.statTrend, { color: cluster.trendDirection === 'up' ? Colors.critical : Colors.success }]}>
              {cluster.trendDirection === 'up' ? '+' : ''}{cluster.trendPercentage}%
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, cluster.transmissionIndex > 1 ? { color: Colors.critical } : {}]}>
              {cluster.transmissionIndex.toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>Transmission Index</Text>
            <Text style={styles.statNote}>{cluster.transmissionIndex > 1 ? 'Above threshold' : 'Below threshold'}</Text>
          </View>
        </View>

        {/* Severity & Verification */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>CLASSIFICATION</Text>
          <View style={styles.classRow}>
            <View><Text style={styles.label}>Severity</Text><RiskBadge level={cluster.severity} size="medium" /></View>
            <View><Text style={styles.label}>Status</Text><StatusBadge status={cluster.status} /></View>
          </View>
        </View>

        {/* Related Incidents */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>RELATED INCIDENTS ({incidents.length})</Text>
          {incidents.map(inc => (
            <View key={inc.id} style={styles.incidentItem}>
              <View style={styles.incidentHeader}>
                <Text style={styles.incidentId}>{inc.incidentId}</Text>
                <RiskBadge level={inc.severity} />
              </View>
              <Text style={styles.incidentDesc} numberOfLines={2}>{inc.description}</Text>
              <View style={styles.incidentMeta}>
                <Text style={styles.incidentDate}>{new Date(inc.dateReported).toLocaleDateString()}</Text>
                <StatusBadge status={inc.verificationStatus} />
                <StatusBadge status={inc.status} />
              </View>
            </View>
          ))}
        </View>

        {/* Guidance */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>PUBLIC HEALTH GUIDANCE</Text>
          <Text style={styles.guidanceText}>
            This outbreak dossier summarizes demonstration surveillance data for the {cluster.name}.
            In production, this section would contain verified public health guidance, recommended interventions,
            and links to official response protocols from the relevant health authorities.
          </Text>
          <View style={styles.disclaimerBox}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.warning} />
            <Text style={styles.disclaimerText}>
              All data shown is for demonstration purposes. Do not use this information for actual public health decision-making.
            </Text>
          </View>
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
  headerContent: { flex: 1 },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  headerSubtitle: { ...Typography.caption, color: Colors.textSecondary },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { ...Typography.label, fontSize: 10 },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.screenHorizontal, paddingTop: Spacing.lg },
  card: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md },
  sectionTitle: { ...Typography.label, color: Colors.textSecondary, marginBottom: Spacing.md, fontSize: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  label: { ...Typography.caption, color: Colors.textSecondary },
  value: { ...Typography.body, color: Colors.textPrimary },
  statsGrid: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  statCard: { flex: 1, backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, alignItems: 'center' },
  statValue: { ...Typography.metric, color: Colors.textPrimary },
  statLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 4 },
  statTrend: { ...Typography.captionBold, marginTop: 4 },
  statNote: { ...Typography.caption, color: Colors.textMuted, marginTop: 4, fontSize: 10 },
  classRow: { flexDirection: 'row', justifyContent: 'space-around', gap: 16 },
  incidentItem: { paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  incidentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  incidentId: { ...Typography.captionBold, color: Colors.textMuted },
  incidentDesc: { ...Typography.bodySmall, color: Colors.textSecondary, marginBottom: 6 },
  incidentMeta: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  incidentDate: { ...Typography.caption, color: Colors.textMuted },
  guidanceText: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22, marginBottom: Spacing.md },
  disclaimerBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: Colors.warningBg, padding: Spacing.md, borderRadius: 8 },
  disclaimerText: { ...Typography.caption, color: Colors.warning, flex: 1, lineHeight: 18 },
});
