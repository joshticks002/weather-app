import { SvgIcon } from "@/constants/icons/SvgIcon";
import Box from "@/components/Box";
import Pressable from "@/components/Pressable";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";

export type LayoutProps = {
  canGoBack?: boolean;
  children?: JSX.Element | JSX.Element[];
  handleBackPress?: () => void;
  title?: string;
};

export default function MainLayout({
  canGoBack,
  children,
  handleBackPress,
  title,
}: LayoutProps) {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Box
        backgroundColor="white"
        flex={1}
        justifyContent="center"
        paddingBottom="sm"
        paddingHorizontal="lg"
        paddingTop="md"
      >
        <Box paddingVertical="xs">
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <SvgIcon color="primary" name="appLogo" size="pspxll" />
          </Box>
          {canGoBack && (
            <Pressable
              alignItems="center"
              flexDirection="row"
              onPress={handleBackPress}
              paddingHorizontal="sml"
              top={-10}
            >
              <Icon
                name="chevron_back"
                size={12}
                style={{
                  marginRight: 8,
                }}
              />
              <Text variant="regular14">{title ?? "Go back"}</Text>
            </Pressable>
          )}
        </Box>
        <Box flex={1}>{children}</Box>
      </Box>
    </SafeAreaView>
  );
}
