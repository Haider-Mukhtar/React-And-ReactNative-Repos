import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from "./services/core";  
import globalReducer from "./slices/global";
import themeReducer from "./slices/theme";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const themePersistConfig = {
  key: "theme",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, globalReducer);
const themePersistedReducer = persistReducer(themePersistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    global: persistedReducer,
    theme: themePersistedReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, }).concat(api.middleware),
});

setupListeners(store.dispatch);
void store.dispatch(api.endpoints.healthCheck.initiate({}));

export default store;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;