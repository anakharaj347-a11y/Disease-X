import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

export default function NotificationsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    criticalAlerts: true, highAlerts: true, moderateAlerts: true, lowAlerts: false,
    outbreakUpdates: true, reportVerifications: true, systemStatus: false, weeklyDigest: true,
  });

  const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><Ionicons name="arrow-back" size={22} color={Colors.textPrimary} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>ALERT SEVERITY</Text>
        <View style={styles.card}>
          {(['criticalAlerts', 'highAlerts', 'moderateAlerts', 'lowAlerts'] as const).map(key => (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{key.replace('Alerts', ' Alerts').replace(/([A-Z])/g, ' $1').trim()}</Text>
              <Switch value={settings[key]} onValueChange={() => toggle(key)} trackColor={{ true: Colors.primaryBlue }} thumbColor={Colors.white} />
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>UPDATES</Text>
        <View style={styles.card}>
          {(['outbreakUpdates', 'reportVerifications', 'systemStatus', 'weeklyDigest'] as const).map(key => (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
              <Switch value={settings[key]} onValueChange={() => toggle(key)} trackColor={{ true: Colors.primaryBlue }} thumbColor={Colors.white} />
            </View>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.screenHorizontal, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: Spacing.md },
  backBtn: { padding: 4 },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  scroll: { flex: 1 },
  content: { padding: Spacing.screenHorizontal, paddingTop: Spacing.lg },
  sectionTitle: { ...Typography.label, color: Colors.textSecondary, marginBottom: Spacing.sm, fontSize: 10 },
  card: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.lg, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: Spacing.cardPadding, borderBottomWidth: 1, borderBottomColor: Colors.border },
  label: { ...Typography.body, color: Colors.textPrimary, textTransform: 'capitalize' },
});
