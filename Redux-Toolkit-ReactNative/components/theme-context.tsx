import React, { createContext, useContext } from "react";
import useThemeManager from "@/hooks/useThemeManager";

export const ThemeContext = createContext<ReturnType<typeof useThemeManager> | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeManager();
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}