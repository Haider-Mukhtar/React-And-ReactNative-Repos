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

function RootLayoutContent() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { token } = useSelector((state: RootState) => state.global);
  // const [validateToken] = useLazyValidateTokenQuery();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkToken = async () => {
  //     if (token) {
  //       try {
  //         const result = await validateToken().unwrap();
  //         if (!result.valid) {
  //           dispatch(setToken(""));
  //           dispatch(setUser({ id: 0, username: "", email: "", image: "" }));
  //           await AsyncStorage.clear();
  //           setIsLoggedIn(false);
  //         } else {
  //           setIsLoggedIn(true);
  //         }
  //       } catch {
  //         dispatch(setToken(""));
  //         dispatch(setUser({ id: 0, username: "", email: "", image: "" }));
  //         await AsyncStorage.clear();
  //         setIsLoggedIn(false);
  //       }
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   };
  //   checkToken();
  // }, [token]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { token } = useSelector((state: RootState) => state.global);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  if (isLoggedIn === null) {
    // Optionally, show a loading indicator here
    return null;
  }

  return (
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
  );
}
