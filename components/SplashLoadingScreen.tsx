import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import LottieView, { AnimationObject } from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import splashAnimationJson from '../assets/lottie/splash_animation.json';

const splashAnimationData = splashAnimationJson as unknown as AnimationObject;

const { width, height } = Dimensions.get('window');

interface SplashLoadingScreenProps {
  onFinish?: () => void;
  autoNavigate?: boolean;
  durationMs?: number;
}

export default function SplashLoadingScreen({
  onFinish,
  autoNavigate = true,
  durationMs = 6500,
}: SplashLoadingScreenProps) {
  const router = useRouter();
  const lottieRef = useRef<LottieView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  const [showSkip, setShowSkip] = useState(false);

  const handleComplete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      if (onFinish) {
        onFinish();
      } else if (autoNavigate) {
        router.replace('/(tabs)');
      }
    });
  };

  useEffect(() => {
    // Show skip button after 1.5s
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 1500);

    // Auto complete after duration
    const finishTimer = setTimeout(() => {
      handleComplete();
    }, durationMs);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar style="light" />

      {/* Lottie Animation View */}
      <View style={styles.animationWrapper}>
        <LottieView
          ref={lottieRef}
          source={splashAnimationData}
          autoPlay
          loop={false}
          resizeMode="cover"
          style={styles.lottie}
          onAnimationFinish={handleComplete}
        />
      </View>

      {/* Top Skip Button */}
      {showSkip && (
        <Animated.View style={[styles.topBar, { opacity: buttonFadeAnim }]}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.skipText}>Skip</Text>
            <Ionicons name="arrow-forward" size={14} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Bottom Floating Action / Status */}
      <Animated.View style={[styles.bottomContainer, { opacity: buttonFadeAnim }]}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleComplete}
          activeOpacity={0.85}
        >
          <Text style={styles.continueText}>Get Started</Text>
          <Ionicons name="chevron-forward" size={16} color="#024a8d" />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#024a8d',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  animationWrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#024a8d',
  },
  lottie: {
    width: width,
    height: height,
  },
  topBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 40,
    right: 20,
    zIndex: 10,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  skipText: {
    ...Typography.captionBold,
    color: '#ffffff',
    fontSize: 12,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 48 : 32,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 28,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueText: {
    ...Typography.button,
    color: '#024a8d',
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
