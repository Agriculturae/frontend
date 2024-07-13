// src/axiosConfig.ts
import axios from "axios";
import store from "./redux/store";
import { logout } from "./redux/slices/authSlice";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.getState().auth.refreshToken;
      try {
        const response = await axios.post("/auth/refresh-token", {
          token: refreshToken,
        });
        store.dispatch({
          type: "auth/refreshToken",
          payload: response.data.accessToken,
        });
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.accessToken;
        return axiosInstance(originalRequest);
      } catch (error) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
