// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  business: BusinessModel | null;
} = {
  business: null,
};
const authSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusiness(state, action: PayloadAction<BusinessModel>) {
      state.business = action.payload;
    },
    clearBusiness(state) {
      state.business = null;
    },
  },
});

export const { setBusiness, clearBusiness } = authSlice.actions;

export default authSlice.reducer;
