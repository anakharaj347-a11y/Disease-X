import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { ScalePress } from './Animated';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  leftIconColor?: string;
  rightText?: string;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
  borderBottom?: boolean;
}

export default function ListItem({
  title,
  subtitle,
  leftIcon,
  leftIconColor = Colors.primary,
  rightText,
  rightElement,
  showChevron = true,
  onPress,
  borderBottom = true,
}: ListItemProps) {
  return (
    <ScalePress
      style={[styles.container, borderBottom && styles.borderBottom]}
      onPress={onPress}
      disabled={!onPress}
      scaleTo={0.99}
    >
      {leftIcon && (
        <View style={[styles.iconContainer, { backgroundColor: leftIconColor + '18' }]}>
          <Ionicons name={leftIcon} size={20} color={leftIconColor} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightText && <Text style={styles.rightText}>{rightText}</Text>}
      {rightElement}
      {showChevron && onPress && (
        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
      )}
    </ScalePress>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.cardPadding,
    gap: Spacing.md,
    backgroundColor: Colors.card,
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.bodySmall,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  rightText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
  },
});
