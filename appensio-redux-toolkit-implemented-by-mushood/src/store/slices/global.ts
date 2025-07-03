import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  token: "",
  vapiId: "",
  business: {
    id: "",
    name: "",
    phone: "",
    country: "",
    industry: "",
  },
  twilioNumber: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setVapiId: (state, action) => {
      state.vapiId = action.payload as string;
    },
    setToken: (state, action) => {
      state.token = action.payload as string;
    },
    setBusiness: (state, action) => {
      state.business = action.payload as typeof state.business;
    },
    setTwilioNumber: (state, action) => {
      state.twilioNumber = action.payload as string;
    },
  },
});

export const { setToken, setVapiId, setBusiness, setTwilioNumber } =
  globalSlice.actions;
export default globalSlice.reducer;
