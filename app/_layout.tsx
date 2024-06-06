import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  useFonts,
  Inter_900Black,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold,
} from "@expo-google-fonts/amatic-sc";

import Animated, { FadeIn } from "react-native-reanimated";
import { ThemeProvider } from "@shopify/restyle";
import theme from "@/constants/theme";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black,

    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setAppReady(true);
    }
  }, [fontsLoaded, fontError]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Animated.View style={{ flex: 1 }} entering={FadeIn}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" options={{ title: "Updated" }} />
            </Stack>
          </Animated.View>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
