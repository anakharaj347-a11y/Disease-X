import React, { useEffect } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  FadeIn as ReanimatedFadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  index?: number;
  style?: StyleProp<ViewStyle>;
  direction?: 'up' | 'down';
}

/** Soft opacity fade only — no bounce / slide jiggle */
export function FadeIn({ children, delay = 0, index = 0, style }: FadeInProps) {
  return (
    <Animated.View
      entering={ReanimatedFadeIn.duration(220).delay(delay + index * 30).easing(Easing.out(Easing.quad))}
      style={style}
    >
      {children}
    </Animated.View>
  );
}

interface ScalePressProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
}

/** Light press feedback — timed, not springy */
export function ScalePress({
  children,
  style,
  scaleTo = 0.985,
  onPressIn,
  onPressOut,
  ...rest
}: ScalePressProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      {...rest}
      style={[style, animatedStyle]}
      onPressIn={(e) => {
        scale.value = withTiming(scaleTo, { duration: 90, easing: Easing.out(Easing.quad) });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withTiming(1, { duration: 120, easing: Easing.out(Easing.quad) });
        onPressOut?.(e);
      }}
    >
      {children}
    </AnimatedPressable>
  );
}

interface PulseDotProps {
  color: string;
  size?: number;
}

/** Gentle opacity pulse — no expanding ring shake */
export function PulseDot({ color, size = 8 }: PulseDotProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [progress]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0.45]),
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        dotStyle,
      ]}
    />
  );
}
