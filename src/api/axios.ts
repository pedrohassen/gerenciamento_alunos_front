import axios from "axios";
import { getToken, logout } from "../services/authService";
import router from "../router";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/login");
    if (error.response?.status === 401 && !isLoginRequest) {
      logout();
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
