import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

function TabIcon({
  name,
  focused,
  color,
}: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  color: string | undefined;
}) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
      <Ionicons name={name} size={22} color={color ?? Colors.tabInactive} />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          styles.tabBar,
          {
            height: Spacing.tabBarHeight + bottomPad * 0.35,
            paddingBottom: bottomPad * 0.35,
            marginBottom: Spacing.tabBarFloatBottom + Math.max(insets.bottom - 8, 0),
          },
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'home' : 'home-outline'}
              focused={focused}
              color={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="outbreaks"
        options={{
          title: 'Outbreaks',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'pulse' : 'pulse-outline'}
              focused={focused}
              color={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="diseases"
        options={{
          title: 'Diseases',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'medkit' : 'medkit-outline'}
              focused={focused}
              color={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="symptom-ai"
        options={{
          title: 'Symptom AI',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'sparkles' : 'sparkles-outline'}
              focused={focused}
              color={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'person' : 'person-outline'}
              focused={focused}
              color={String(color)}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: Spacing.tabBarFloatMargin,
    right: Spacing.tabBarFloatMargin,
    backgroundColor: Colors.tabBar,
    borderRadius: 28,
    borderTopWidth: 0,
    height: Spacing.tabBarHeight,
    paddingTop: 6,
    elevation: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.separator,
    ...Platform.select({
      android: { overflow: 'hidden' as const },
      default: {},
    }),
  },
  tabLabel: {
    ...Typography.tabLabel,
    marginTop: 0,
    marginBottom: 2,
  },
  tabItem: {
    gap: 0,
  },
  iconWrapper: {
    width: 40,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: Colors.tabActiveBackground,
  },
});
