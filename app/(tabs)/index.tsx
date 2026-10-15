import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Circle } from 'react-native-svg';
import ScreenContainer from '../../components/ScreenContainer';
import AppHeader from '../../components/AppHeader';
import DemoDataBadge from '../../components/DemoDataBadge';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import AlertCard from '../../components/AlertCard';
import ModalSheet from '../../components/ModalSheet';
import { FadeIn, PulseDot, ScalePress } from '../../components/Animated';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { Config } from '../../constants/config';
import { dashboardData } from '../../data/dashboard';
import { alerts } from '../../data/alerts';
import { getGreeting } from '../../utils/date';
import { formatNumber } from '../../utils/format';

type DashboardTab = 'Overview' | 'Surveillance' | 'Protocols';

export default function HomeScreen() {
  const router = useRouter();
  const [location, setLocation] = useState(Config.defaultLocation.name);
  const [activeTab, setActiveTab] = useState<DashboardTab>('Overview');
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showProtocolModal, setShowProtocolModal] = useState<string | null>(null);

  const bio = dashboardData.biosecurity;
  const primaryAlert = alerts[0];
  const tabs: DashboardTab[] = ['Overview', 'Surveillance', 'Protocols'];

  const circumference = 2 * Math.PI * 38;
  const strokeDashoffset = circumference - (bio.score / bio.maxScore) * circumference;

  return (
    <ScreenContainer>
      <AppHeader selectedLocation={location} onLocationChange={setLocation} />
      <DemoDataBadge />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        bounces
      >
        <FadeIn>
          <View style={styles.greetingSection}>
            <View style={styles.nodeRow}>
              <Ionicons name="shield-checkmark" size={14} color={Colors.primary} />
              <Text style={styles.nodeId}>{Config.nodeId}</Text>
            </View>
            <Text style={styles.greeting}>
              {getGreeting()}, {Config.userName}
            </Text>
            <ScalePress style={styles.radarButton} onPress={() => setShowRiskModal(true)}>
              <Ionicons name="radio-outline" size={16} color={Colors.primary} />
              <Text style={styles.radarText}>Surveillance Overview</Text>
            </ScalePress>
          </View>
        </FadeIn>

        <FadeIn index={1}>
          <ScalePress style={styles.bioCard} onPress={() => setShowRiskModal(true)}>
            <Text style={styles.bioLabel}>BIOSECURITY HEALTH LEVEL</Text>
            <View style={styles.bioContent}>
              <View style={styles.bioLeft}>
                <View style={styles.riskBadge}>
                  <PulseDot color={Colors.success} size={6} />
                  <Text style={styles.riskText}>{bio.level}</Text>
                </View>
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreValue}>{bio.score}</Text>
                  <Text style={styles.scoreMax}> / {bio.maxScore}</Text>
                </View>
                <View style={styles.changeRow}>
                  <Ionicons name="arrow-down" size={12} color={Colors.success} />
                  <Text style={styles.changeText}>
                    {bio.change}% vs {bio.period}
                  </Text>
                </View>
                <Text style={styles.bioDesc}>{bio.description}</Text>
              </View>
              <View style={styles.bioRight}>
                <Svg width={90} height={90} viewBox="0 0 90 90">
                  <Circle
                    cx={45}
                    cy={45}
                    r={38}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth={6}
                    fill="none"
                  />
                  <Circle
                    cx={45}
                    cy={45}
                    r={38}
                    stroke={Colors.success}
                    strokeWidth={6}
                    fill="none"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin="45,45"
                  />
                </Svg>
                <Text style={styles.circleScore}>{bio.score}</Text>
              </View>
            </View>
          </ScalePress>
        </FadeIn>

        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'Overview' && (
          <>
            <SectionHeader title="HIGH-PRIORITY ALERT" />
            <AlertCard
              severity={primaryAlert.severity}
              time="12 min ago"
              title={primaryAlert.title}
              description={primaryAlert.description}
              onPress={() => router.push(`/alerts/${primaryAlert.id}`)}
            />

            <View style={styles.statsRow}>
              <StatCard
                title="Active Outbreaks"
                value={dashboardData.stats.activeOutbreaks.value}
                badge={dashboardData.stats.activeOutbreaks.badge}
                icon="pulse-outline"
                iconColor={Colors.critical}
                index={0}
                onPress={() => router.push('/(tabs)/outbreaks')}
              />
              <StatCard
                title="Containment Zones"
                value={String(dashboardData.stats.containmentZones.value).padStart(2, '0')}
                badge={dashboardData.stats.containmentZones.badge}
                icon="location-outline"
                iconColor={Colors.warning}
                index={1}
                onPress={() => router.push('/(tabs)/outbreaks')}
              />
            </View>

            <SectionHeader
              title="TOP MONITORED PATHOGENS"
              action="View All"
              onAction={() => router.push('/(tabs)/diseases')}
            />
            <FadeIn index={2}>
              <View style={styles.pathogenList}>
                {dashboardData.topPathogens.map((p, i) => (
                  <ScalePress
                    key={p.id}
                    style={[styles.pathogenItem, i === dashboardData.topPathogens.length - 1 && styles.noBorder]}
                    onPress={() => router.push(`/diseases/${p.id}`)}
                  >
                    <View style={[styles.pathogenDot, { backgroundColor: getSeverityColor(p.severity) }]} />
                    <View style={styles.pathogenInfo}>
                      <Text style={styles.pathogenName}>{p.name}</Text>
                      <Text style={styles.pathogenCategory}>{p.category}</Text>
                    </View>
                    <View style={styles.pathogenRight}>
                      <Text style={styles.pathogenCases}>{formatNumber(p.demoCases)}</Text>
                      <Text style={styles.pathogenLabel}>demo cases</Text>
                    </View>
                    <Ionicons
                      name={
                        p.trend === 'up'
                          ? 'trending-up'
                          : p.trend === 'down'
                            ? 'trending-down'
                            : 'remove-outline'
                      }
                      size={16}
                      color={
                        p.trend === 'up'
                          ? Colors.critical
                          : p.trend === 'down'
                            ? Colors.success
                            : Colors.textMuted
                      }
                    />
                  </ScalePress>
                ))}
              </View>
            </FadeIn>

            <SectionHeader title="REGIONAL ACTIVITY" />
            <View style={styles.regionList}>
              {dashboardData.regionalActivity.map((r, i) => (
                <ScalePress
                  key={r.region}
                  style={[
                    styles.regionItem,
                    i === dashboardData.regionalActivity.length - 1 && styles.noBorder,
                  ]}
                  onPress={() => router.push('/(tabs)/outbreaks')}
                >
                  <View style={styles.regionLeft}>
                    <Text style={styles.regionName}>{r.region}</Text>
                    <Text style={styles.regionDisease}>{r.disease}</Text>
                  </View>
                  <View style={[styles.activityBadge, { backgroundColor: getActivityColor(r.activity) + '18' }]}>
                    <Text style={[styles.activityText, { color: getActivityColor(r.activity) }]}>
                      {r.activity}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.regionChange,
                      { color: r.change.startsWith('+') ? Colors.critical : Colors.success },
                    ]}
                  >
                    {r.change}
                  </Text>
                </ScalePress>
              ))}
            </View>

            <SectionHeader title="RECENT ACTIVITY" />
            <View style={styles.activityList}>
              {dashboardData.recentActivity.slice(0, 5).map((a, i) => (
                <View
                  key={a.id}
                  style={[
                    styles.activityItem,
                    i === Math.min(4, dashboardData.recentActivity.length - 1) && styles.noBorder,
                  ]}
                >
                  <View style={styles.activityDot} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityEvent}>{a.event}</Text>
                    <Text style={styles.activityMeta}>
                      {a.source} ·{' '}
                      {new Date(a.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor:
                          a.status === 'Verified'
                            ? Colors.success
                            : a.status === 'Active'
                              ? Colors.primary
                              : Colors.textMuted,
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
          </>
        )}

        {activeTab === 'Surveillance' && (
          <View style={styles.surveillanceTab}>
            <View style={styles.survStatsGrid}>
              {[
                { v: dashboardData.surveillanceData.totalPathogens, l: 'Total Pathogens' },
                { v: dashboardData.surveillanceData.activeOutbreaks, l: 'Active Outbreaks' },
                { v: dashboardData.surveillanceData.regionalClusters, l: 'Regional Clusters' },
                { v: dashboardData.surveillanceData.recentReports, l: 'Recent Reports' },
              ].map((s, i) => (
                <FadeIn key={s.l} index={i} style={styles.survStatWrap}>
                  <View style={styles.survStatCard}>
                    <Text style={styles.survStatValue}>{s.v}</Text>
                    <Text style={styles.survStatLabel}>{s.l}</Text>
                  </View>
                </FadeIn>
              ))}
            </View>
            <SectionHeader title="DISEASE CATEGORY BREAKDOWN" />
            <View style={styles.categoryList}>
              {dashboardData.surveillanceData.categoryBreakdown.map((c) => (
                <View key={c.category} style={styles.categoryItem}>
                  <Text style={styles.categoryName}>{c.category}</Text>
                  <View style={styles.categoryBar}>
                    <View style={[styles.categoryFill, { width: `${c.percentage}%` }]} />
                  </View>
                  <Text style={styles.categoryCount}>{c.count}</Text>
                </View>
              ))}
            </View>
            <SectionHeader title="REGIONAL SUMMARY" />
            {dashboardData.surveillanceData.regionalSummary.map((r) => (
              <View key={r.region} style={styles.regionSummaryItem}>
                <Text style={styles.rSumRegion}>{r.region}</Text>
                <Text style={styles.rSumDiseases}>{r.activeDiseasesCount} diseases</Text>
                <Text
                  style={[
                    styles.rSumChange,
                    {
                      color: r.recentChanges.startsWith('+')
                        ? Colors.critical
                        : r.recentChanges.startsWith('-')
                          ? Colors.success
                          : Colors.textMuted,
                    },
                  ]}
                >
                  {r.recentChanges}
                </Text>
                <View
                  style={[
                    styles.activityBadge,
                    { backgroundColor: getActivityColor(r.activityLevel) + '18' },
                  ]}
                >
                  <Text style={[styles.activityText, { color: getActivityColor(r.activityLevel) }]}>
                    {r.activityLevel}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Protocols' && (
          <View style={styles.protocolsTab}>
            {dashboardData.protocols.map((p, i) => (
              <FadeIn key={p.id} index={i}>
                <ScalePress style={styles.protocolCard} onPress={() => setShowProtocolModal(p.id)}>
                  <View style={styles.protocolHeader}>
                    <View style={styles.protocolIcon}>
                      <Ionicons name="document-text-outline" size={18} color={Colors.primary} />
                    </View>
                    <Text style={styles.protocolName}>{p.name}</Text>
                  </View>
                  <Text style={styles.protocolDesc} numberOfLines={2}>
                    {p.description}
                  </Text>
                  <View style={styles.protocolFooter}>
                    <View style={styles.protocolCat}>
                      <Text style={styles.protocolCatText}>{p.category}</Text>
                    </View>
                    <Text style={styles.protocolDate}>Updated: {p.lastUpdated}</Text>
                  </View>
                </ScalePress>
              </FadeIn>
            ))}
          </View>
        )}
      </ScrollView>

      <ModalSheet visible={showRiskModal} onClose={() => setShowRiskModal(false)} title="Risk Assessment">
        <View style={styles.modalBody}>
          <View style={styles.modalScoreRow}>
            <View>
              <Text style={styles.modalScoreLabel}>Current Score</Text>
              <Text style={styles.modalScoreValue}>{bio.score}</Text>
            </View>
            <View>
              <Text style={styles.modalScoreLabel}>Previous</Text>
              <Text style={styles.modalScoreValue}>{bio.previousScore}</Text>
            </View>
            <View>
              <Text style={styles.modalScoreLabel}>Classification</Text>
              <Text style={[styles.modalScoreValue, { color: Colors.success }]}>
                {bio.classification}
              </Text>
            </View>
          </View>
          <Text style={styles.modalSectionTitle}>Regional Trend</Text>
          <Text style={styles.modalText}>{bio.regionalTrend}</Text>
          <Text style={styles.modalSectionTitle}>Last Calculated</Text>
          <Text style={styles.modalText}>{new Date(bio.lastCalculated).toLocaleString()}</Text>
          <Text style={styles.modalSectionTitle}>Explanation</Text>
          <Text style={styles.modalText}>{bio.explanation}</Text>
          <Text style={styles.modalSectionTitle}>Contributing Indicators</Text>
          {bio.contributingIndicators.map((i) => (
            <View key={i.name} style={styles.indicatorRow}>
              <Text style={styles.indicatorName}>{i.name}</Text>
              <Text style={styles.indicatorValue}>{i.value}</Text>
              <Text style={styles.indicatorWeight}>({i.weight}%)</Text>
            </View>
          ))}
        </View>
      </ModalSheet>

      <ModalSheet
        visible={!!showProtocolModal}
        onClose={() => setShowProtocolModal(null)}
        title={dashboardData.protocols.find((p) => p.id === showProtocolModal)?.name || 'Protocol'}
      >
        <View style={styles.modalBody}>
          <Text style={styles.modalText}>
            {dashboardData.protocols.find((p) => p.id === showProtocolModal)?.description}
          </Text>
          <Text style={styles.modalDisclaimer}>
            This is a demonstration protocol summary. Always follow official local public health
            guidelines.
          </Text>
        </View>
      </ModalSheet>
    </ScreenContainer>
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

function getActivityColor(activity: string): string {
  switch (activity.toLowerCase()) {
    case 'high':
      return Colors.critical;
    case 'elevated':
      return Colors.warning;
    case 'moderate':
      return Colors.primary;
    case 'low':
      return Colors.success;
    case 'monitoring':
      return Colors.textMuted;
    default:
      return Colors.textMuted;
  }
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.scrollBottomInset },
  greetingSection: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  nodeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  nodeId: { ...Typography.label, color: Colors.primary, fontSize: 10 },
  greeting: { ...Typography.h1, color: Colors.textPrimary, marginBottom: Spacing.sm },
  radarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  radarText: { ...Typography.captionBold, color: Colors.primary },

  bioCard: {
    backgroundColor: Colors.primaryNavy,
    borderRadius: Spacing.cardRadiusLg,
    marginHorizontal: Spacing.screenHorizontal,
    padding: Spacing.cardPadding,
    marginBottom: Spacing.sectionGap,
    shadowColor: Colors.primaryNavy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  bioLabel: {
    ...Typography.label,
    color: Colors.white,
    opacity: 0.65,
    marginBottom: Spacing.md,
    fontSize: 10,
  },
  bioContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bioLeft: { flex: 1 },
  bioRight: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  circleScore: { position: 'absolute', ...Typography.metricSmall, color: Colors.white },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(52,199,89,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  riskText: { ...Typography.captionBold, color: Colors.success, fontSize: 11 },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  scoreValue: { ...Typography.metric, color: Colors.white },
  scoreMax: { ...Typography.bodySmall, color: Colors.white, opacity: 0.5 },
  changeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  changeText: { ...Typography.caption, color: Colors.success, fontSize: 11 },
  bioDesc: { ...Typography.caption, color: Colors.white, opacity: 0.55, fontSize: 11 },

  tabRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.secondaryFill,
    borderRadius: 12,
    padding: 3,
  },
  tab: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: 10 },
  tabActive: {
    backgroundColor: Colors.card,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  tabText: { ...Typography.captionBold, color: Colors.textSecondary },
  tabTextActive: { color: Colors.primary },

  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.screenHorizontal,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sectionGap,
  },

  pathogenList: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.sectionGap,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pathogenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.cardPadding,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
    gap: 8,
  },
  noBorder: { borderBottomWidth: 0 },
  pathogenDot: { width: 8, height: 8, borderRadius: 4 },
  pathogenInfo: { flex: 1 },
  pathogenName: { ...Typography.subtitle, color: Colors.textPrimary, fontSize: 14 },
  pathogenCategory: { ...Typography.caption, color: Colors.textSecondary, fontSize: 12 },
  pathogenRight: { alignItems: 'flex-end', marginRight: 4 },
  pathogenCases: { ...Typography.captionBold, color: Colors.textPrimary },
  pathogenLabel: { ...Typography.caption, fontSize: 10, color: Colors.textMuted },

  regionList: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.sectionGap,
    overflow: 'hidden',
  },
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.cardPadding,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
    gap: 8,
  },
  regionLeft: { flex: 1 },
  regionName: { ...Typography.subtitle, color: Colors.textPrimary, fontSize: 14 },
  regionDisease: { ...Typography.caption, color: Colors.textSecondary },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  activityText: { ...Typography.label, fontSize: 9 },
  regionChange: { ...Typography.captionBold, fontSize: 12, minWidth: 40, textAlign: 'right' },

  activityList: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.sectionGap,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: Spacing.cardPadding,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
    gap: 10,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 5,
  },
  activityContent: { flex: 1 },
  activityEvent: { ...Typography.bodySmall, color: Colors.textPrimary },
  activityMeta: { ...Typography.caption, color: Colors.textMuted, marginTop: 2 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },

  surveillanceTab: { paddingBottom: 20 },
  survStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    paddingHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.sectionGap,
  },
  survStatWrap: { width: '47%' },
  survStatCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.cardPadding,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  survStatValue: { ...Typography.metricSmall, color: Colors.primary },
  survStatLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 4 },
  categoryList: { marginHorizontal: Spacing.screenHorizontal, marginBottom: Spacing.sectionGap },
  categoryItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  categoryName: { ...Typography.caption, color: Colors.textSecondary, width: 90 },
  categoryBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.secondaryFill,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categoryFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  categoryCount: {
    ...Typography.captionBold,
    color: Colors.textPrimary,
    width: 24,
    textAlign: 'right',
  },
  regionSummaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.screenHorizontal,
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  rSumRegion: { ...Typography.subtitle, color: Colors.textPrimary, flex: 1, fontSize: 14 },
  rSumDiseases: { ...Typography.caption, color: Colors.textSecondary },
  rSumChange: { ...Typography.captionBold, fontSize: 11 },

  protocolsTab: { paddingHorizontal: Spacing.screenHorizontal },
  protocolCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.cardPadding,
    marginBottom: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  protocolHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  protocolIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  protocolName: { ...Typography.subtitle, color: Colors.textPrimary, flex: 1 },
  protocolDesc: { ...Typography.bodySmall, color: Colors.textSecondary, marginBottom: Spacing.sm },
  protocolFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  protocolCat: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: Colors.primaryLight,
  },
  protocolCatText: { ...Typography.label, color: Colors.primary, fontSize: 9 },
  protocolDate: { ...Typography.caption, color: Colors.textMuted, fontSize: 11 },

  modalBody: { paddingBottom: 20 },
  modalScoreRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalScoreLabel: { ...Typography.caption, color: Colors.textSecondary, marginBottom: 4 },
  modalScoreValue: { ...Typography.metricSmall, color: Colors.textPrimary },
  modalSectionTitle: { ...Typography.subtitle, color: Colors.textPrimary, marginTop: 16, marginBottom: 6 },
  modalText: { ...Typography.bodySmall, color: Colors.textSecondary, lineHeight: 20 },
  modalDisclaimer: { ...Typography.caption, color: Colors.warning, marginTop: 16, fontStyle: 'italic' },
  indicatorRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, gap: 8 },
  indicatorName: { ...Typography.bodySmall, color: Colors.textPrimary, flex: 1 },
  indicatorValue: { ...Typography.captionBold, color: Colors.primary },
  indicatorWeight: { ...Typography.caption, color: Colors.textMuted },
});
