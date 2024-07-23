// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  farm: FarmModel | null;
} = {
  farm: null,
};
const authSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    setFarm(state, action: PayloadAction<FarmModel>) {
      state.farm = action.payload;
    },
    clearFarm(state) {
      state.farm = null;
    },
  },
});

export const { setFarm, clearFarm } = authSlice.actions;

export default authSlice.reducer;
