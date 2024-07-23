// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  header: "Agriculturae",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeader(state, action: PayloadAction<string>) {
      state.header = action.payload;
    },
  },
});

export const { setHeader } = headerSlice.actions;

export default headerSlice.reducer;
