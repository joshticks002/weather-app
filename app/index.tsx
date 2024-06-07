import React from "react";
import { Stack, useRouter } from "expo-router";
import Text from "@/components/Text";
import Box from "@/components/Box";
import RootLayer from "@/components/RootLayer/RootLayer";
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SvgIcon } from "@/constants/icons/SvgIcon";
import { SafeAreaView } from "react-native-safe-area-context";

const bgImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg";

const HomeScreen = () => {
  const router = useRouter();

  const handleForecastPress = () => {
    router.push("/forecast");
  };

  return (
    <RootLayer>
      <SafeAreaView edges={[]} style={{ flex: 1 }}>
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

          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Box mb="Ml">
              <SvgIcon color="primary" name="appLogo" size="pspxll" />
            </Box>

            <TouchableOpacity
              onPress={handleForecastPress}
              style={{
                paddingHorizontal: 25,
                paddingVertical: 15,
                borderRadius: 9999,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#ffffff",
                borderWidth: 1,
              }}
            >
              <Text color="white" textAlign="center">
                Weather Forecast
              </Text>
            </TouchableOpacity>
          </Box>
        </ImageBackground>
      </SafeAreaView>
    </RootLayer>
  );
};

export default HomeScreen;
