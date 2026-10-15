import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Circle, Rect, Text as SvgText, G, Line } from 'react-native-svg';
import ScreenContainer from '../../components/ScreenContainer';
import DemoDataBadge from '../../components/DemoDataBadge';
import FilterChips from '../../components/FilterChips';
import SearchBar from '../../components/SearchBar';
import StatusBadge from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { outbreakClusters, outbreakIncidents, forecastData } from '../../data/outbreaks';
import { formatNumber } from '../../utils/format';

type OutbreakTab = 'GIS Map' | 'Incidents' | 'AI Forecast';
const screenWidth = Dimensions.get('window').width;

export default function OutbreaksScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<OutbreakTab>('GIS Map');
  const [selectedClusterId, setSelectedClusterId] = useState('cluster-1');
  const [mapLayer, setMapLayer] = useState('All');
  const [incidentSearch, setIncidentSearch] = useState('');
  const [incidentFilter, setIncidentFilter] = useState('All');
  const [forecastHorizon, setForecastHorizon] = useState('24h');

  const selectedCluster = outbreakClusters.find(c => c.id === selectedClusterId);
  const tabs: OutbreakTab[] = ['GIS Map', 'Incidents', 'AI Forecast'];
  const layers = ['All', 'Dengue', 'Influenza', 'Malaria', 'Nipah'];
  const severities = ['All', 'Critical', 'High', 'Moderate', 'Low'];
  const horizons = ['24h', '3d', '7d', '14d'];

  const filteredIncidents = outbreakIncidents.filter(i => {
    const matchFilter = incidentFilter === 'All' || i.severity === incidentFilter;
    const matchSearch = !incidentSearch || i.disease.toLowerCase().includes(incidentSearch.toLowerCase()) || i.cluster.toLowerCase().includes(incidentSearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  const currentForecasts = forecastData[forecastHorizon] || forecastData['24h'];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>TELEMETRY FEED</Text>
          <Text style={styles.headerTitle}>Outbreak Intelligence</Text>
        </View>
        <View style={styles.clusterBadge}>
          <Text style={styles.clusterBadgeText}>3 Active Clusters</Text>
        </View>
      </View>
      <DemoDataBadge />

      {/* Tab Selector */}
      <View style={styles.tabRow}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        bounces
      >
        {activeTab === 'GIS Map' && (
          <>
            {/* SVG Map */}
            <View style={styles.mapContainer}>
              <Svg width={screenWidth - 32} height={260} viewBox="0 0 340 260">
                {/* Simplified Kerala shape */}
                <Rect x={0} y={0} width={340} height={260} rx={12} fill={Colors.lightBlue} />
                <G>
                  {/* Water-like background */}
                  <Rect x={10} y={10} width={320} height={240} rx={8} fill="#D6E8F7" />
                  {/* Simplified land mass */}
                  <Rect x={80} y={20} width={180} height={220} rx={40} fill="#E8F0E8" stroke={Colors.border} strokeWidth={1} />
                </G>
                {/* Cluster markers */}
                {outbreakClusters.map((cluster, idx) => {
                  if (mapLayer !== 'All' && !cluster.disease.toLowerCase().includes(mapLayer.toLowerCase())) return null;
                  const positions = [
                    { x: 170, y: 140 },
                    { x: 140, y: 160 },
                    { x: 160, y: 60 },
                    { x: 190, y: 210 },
                  ];
                  const pos = positions[idx];
                  const color = cluster.status === 'Critical' ? Colors.critical : cluster.status === 'Elevated' ? Colors.warning : Colors.primaryBlue;
                  const isSelected = cluster.id === selectedClusterId;
                  return (
                    <G key={cluster.id} onPress={() => setSelectedClusterId(cluster.id)}>
                      <Circle cx={pos.x} cy={pos.y} r={isSelected ? 18 : 14} fill={color + '30'} />
                      <Circle cx={pos.x} cy={pos.y} r={isSelected ? 10 : 7} fill={color} />
                      <SvgText x={pos.x + 20} y={pos.y + 4} fontSize={9} fill={Colors.textPrimary} fontWeight="600">
                        {cluster.name.split(' ')[0]}
                      </SvgText>
                    </G>
                  );
                })}
                {/* Legend */}
                <Circle cx={20} cy={245} r={4} fill={Colors.critical} />
                <SvgText x={28} y={248} fontSize={8} fill={Colors.textSecondary}>Critical</SvgText>
                <Circle cx={80} cy={245} r={4} fill={Colors.warning} />
                <SvgText x={88} y={248} fontSize={8} fill={Colors.textSecondary}>Elevated</SvgText>
                <Circle cx={145} cy={245} r={4} fill={Colors.primaryBlue} />
                <SvgText x={153} y={248} fontSize={8} fill={Colors.textSecondary}>Monitoring</SvgText>
              </Svg>
              {/* Map Controls */}
              <View style={styles.mapControls}>
                <TouchableOpacity style={styles.mapControlBtn}><Ionicons name="add" size={18} color={Colors.textPrimary} /></TouchableOpacity>
                <TouchableOpacity style={styles.mapControlBtn}><Ionicons name="remove" size={18} color={Colors.textPrimary} /></TouchableOpacity>
                <TouchableOpacity style={styles.mapControlBtn}><Ionicons name="locate" size={18} color={Colors.primaryBlue} /></TouchableOpacity>
              </View>
            </View>

            {/* Layer Filter */}
            <FilterChips options={layers} selected={mapLayer} onSelect={setMapLayer} />

            {/* Selected Cluster Card */}
            {selectedCluster && (
              <View style={styles.clusterCard}>
                <View style={styles.clusterHeader}>
                  <Text style={styles.clusterName}>{selectedCluster.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedCluster.status) + '15' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(selectedCluster.status) }]}>{selectedCluster.status.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={styles.clusterDisease}>{selectedCluster.disease}</Text>
                {selectedCluster.vector && <Text style={styles.clusterVector}>Vector: {selectedCluster.vector}</Text>}
                <View style={styles.clusterStats}>
                  <View style={styles.clusterStat}>
                    <Text style={styles.clusterStatLabel}>Reported Cases</Text>
                    <Text style={styles.clusterStatValue}>{formatNumber(selectedCluster.demoCaseCount)}</Text>
                    <Text style={[styles.clusterTrend, { color: selectedCluster.trendDirection === 'up' ? Colors.critical : Colors.success }]}>
                      {selectedCluster.trendDirection === 'up' ? '+' : ''}{selectedCluster.trendPercentage}%
                    </Text>
                  </View>
                  <View style={styles.clusterDivider} />
                  <View style={styles.clusterStat}>
                    <Text style={styles.clusterStatLabel}>Transmission Index</Text>
                    <Text style={[styles.clusterStatValue, selectedCluster.transmissionIndex > 1 ? { color: Colors.critical } : {}]}>
                      {selectedCluster.transmissionIndex.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={styles.clusterActions}>
                  <TouchableOpacity style={styles.dossierBtn} onPress={() => router.push(`/outbreaks/${selectedCluster.id}`)}>
                    <Ionicons name="document-text-outline" size={16} color={Colors.white} />
                    <Text style={styles.dossierText}>Dossier</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.protocolBtn}>
                    <Ionicons name="shield-outline" size={16} color={Colors.primaryBlue} />
                    <Text style={styles.protocolText}>Protocol</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}

        {activeTab === 'Incidents' && (
          <>
            <SearchBar value={incidentSearch} onChangeText={setIncidentSearch} placeholder="Search incidents..." />
            <FilterChips options={severities} selected={incidentFilter} onSelect={setIncidentFilter} />
            {filteredIncidents.map(incident => (
              <TouchableOpacity key={incident.id} style={styles.incidentCard} onPress={() => router.push(`/outbreaks/${incident.clusterId}`)}>
                <View style={styles.incidentHeader}>
                  <Text style={styles.incidentId}>{incident.incidentId}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getSeverityColor(incident.severity) + '15' }]}>
                    <Text style={[styles.statusText, { color: getSeverityColor(incident.severity) }]}>{incident.severity.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={styles.incidentDisease}>{incident.disease} — {incident.cluster}</Text>
                <Text style={styles.incidentRegion}>{incident.region}, {incident.district}</Text>
                <Text style={styles.incidentDesc} numberOfLines={2}>{incident.description}</Text>
                <View style={styles.incidentFooter}>
                  <Text style={styles.incidentDate}>{new Date(incident.dateReported).toLocaleDateString()}</Text>
                  <StatusBadge status={incident.verificationStatus} />
                  <StatusBadge status={incident.status} />
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {activeTab === 'AI Forecast' && (
          <>
            <View style={styles.forecastNotice}>
              <Ionicons name="information-circle-outline" size={16} color={Colors.warning} />
              <Text style={styles.forecastNoticeText}>Illustrative forecast only. No live prediction model is connected.</Text>
            </View>
            <View style={styles.horizonRow}>
              {horizons.map(h => (
                <TouchableOpacity key={h} style={[styles.horizonChip, forecastHorizon === h && styles.horizonChipActive]} onPress={() => setForecastHorizon(h)}>
                  <Text style={[styles.horizonText, forecastHorizon === h && styles.horizonTextActive]}>{h}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {currentForecasts.map(f => (
              <View key={f.region} style={styles.forecastCard}>
                <View style={styles.forecastHeader}>
                  <Text style={styles.forecastRegion}>{f.region}</Text>
                  <View style={styles.forecastRisk}>
                    <View style={[styles.riskFill, { width: `${f.riskLevel}%`, backgroundColor: f.riskLevel > 70 ? Colors.critical : f.riskLevel > 50 ? Colors.warning : Colors.success }]} />
                  </View>
                  <Text style={styles.forecastRiskValue}>{f.riskLevel}%</Text>
                </View>
                <View style={styles.forecastDetails}>
                  <View style={styles.forecastDetail}>
                    <Text style={styles.forecastDetailLabel}>Predicted</Text>
                    <Text style={styles.forecastDetailValue}>{f.predictedCases} cases</Text>
                  </View>
                  <View style={styles.forecastDetail}>
                    <Text style={styles.forecastDetailLabel}>Confidence</Text>
                    <Text style={styles.forecastDetailValue}>{f.confidence}%</Text>
                  </View>
                  <View style={styles.forecastDetail}>
                    <Text style={styles.forecastDetailLabel}>Data</Text>
                    <Text style={styles.forecastDetailValue}>{f.dataCompleteness}%</Text>
                  </View>
                  <Ionicons
                    name={f.trendDirection === 'up' ? 'trending-up' : f.trendDirection === 'down' ? 'trending-down' : 'remove-outline'}
                    size={18}
                    color={f.trendDirection === 'up' ? Colors.critical : f.trendDirection === 'down' ? Colors.success : Colors.textMuted}
                  />
                </View>
                <View style={styles.indicatorTags}>
                  {f.indicators.map(ind => (
                    <View key={ind} style={styles.indicatorTag}><Text style={styles.indicatorTagText}>{ind}</Text></View>
                  ))}
                </View>
              </View>
            ))}
            <View style={styles.forecastDisclaimer}>
              <Text style={styles.disclaimerText}>
                Future production forecasts would depend on verified reports, historical trends, and appropriate epidemiological datasets. This interface demonstrates the planned forecast visualization.
              </Text>
            </View>
          </>
        )}

      </ScrollView>
    </ScreenContainer>
  );
}

function getStatusColor(s: string) {
  switch (s.toLowerCase()) { case 'critical': return Colors.critical; case 'elevated': return Colors.warning; case 'monitoring': return Colors.primary; default: return Colors.textMuted; }
}
function getSeverityColor(s: string) {
  switch (s.toLowerCase()) { case 'critical': return Colors.critical; case 'high': return '#E05D44'; case 'moderate': return Colors.warning; case 'low': return Colors.success; default: return Colors.textMuted; }
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.screenHorizontal, paddingTop: Spacing.lg, paddingBottom: Spacing.md },
  headerLabel: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },
  headerTitle: { ...Typography.h2, color: Colors.textPrimary },
  clusterBadge: { backgroundColor: Colors.criticalBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  clusterBadgeText: { ...Typography.captionBold, color: Colors.critical, fontSize: 11 },

  tabRow: { flexDirection: 'row', marginHorizontal: Spacing.screenHorizontal, marginVertical: Spacing.md, backgroundColor: Colors.secondaryFill, borderRadius: 12, padding: 3 },
  tab: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: Colors.card, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 1 },
  tabText: { ...Typography.captionBold, color: Colors.textSecondary },
  tabTextActive: { color: Colors.primary },

  scroll: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.scrollBottomInset },

  mapContainer: { marginHorizontal: Spacing.screenHorizontal, borderRadius: Spacing.cardRadius, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border, position: 'relative', marginBottom: Spacing.sm },
  mapControls: { position: 'absolute', right: 8, top: 8, gap: 4 },
  mapControlBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },

  clusterCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, marginHorizontal: Spacing.screenHorizontal, padding: Spacing.cardPadding, marginTop: Spacing.md, marginBottom: Spacing.md, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  clusterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  clusterName: { ...Typography.h3, color: Colors.textPrimary },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { ...Typography.label, fontSize: 10 },
  clusterDisease: { ...Typography.bodySmall, color: Colors.primary, marginBottom: 2, fontWeight: '600' },
  clusterVector: { ...Typography.caption, color: Colors.textSecondary, marginBottom: Spacing.md },
  clusterStats: { flexDirection: 'row', backgroundColor: Colors.primaryLight, borderRadius: 12, padding: Spacing.md, marginBottom: Spacing.md },
  clusterStat: { flex: 1, alignItems: 'center' },
  clusterStatLabel: { ...Typography.caption, color: Colors.textSecondary, marginBottom: 4 },
  clusterStatValue: { ...Typography.h3, color: Colors.textPrimary },
  clusterTrend: { ...Typography.captionBold, fontSize: 11 },
  clusterDivider: { width: 1, backgroundColor: Colors.border },
  clusterActions: { flexDirection: 'row', gap: Spacing.md },
  dossierBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: Colors.primary, paddingVertical: 12, borderRadius: 12 },
  dossierText: { ...Typography.button, color: Colors.white, fontSize: 15 },
  protocolBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: Colors.primaryLight, paddingVertical: 12, borderRadius: 12 },
  protocolText: { ...Typography.button, color: Colors.primary, fontSize: 15 },

  incidentCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, marginHorizontal: Spacing.screenHorizontal, padding: Spacing.cardPadding, marginBottom: Spacing.sm, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  incidentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  incidentId: { ...Typography.captionBold, color: Colors.textMuted },
  incidentDisease: { ...Typography.subtitle, color: Colors.textPrimary, marginBottom: 2 },
  incidentRegion: { ...Typography.caption, color: Colors.textSecondary, marginBottom: 4 },
  incidentDesc: { ...Typography.bodySmall, color: Colors.textSecondary, marginBottom: Spacing.sm },
  incidentFooter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  incidentDate: { ...Typography.caption, color: Colors.textMuted },

  forecastNotice: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.warningBg, marginHorizontal: Spacing.screenHorizontal, padding: Spacing.md, borderRadius: 8, marginBottom: Spacing.md },
  forecastNoticeText: { ...Typography.caption, color: Colors.warning, flex: 1 },
  horizonRow: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.screenHorizontal, marginBottom: Spacing.md },
  horizonChip: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  horizonChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  horizonText: { ...Typography.captionBold, color: Colors.textSecondary },
  horizonTextActive: { color: Colors.white },

  forecastCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, marginHorizontal: Spacing.screenHorizontal, padding: Spacing.cardPadding, marginBottom: Spacing.sm, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  forecastHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  forecastRegion: { ...Typography.subtitle, color: Colors.textPrimary, width: 110 },
  forecastRisk: { flex: 1, height: 8, backgroundColor: Colors.secondaryFill, borderRadius: 4, overflow: 'hidden' },
  riskFill: { height: '100%', borderRadius: 4 },
  forecastRiskValue: { ...Typography.captionBold, color: Colors.textPrimary, width: 36, textAlign: 'right' },
  forecastDetails: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  forecastDetail: { alignItems: 'center' },
  forecastDetailLabel: { ...Typography.caption, color: Colors.textMuted, fontSize: 10 },
  forecastDetailValue: { ...Typography.captionBold, color: Colors.textPrimary },
  indicatorTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  indicatorTag: { backgroundColor: Colors.primaryLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  indicatorTagText: { ...Typography.caption, color: Colors.primary, fontSize: 10 },
  forecastDisclaimer: { marginHorizontal: Spacing.screenHorizontal, padding: Spacing.md, backgroundColor: Colors.primaryLight, borderRadius: 12, marginTop: Spacing.md },
  disclaimerText: { ...Typography.caption, color: Colors.textSecondary, lineHeight: 18 },
});
