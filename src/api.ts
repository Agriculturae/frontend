import axios from "axios";
import store from "./redux/store";
import { logout } from "./redux/slices/authSlice";

const api = axios.create({
  baseURL: "https://api.agriculturae.com", // Backend API base URL
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // If the user is unauthorized, log them out
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;
