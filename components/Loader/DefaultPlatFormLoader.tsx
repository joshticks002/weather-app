/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Text, { TextProps } from "../Text";
import { SafeAreaViewProps } from "../SafeAreaView";

type DefaultPlatformLoaderProps = SafeAreaViewProps & {
  text?: string;
  textColor?: TextProps;
  visible: boolean;
  size: "small" | "large";
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999_999_999_999_999,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default function DefaultPlatformLoader(
  props: DefaultPlatformLoaderProps,
) {
  const {
    text = "Please hold on, it may take a while",
    textColor,
    visible,
    size = "small",
  } = props;
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (visible) {
      timeoutId = setTimeout(() => {
        setShowText(true);
      }, 3000);
    } else {
      setShowText(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  return (
    <>
      {visible && (
        <View style={styles.container}>
          <ActivityIndicator animating color="#FFFFFF" size={size} />
          {showText && (
            <Animatable.Text
              animation="zoomIn"
              iterationCount="infinite"
              iterationDelay={50}
              style={{
                marginVertical: 16,
                paddingVertical: 20,
                marginTop: 35,
              }}
            >
              <Text
                marginVertical="md"
                variant="medium16"
                {...textColor}
                color="white"
              >
                {text}
              </Text>
            </Animatable.Text>
          )}
        </View>
      )}
    </>
  );
}
