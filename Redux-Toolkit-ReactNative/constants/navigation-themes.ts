import { DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from "@react-navigation/native";
import { DarkThemeColors, LightThemeColors } from "./theme-colors";

export const CustomLightTheme = {
  ...NavDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    ...LightThemeColors,
  },
};

export const CustomDarkTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...DarkThemeColors,
  },
};