import { createTheme, useTheme as useRestyleTheme } from "@shopify/restyle";

import SrfValue from "../SrfValue";

export const palette = {
  agricultureGreen: "rgba(70, 158, 142, 1)",
  bankReceivedGreen: "#03B146",
  black: "#101818",
  blackTint: "#696977",
  blue: "#3878B8",
  cardSecondary: "#EFEFEF",
  darkPurple: "#7B46CC",
  error: "#E25825",
  grey: "#C1C7CF",
  lightGrey: "rgba(245, 245, 245, 1)",
  negativeColor: "#E70011",
  primary: "rgba(0, 136, 204, 1)",
  primaryGreen: "#2EAF7D",
  primaryGrey: "#FCFCFF",
  primaryPurple: "#7B46CD",
  primarySky: "#001D3D",
  purple: "rgba(35, 0, 83, 1)",
  red: "rgba(227, 30, 36, 1)",
  secondary: "#878681",
  secondaryGrey: "#A6A6AA",
  success: "#00A067",
  transparent: "transparent",
  warning: "#D1A000",
  white: "#FBFBFB",
  whiteColor: "#ffffff",
  yellow: "#F2C948",
};

export type PaletteType = keyof typeof palette;

const theme = createTheme({
  borderRadii: {
    lg: SrfValue(32),
    md: SrfValue(16),
    none: 0,
    sl: SrfValue(20),
    sm: SrfValue(8),
    smd: SrfValue(6),
    sml: SrfValue(24),
    smm: SrfValue(10),
    xl: SrfValue(64),
    xs: SrfValue(4),
    xxl: SrfValue(100),
  },

  breakpoints: {
    bigscreen: 412,
    phone: 0,
    tablet: 768,
  },
  colors: {
    ...palette,
    blockBg: palette.grey,
    buttonPry: palette.primary,
    mainBackground: palette.white,
    textColor: palette.black,
    textColorTint: palette.blackTint,
    whiteColor: palette.whiteColor,
  },
  iconSizes: {
    default: {},
    lg: {
      height: SrfValue(32),
      width: SrfValue(32),
    },
    "logo-iconsize": {
      height: SrfValue(40),
      width: SrfValue(40),
    },
    m: {
      height: SrfValue(12),
      width: SrfValue(12),
    },
    md: {
      height: SrfValue(24),
      width: SrfValue(24),
    },
    mm: {
      height: SrfValue(16),
      width: SrfValue(17),
    },
    pspxl: {
      height: SrfValue(80),
      width: SrfValue(80),
    },
    pspxll: {
      height: SrfValue(90),
      width: SrfValue(100),
    },
    s: {
      height: SrfValue(4),
      width: SrfValue(4),
    },
    sm: {
      height: SrfValue(16),
      width: SrfValue(16),
    },
    sml: {
      height: SrfValue(20),
      width: SrfValue(20),
    },
    xl: {
      height: SrfValue(48),
      width: SrfValue(48),
    },
    xll: {
      height: SrfValue(32),
      width: SrfValue(99),
    },

    xlll: {
      height: SrfValue(38),
      width: SrfValue(140),
    },
    xs: {
      height: SrfValue(8),
      width: SrfValue(8),
    },
    xsl: {
      height: SrfValue(108),
      width: SrfValue(120),
    },
    xxl: {
      height: SrfValue(60),
      width: SrfValue(60),
    },
    xxxl: {
      height: SrfValue(138),
      width: SrfValue(180),
    },
    xxxxl: {
      height: SrfValue(183),
      width: SrfValue(157),
    },
  },
  spacing: {
    Ml: SrfValue(60), // mega large
    lg: SrfValue(24), // large
    md: SrfValue(16), // medium
    sl: SrfValue(20), // semi large
    sm: SrfValue(12), // semi medium
    sml: SrfValue(8), // small
    xl: SrfValue(32), // extra large
    xs: SrfValue(4), // extra small
    xxl: SrfValue(40), // extra extra large
    xxs: SrfValue(2), // extra extra small
  },
  textVariants: {
    bigSubHeading: {
      color: "textColor",
      fontSize: SrfValue(20),
      fontWeight: "600",
    },
    body: {
      color: "textColorTint",
      fontSize: SrfValue(14),
      fontWeight: "400",
      lineHeight: SrfValue(20),
    },
    bold10: {
      color: "darkGrey",
      fontSize: SrfValue(10),
      fontWeight: "800",
      lineHeight: SrfValue(16),
    },
    bold12: {
      color: "darkGrey",
      fontSize: SrfValue(12),
      fontWeight: "800",
      lineHeight: SrfValue(16),
    },
    bold14: {
      fontSize: SrfValue(14),
      fontWeight: "800",
    },
    bold16: {
      fontSize: SrfValue(16),
      fontWeight: "800",
    },
    bold18: {
      color: "textColor",
      fontSize: SrfValue(18),
      fontWeight: "800",
    },
    bold20: {
      color: "textColor",
      fontSize: SrfValue(20),
      fontWeight: "800",
    },
    bold22: {
      fontSize: SrfValue(22),
      fontWeight: "800",
    },
    bold24: {
      fontSize: SrfValue(24),
      fontWeight: "800",
    },
    bold32: {
      fontSize: SrfValue(32),
      fontWeight: "800",
    },
    bold48: {
      fontSize: SrfValue(48),
      fontWeight: "800",
    },
    bold8: {
      color: "darkGrey",
      fontSize: SrfValue(8),
      fontWeight: "700",
      lineHeight: SrfValue(16),
    },
    boldBody: {
      color: "textColorTint",
      fontSize: SrfValue(16),
      fontWeight: "600",
      lineHeight: SrfValue(20),
    },
    button: {
      color: "mainBackground",
      fontSize: SrfValue(18),
      fontWeight: "600",
      lineHeight: SrfValue(22),
    },
    defaults: {
      color: "black",
      fontSize: SrfValue(14),
    },
    header: {
      color: "textColor",
      fontSize: SrfValue(24),
      fontWeight: "600",
      lineHeight: SrfValue(40),
    },
    medium: {
      color: "mainBackground",
      fontSize: SrfValue(16),
      fontWeight: "400",
      lineHeight: SrfValue(20),
    },
    medium10: {
      fontSize: SrfValue(10),
      fontWeight: "600",
    },
    medium12: {
      color: "textColor",
      fontSize: SrfValue(12),
      fontWeight: "600",
    },
    medium14: {
      fontSize: SrfValue(14),
      fontWeight: "700",
    },
    medium16: {
      color: "textColor",
      fontSize: SrfValue(16),
      fontWeight: "700",
      lineHeight: SrfValue(20),
    },
    medium18: {
      fontSize: SrfValue(18),
      fontWeight: "700",
    },
    medium22: {
      fontSize: SrfValue(22),
      fontWeight: "700",
    },
    medium8: {
      fontSize: SrfValue(8),
      fontWeight: "600",
    },
    regular10: {
      fontSize: SrfValue(10),
      fontWeight: "400",
      lineHeight: SrfValue(16),
    },
    regular12: {
      fontSize: SrfValue(12),
      fontWeight: "400",
      lineHeight: SrfValue(16),
    },
    regular14: {
      color: "textColor",
      fontSize: SrfValue(14),
      fontWeight: "400",
      lineHeight: SrfValue(16),
    },
    regular16: {
      color: "textColor",
      fontSize: SrfValue(16),
      fontWeight: "400",
      lineHeight: SrfValue(20),
    },
    regular18: {
      color: "textColor",
      fontSize: SrfValue(18),
      fontWeight: "400",
      lineHeight: SrfValue(18),
    },
    regular22: {
      color: "textColor",
      fontSize: SrfValue(22),
      fontWeight: "400",
      lineHeight: SrfValue(22),
    },
    regular24: {
      color: "textColor",
      fontSize: SrfValue(24),
      fontWeight: "400",
      lineHeight: SrfValue(28),
    },
    regular8: {
      fontSize: SrfValue(8),
      fontWeight: "400",
    },
    regular9: {
      fontSize: SrfValue(9),
      fontWeight: "400",
      lineHeight: SrfValue(16),
    },
    subHeading: {
      color: "textColor",
      fontSize: SrfValue(18),
      fontWeight: "600",
      lineHeight: SrfValue(21),
    },
  },
});

export type Theme = typeof theme;

export const useTheme = () => useRestyleTheme<Theme>();

export default theme;
