import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';

interface FilterChipsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

/**
 * Horizontal chip scroller fixed outside nested vertical scroll conflicts:
 * - flexGrow: 0 so it never expands into the parent ScrollView
 * - nestedScrollEnabled for Android
 * - directionalLockEnabled for iOS
 */
export default function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        nestedScrollEnabled
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        style={styles.scroll}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, selected === option && styles.chipActive]}
            onPress={() => onSelect(option)}
            activeOpacity={0.75}
          >
            <Text style={[styles.chipText, selected === option && styles.chipTextActive]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 0,
    flexShrink: 0,
  },
  scroll: {
    flexGrow: 0,
  },
  container: {
    paddingHorizontal: Spacing.screenHorizontal,
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.secondaryFill,
    borderWidth: 0,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.white,
  },
});
