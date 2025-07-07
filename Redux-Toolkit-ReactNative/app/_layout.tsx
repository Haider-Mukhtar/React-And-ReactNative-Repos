import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/store";
import React, { useEffect, useState } from "react";

function Loading() {
  return <ActivityIndicator size="small" color="#34f" />; // Or return a spinner/loading component
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        <RootLayoutContent />
      </PersistGate>
    </Provider>
  );
}

import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from "react-native";
import { ThemeProvider } from "@/components/theme-context";
import { CustomDarkTheme, CustomLightTheme } from "@/constants/navigation-themes";
import useThemeManager from "@/hooks/useThemeManager";

function RootLayoutContent() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { token } = useSelector((state: RootState) => state.global);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  if (isLoggedIn === null) {
    // Optionally, show a loading indicator here
    return null;
  }

  // Color Theme
  const { colors, effectiveTheme } = useThemeManager();
  const navigationTheme = effectiveTheme === "dark" 
    ? CustomDarkTheme 
    : CustomLightTheme;

  return (
      //@ts-ignore
      <ThemeProvider value={navigationTheme}>
        <Stack screenOptions={{ headerShown: false }} >
          {/* If guard have value true means loggedIn. So, move to Home */}
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(screens)" />
          </Stack.Protected>
          {/* If guard have value false means not loggedIn. So, move to (auth) */}
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
        </Stack>
      </ThemeProvider>
  );
}
