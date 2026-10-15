import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../../components/ListItem';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { profileData } from '../../data/profile';

export default function PreferencesScreen() {
  const router = useRouter();
  const { preferences } = profileData;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><Ionicons name="arrow-back" size={22} color={Colors.textPrimary} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Preferences</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <ListItem title="Theme" rightText={preferences.theme} showChevron={false} />
          <ListItem title="Language" rightText={preferences.language} showChevron={false} />
          <ListItem title="Default Region" rightText={preferences.defaultRegion} showChevron={false} />
          <ListItem title="Data Refresh Interval" rightText={preferences.dataRefreshInterval} showChevron={false} />
          <ListItem title="Alert Severity Filter" rightText={preferences.alertSeverityFilter} showChevron={false} />
          <ListItem title="Compact View" rightText={preferences.compactView ? 'On' : 'Off'} showChevron={false} borderBottom={false} />
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
  card: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
});
