// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserModel | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  role: null,
};

interface LoginPayload {
  user: UserModel;
  accessToken: string;
  refreshToken: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.user.type;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
    },
    updateUser(state, action: PayloadAction<UserModel>) {
      state.user = action.payload;
    },
    refreshAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, updateUser, refreshAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
