import React from "react";
import { Link, Stack } from "expo-router";
import MarkdownDisplay from "@/components/MarkdownDisplay";
import MainLayout from "@/components/Layout/MainLayout";
import Text from "@/components/Text";
import Box from "@/components/Box";
import RootLayer from "@/components/RootLayer/RootLayer";
import { Image, ImageBackground, View, StyleSheet } from "react-native";
import SrfValue from "@/constants/SrfValue";

const bgImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg";

const HomeScreen = () => {
  return (
    <RootLayer>
      <MainLayout title="Weather Forecast">
        <Stack.Screen options={{ headerShown: false }} />
        <ImageBackground
          source={{ uri: bgImage }}
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <Box mt="lg" paddingHorizontal="lg">
            <Text color="white" variant="bigSubHeading">
              Weather Forecast
            </Text>
          </Box>
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Image
              source={require("@/assets/images/weather.png")}
              style={{ width: 280, height: 480, marginRight: SrfValue(30) }}
              resizeMode="contain"
            />
            <Link
              href="/forecast"
              style={{
                backgroundColor: "#B397FD",
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text color="white" textAlign="center">
                Check weather
              </Text>
            </Link>
          </Box>
        </ImageBackground>
      </MainLayout>
    </RootLayer>
  );
};

export default HomeScreen;
