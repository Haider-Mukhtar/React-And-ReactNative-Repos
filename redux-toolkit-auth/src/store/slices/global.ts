import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  token: "",
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: "",
  }
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload as string;
    },
    setUser: (state, action) => {
      state.user = action.payload as User;
      // Object.assign(state.user, action.payload as User);
    },
  },
});

export const { setToken, setUser } = globalSlice.actions;
export default globalSlice.reducer;