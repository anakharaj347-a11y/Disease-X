import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { ScalePress } from './Animated';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function SecondaryButton({
  title,
  onPress,
  disabled,
  fullWidth,
}: SecondaryButtonProps) {
  return (
    <ScalePress
      style={[styles.button, disabled && styles.disabled, fullWidth && styles.fullWidth]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </ScalePress>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: Spacing.buttonPadding,
    paddingHorizontal: 24,
    borderRadius: Spacing.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  disabled: { opacity: 0.5 },
  fullWidth: { width: '100%' },
  text: { ...Typography.button, color: Colors.primary },
});
