import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { Typography } from '../constants/typography';
import { Config } from '../constants/config';
import { getUnreadAlertCount } from '../data/alerts';
import { ScalePress } from './Animated';

interface AppHeaderProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  title?: string;
}

export default function AppHeader({ selectedLocation, onLocationChange, title }: AppHeaderProps) {
  const router = useRouter();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const unreadCount = getUnreadAlertCount();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brandBlock}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.brand}>{Config.appName}</Text>
            {title ? <Text style={styles.screenTitle}>{title}</Text> : null}
          </View>
        </View>

        <ScalePress style={styles.locationButton} onPress={() => setShowLocationModal(true)}>
          <Ionicons name="location" size={14} color={Colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {selectedLocation}
          </Text>
          <Ionicons name="chevron-down" size={14} color={Colors.textMuted} />
        </ScalePress>

        <ScalePress style={styles.iconButton} onPress={() => router.push('/alerts')}>
          <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </ScalePress>
      </View>

      <Modal
        visible={showLocationModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowLocationModal(false)}>
          <Animated.View entering={SlideInDown.duration(280)} style={styles.modalContent}>
            <View style={styles.handle} />
            <Text style={styles.modalTitle}>Select Location</Text>
            <Text style={styles.modalSubtitle}>Demo surveillance regions</Text>
            {Config.locations.map((loc) => {
              const active = selectedLocation === loc.name;
              return (
                <TouchableOpacity
                  key={loc.name}
                  style={[styles.locationOption, active && styles.locationOptionActive]}
                  onPress={() => {
                    onLocationChange(loc.name);
                    setShowLocationModal(false);
                  }}
                >
                  <Ionicons
                    name={active ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={active ? Colors.primary : Colors.textMuted}
                  />
                  <Text style={[styles.locationOptionText, active && styles.locationOptionTextActive]}>
                    {loc.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingBottom: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: Spacing.xs,
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  brand: {
    ...Typography.h3,
    color: Colors.primary,
    letterSpacing: -0.3,
  },
  screenTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.separator,
  },
  locationText: {
    ...Typography.captionBold,
    color: Colors.textPrimary,
    flex: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.separator,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.critical,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    color: Colors.white,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.xl,
    paddingBottom: 40,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.secondaryFill,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  modalSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.cardRadiusSm,
  },
  locationOptionActive: {
    backgroundColor: Colors.primaryLight,
  },
  locationOptionText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
  locationOptionTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
