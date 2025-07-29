import axios from "axios";
import { getToken } from "../auth"; // Should return the JWT token from localStorage or context

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Request Interceptor to include JWT token
api.interceptors.request.use(
  config => {
    const token = getToken();

    // Skip token for login/register
    if (
      config.url.includes("/api/auth/login") ||
      config.url.includes("/api/auth/register")
    ) {
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Optional: Response Interceptor (for 401 errors or logging out user)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      console.warn("Access denied or session expired.");
      // Optional: redirect to login or logout user
    }
    return Promise.reject(error);
  }
);

export default api;
