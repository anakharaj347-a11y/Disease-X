import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import RiskBadge from '../../components/RiskBadge';
import StatusBadge from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { getDiseaseById } from '../../data/diseases';

type DetailTab = 'Overview' | 'Symptoms' | 'Transmission' | 'Prevention' | 'Treatment';

export default function DiseaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DetailTab>('Overview');
  const disease = getDiseaseById(id);

  if (!disease) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Disease not found</Text>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.backLink}>Go back</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  const tabs: DetailTab[] = ['Overview', 'Symptoms', 'Transmission', 'Prevention', 'Treatment'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>{disease.name}</Text>
          <Text style={styles.headerSubtitle}>{disease.category}</Text>
        </View>
        <RiskBadge level={disease.riskLevel} />
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {activeTab === 'Overview' && (
          <View style={styles.content}>
            <View style={styles.statsGrid}>
              <View style={styles.miniStat}><Text style={styles.miniStatValue}>{disease.demoCaseCount.toLocaleString()}</Text><Text style={styles.miniStatLabel}>Demo Cases</Text></View>
              <View style={styles.miniStat}><Text style={styles.miniStatValue}>{disease.mortalityRate}</Text><Text style={styles.miniStatLabel}>Mortality</Text></View>
              <View style={styles.miniStat}><Text style={styles.miniStatValue}>{disease.recoveryRate}</Text><Text style={styles.miniStatLabel}>Recovery</Text></View>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Description</Text>
              <Text style={styles.infoText}>{disease.description}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Causative Agent</Text>
              <Text style={styles.infoText}>{disease.causativeAgent}</Text>
            </View>
            {disease.vector && (
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Vector</Text>
                <Text style={styles.infoText}>{disease.vector}</Text>
              </View>
            )}
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Incubation Period</Text>
              <Text style={styles.infoText}>{disease.incubationPeriod}</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoHalf}><Text style={styles.infoLabel}>Verification</Text><StatusBadge status={disease.verificationStatus} /></View>
              <View style={styles.infoHalf}><Text style={styles.infoLabel}>Severity</Text><RiskBadge level={disease.severity} /></View>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Affected Regions</Text>
              <View style={styles.regionTags}>{disease.regions.map(r => <View key={r} style={styles.regionTag}><Text style={styles.regionTagText}>{r}</Text></View>)}</View>
            </View>
          </View>
        )}

        {activeTab === 'Symptoms' && (
          <View style={styles.content}>
            {disease.symptoms.map(s => (
              <View key={s.id} style={styles.symptomItem}>
                <View style={styles.symptomLeft}>
                  <Text style={styles.symptomName}>{s.name}</Text>
                  <Text style={styles.symptomDesc}>{s.description}</Text>
                </View>
                <View style={[styles.commonalityBadge, { backgroundColor: s.commonality === 'Very Common' ? Colors.criticalBg : s.commonality === 'Common' ? Colors.warningBg : Colors.lightBlue }]}>
                  <Text style={[styles.commonalityText, { color: s.commonality === 'Very Common' ? Colors.critical : s.commonality === 'Common' ? Colors.warning : Colors.primaryBlue }]}>{s.commonality}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Transmission' && (
          <View style={styles.content}>
            {disease.transmissionMethods.map((t, i) => (
              <View key={i} style={styles.listCard}>
                <View style={styles.listIcon}><Ionicons name="swap-horizontal-outline" size={18} color={Colors.primaryBlue} /></View>
                <Text style={styles.listText}>{t}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Prevention' && (
          <View style={styles.content}>
            {disease.preventiveMeasures.map((p, i) => (
              <View key={i} style={styles.listCard}>
                <View style={[styles.listIcon, { backgroundColor: Colors.successBg }]}><Ionicons name="shield-checkmark-outline" size={18} color={Colors.success} /></View>
                <Text style={styles.listText}>{p}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Treatment' && (
          <View style={styles.content}>
            {disease.treatments.map((t, i) => (
              <View key={i} style={styles.listCard}>
                <View style={[styles.listIcon, { backgroundColor: Colors.warningBg }]}><Ionicons name="medical-outline" size={18} color={Colors.warning} /></View>
                <Text style={styles.listText}>{t}</Text>
              </View>
            ))}
            <View style={styles.disclaimerBox}>
              <Ionicons name="information-circle-outline" size={16} color={Colors.warning} />
              <Text style={styles.disclaimerText}>Treatment information is for educational purposes only. Always consult a qualified healthcare provider.</Text>
            </View>
          </View>
        )}
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
  headerSubtitle: { ...Typography.caption, color: Colors.primaryBlue },
  tabScroll: { paddingHorizontal: Spacing.screenHorizontal, paddingVertical: Spacing.sm, gap: 8, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.paleBlue },
  tabActive: { backgroundColor: Colors.primaryBlue },
  tabText: { ...Typography.captionBold, color: Colors.textSecondary },
  tabTextActive: { color: Colors.white },
  scroll: { flex: 1 },
  content: { padding: Spacing.screenHorizontal, paddingTop: Spacing.lg },
  statsGrid: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  miniStat: { flex: 1, backgroundColor: Colors.card, borderRadius: Spacing.cardRadiusSm, padding: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  miniStatValue: { ...Typography.subtitle, color: Colors.primaryBlue },
  miniStatLabel: { ...Typography.caption, color: Colors.textSecondary, fontSize: 10, marginTop: 2 },
  infoCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadiusSm, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md },
  infoLabel: { ...Typography.label, color: Colors.textSecondary, marginBottom: 6, fontSize: 10 },
  infoText: { ...Typography.body, color: Colors.textPrimary, lineHeight: 22 },
  infoRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  infoHalf: { flex: 1, backgroundColor: Colors.card, borderRadius: Spacing.cardRadiusSm, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border },
  regionTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  regionTag: { backgroundColor: Colors.lightBlue, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  regionTagText: { ...Typography.captionBold, color: Colors.primaryBlue },
  symptomItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: Spacing.cardRadiusSm, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.sm },
  symptomLeft: { flex: 1 },
  symptomName: { ...Typography.subtitle, color: Colors.textPrimary },
  symptomDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  commonalityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  commonalityText: { ...Typography.label, fontSize: 9 },
  listCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.card, borderRadius: Spacing.cardRadiusSm, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.sm },
  listIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.lightBlue, alignItems: 'center', justifyContent: 'center' },
  listText: { ...Typography.body, color: Colors.textPrimary, flex: 1 },
  disclaimerBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: Colors.warningBg, padding: Spacing.md, borderRadius: 8, marginTop: Spacing.md },
  disclaimerText: { ...Typography.caption, color: Colors.warning, flex: 1, lineHeight: 18 },
});
