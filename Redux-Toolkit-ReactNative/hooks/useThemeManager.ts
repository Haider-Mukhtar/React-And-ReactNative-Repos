import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { DarkThemeColors, LightThemeColors } from "../constants/theme-colors";

export default function useThemeManager() {
  const systemTheme = useColorScheme();
  const storedTheme = useSelector((state: RootState) => state.theme.theme);
  
  // Determine effective theme (light/dark)
  const effectiveTheme: "light" | "dark" = 
    storedTheme === "system" 
      ? systemTheme || "light" 
      : storedTheme;

  // Get corresponding color palette
  const colors = effectiveTheme === "dark" 
    ? DarkThemeColors 
    : LightThemeColors;

  return {
    colors,
    effectiveTheme,
    storedTheme,
    isDarkMode: effectiveTheme === "dark",
  };
}