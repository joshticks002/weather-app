import React from "react";
import { Link, Stack } from "expo-router";
import MarkdownDisplay from "@/components/MarkdownDisplay";
import { SafeAreaView } from "react-native-safe-area-context";
import MainLayout from "@/components/Layout/MainLayout";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider } from "@shopify/restyle";
import theme from "@/constants/theme";
import Animated, { FadeIn } from "react-native-reanimated";
import Text from "@/components/Text";
import Box from "@/components/Box";

const description = `
# Weather app
Fetch weather data and display it`;

const HomeScreen = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Animated.View style={{ flex: 1 }} entering={FadeIn}>
            <MainLayout>
              <Stack.Screen options={{ headerShown: false }} />
              <MarkdownDisplay>{description}</MarkdownDisplay>
              <Box
                alignItems="center"
                justifyContent="center"
                width="100%"
                backgroundColor="white"
              >
                <Link
                  href="/forecast"
                  style={{
                    backgroundColor: "blue",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text color="white" textAlign="center">
                    Go to Weather app right now
                  </Text>
                </Link>
              </Box>
            </MainLayout>
          </Animated.View>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default HomeScreen;
