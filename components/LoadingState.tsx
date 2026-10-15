import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface LoadingStateProps {
  message?: string;
  showLogo?: boolean;
}

export default function LoadingState({ message = 'Loading...', showLogo = true }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      {showLogo && (
        <Image
          source={require('../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      )}
      <ActivityIndicator size="small" color={Colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginBottom: 4,
  },
  text: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
});

