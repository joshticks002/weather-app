import React from "react";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider } from "@shopify/restyle";
import theme from "@/constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";

type LayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

const RootLayer = ({ children }: LayoutProps) => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Animated.View style={{ flex: 1 }} entering={FadeIn}>
            {children}
          </Animated.View>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default RootLayer;
