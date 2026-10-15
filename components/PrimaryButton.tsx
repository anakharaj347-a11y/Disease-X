import React from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { ScalePress } from './Animated';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  loading,
  disabled,
  fullWidth,
}: PrimaryButtonProps) {
  return (
    <ScalePress
      style={[styles.button, disabled && styles.disabled, fullWidth && styles.fullWidth]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </ScalePress>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.buttonPadding,
    paddingHorizontal: 24,
    borderRadius: Spacing.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  disabled: { opacity: 0.45 },
  fullWidth: { width: '100%' },
  text: { ...Typography.button, color: Colors.white },
});
