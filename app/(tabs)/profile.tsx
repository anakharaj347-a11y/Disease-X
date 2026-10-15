import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import ListItem from '../../components/ListItem';
import { FadeIn } from '../../components/Animated';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { profileData } from '../../data/profile';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = profileData;

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces
      >
        <FadeIn>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={Colors.white} />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.role}>{user.role}</Text>
            <Text style={styles.department}>{user.department}</Text>
            <View style={styles.idBadge}>
              <Ionicons name="id-card-outline" size={14} color={Colors.primary} />
              <Text style={styles.idText}>{user.registrationId}</Text>
            </View>
          </View>
        </FadeIn>

        <FadeIn index={1}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT</Text>
            <View style={styles.sectionCard}>
              <ListItem
                title="Security"
                subtitle="Password, 2FA, sessions"
                leftIcon="lock-closed-outline"
                onPress={() => router.push('/profile/security')}
              />
              <ListItem
                title="Notifications"
                subtitle="Alert preferences"
                leftIcon="notifications-outline"
                onPress={() => router.push('/profile/notifications')}
              />
              <ListItem
                title="Preferences"
                subtitle="Theme, language, region"
                leftIcon="settings-outline"
                onPress={() => router.push('/profile/preferences')}
                borderBottom={false}
              />
            </View>
          </View>
        </FadeIn>

        <FadeIn index={2}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WORKSPACE</Text>
            <View style={styles.sectionCard}>
              <ListItem
                title="Clinician Security Hub"
                subtitle="Telemetry, ledger, vault"
                leftIcon="shield-checkmark-outline"
                leftIconColor={Colors.primaryNavy}
                onPress={() => router.push('/clinician')}
              />
              <ListItem
                title="Alerts"
                subtitle="View all alerts"
                leftIcon="warning-outline"
                leftIconColor={Colors.warning}
                onPress={() => router.push('/alerts')}
                borderBottom={false}
              />
            </View>
          </View>
        </FadeIn>

        <FadeIn index={3}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INFORMATION</Text>
            <View style={styles.sectionCard}>
              <ListItem
                title="About DiseaseX"
                subtitle="Version, licenses, acknowledgments"
                leftIcon="information-circle-outline"
                onPress={() => router.push('/profile/about')}
                borderBottom={false}
              />
            </View>
          </View>
        </FadeIn>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{user.facility}</Text>
          <Text style={styles.footerVersion}>DiseaseX v{profileData.about.appVersion}</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.scrollBottomInset },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    marginHorizontal: Spacing.screenHorizontal,
    marginTop: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadiusLg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  name: { ...Typography.h2, color: Colors.textPrimary },
  role: { ...Typography.bodySmall, color: Colors.primary, marginTop: 2, fontWeight: '600' },
  department: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.md,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  idText: { ...Typography.captionBold, color: Colors.primary },
  section: { marginTop: Spacing.xl, paddingHorizontal: Spacing.screenHorizontal },
  sectionTitle: {
    ...Typography.label,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    fontSize: 11,
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  footer: { alignItems: 'center', marginTop: Spacing.xxxl, paddingBottom: Spacing.xl },
  footerText: { ...Typography.caption, color: Colors.textMuted },
  footerVersion: { ...Typography.caption, color: Colors.textMuted, marginTop: 4 },
});
