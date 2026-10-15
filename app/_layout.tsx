import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'fade',
          animationDuration: 200,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="alerts/index" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="alerts/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="diseases/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="outbreaks/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="clinician/index" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
        <Stack.Screen name="profile/about" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="profile/notifications" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="profile/preferences" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="profile/security" options={{ headerShown: false, animation: 'slide_from_right' }} />
      </Stack>
    </>
  );
}
