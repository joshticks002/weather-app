/* eslint-disable unused-imports/no-unused-vars */
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

import { chevron_back } from "@/assets/svg/chevron_back.svg";
import chevron_down from "@/assets/svg/chevron_down.svg";

import SrfValue from "@/constants/SrfValue";

type IconFunction = React.FC<SvgProps>;

export const ICONS = {
  chevron_back,
  chevron_down,
};

export type IconName = keyof typeof ICONS;
export type IconProps = SvgProps & {
  name: IconName;
  size?: number;
  style?: StyleProp<ViewStyle>;
  stroke?: string;
  outerStroke?: string;
};

/**
 * Custom Icon component based on design systems used in the figma
 */
function Icon({ name, size = 24, style, ...props }: IconProps) {
  const IconImpl: IconFunction = ICONS[name as IconName];
  return IconImpl ? (
    <IconImpl
      height={SrfValue(size)}
      style={style}
      width={SrfValue(size)}
      {...props}
    />
  ) : null;
}

export default Icon;
