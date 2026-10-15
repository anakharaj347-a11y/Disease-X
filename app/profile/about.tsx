import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { profileData } from '../../data/profile';

export default function AboutScreen() {
  const router = useRouter();
  const { about } = profileData;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><Ionicons name="arrow-back" size={22} color={Colors.textPrimary} /></TouchableOpacity>
        <Text style={styles.headerTitle}>About DiseaseX</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.logoSection}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.logoCircle}
            resizeMode="contain"
          />
          <Text style={styles.appName}>DiseaseX</Text>
          <Text style={styles.tagline}>Disease Intelligence Platform</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.label}>Version</Text><Text style={styles.value}>{about.appVersion}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Build</Text><Text style={styles.value}>{about.buildNumber}</Text></View>
          <View style={styles.row}><Text style={styles.label}>SDK</Text><Text style={styles.value}>{about.sdkVersion}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Support</Text><Text style={styles.value}>{about.supportEmail}</Text></View>
        </View>
        <Text style={styles.sectionTitle}>ACKNOWLEDGMENTS</Text>
        <View style={styles.card}>
          {about.acknowledgments.map((a, i) => (
            <View key={i} style={styles.ackItem}>
              <Ionicons name="star-outline" size={14} color={Colors.primaryBlue} />
              <Text style={styles.ackText}>{a}</Text>
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
  logoSection: { alignItems: 'center', marginBottom: Spacing.xxl },
  logoCircle: { width: 72, height: 72, borderRadius: 16, marginBottom: Spacing.md },
  appName: { ...Typography.h1, color: Colors.textPrimary },
  tagline: { ...Typography.body, color: Colors.textSecondary },
  card: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, padding: Spacing.cardPadding, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  label: { ...Typography.caption, color: Colors.textSecondary },
  value: { ...Typography.body, color: Colors.textPrimary },
  sectionTitle: { ...Typography.label, color: Colors.textSecondary, marginBottom: Spacing.sm, fontSize: 10 },
  ackItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 10 },
  ackText: { ...Typography.bodySmall, color: Colors.textPrimary, flex: 1 },
});
