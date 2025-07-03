import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  todo: {
    id: "",
    title: "",
    description: "",
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload as typeof state.todo;
    }
    // setVapiId: (state, action) => {
    //   state.vapiId = action.payload as string;
    // },
    // setToken: (state, action) => {
    //   state.token = action.payload as string;
    // },
    // setBusiness: (state, action) => {
    //   state.business = action.payload as typeof state.business;
    // },
    // setTwilioNumber: (state, action) => {
    //   state.twilioNumber = action.payload as string;
    // },
  },
});

// export const { setToken, setVapiId, setBusiness, setTwilioNumber } =
export const { setTodo } =
  globalSlice.actions;
export default globalSlice.reducer;