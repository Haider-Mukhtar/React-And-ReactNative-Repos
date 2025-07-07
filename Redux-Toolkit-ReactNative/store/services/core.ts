import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import { router } from "expo-router";
import Toast from 'react-native-toast-message';
import { ToastAndroid } from "react-native";

import type { RootState } from "..";

const chefQailoBaseUrl = Constants.expoConfig?.extra?.EXPO_CHEF_QAILO_BASE_URL as string;

const baseQuery = fetchBaseQuery({
  baseUrl: chefQailoBaseUrl,
  // prepareHeaders: (headers) => {
  //   headers.set("Content-Type", "application/json");
  // },
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).global.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});

const baseQueryWith401Handling: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 403) {
    await AsyncStorage.clear();
    router.replace("/");
    ToastAndroid.show(`${result.error?.status}`, ToastAndroid.SHORT);
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWith401Handling,
  keepUnusedDataFor: 5,
  tagTypes: [
    "Shoppings",
  ],
  endpoints: (build) => ({
    healthCheck: build.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      transformResponse: (response: HealthCheck) => response,
    }),
  }),
});