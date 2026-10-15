import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBadge from '../../components/StatusBadge';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { profileData } from '../../data/profile';

export default function SecurityScreen() {
  const router = useRouter();
  const { security } = profileData;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><Ionicons name="arrow-back" size={22} color={Colors.textPrimary} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.label}>Two-Factor Auth</Text><StatusBadge status={security.twoFactorEnabled ? 'Active' : 'Inactive'} /></View>
          <View style={styles.row}><Text style={styles.label}>Last Password Change</Text><Text style={styles.value}>{security.lastPasswordChange}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Active Sessions</Text><Text style={styles.value}>{security.activeSessions}</Text></View>
        </View>
        <Text style={styles.sectionTitle}>LOGIN HISTORY</Text>
        {security.loginHistory.map((l, i) => (
          <View key={i} style={styles.loginCard}>
            <View style={styles.loginHeader}>
              <Text style={styles.loginDevice}>{l.device}</Text>
              <StatusBadge status={l.status === 'Success' ? 'Verified' : 'Failed'} />
            </View>
            <Text style={styles.loginMeta}>{l.location} · {new Date(l.timestamp).toLocaleString()}</Text>
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
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  scroll: { flex: 1 },
  content: { padding: Spacing.screenHorizontal, paddingTop: Spacing.lg },
  card: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  label: { ...Typography.body, color: Colors.textSecondary },
  value: { ...Typography.subtitle, color: Colors.textPrimary },
  sectionTitle: { ...Typography.label, color: Colors.textSecondary, marginBottom: Spacing.sm, marginTop: Spacing.md, fontSize: 10 },
  loginCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadiusSm, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.sm },
  loginHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  loginDevice: { ...Typography.subtitle, color: Colors.textPrimary },
  loginMeta: { ...Typography.caption, color: Colors.textMuted },
});
