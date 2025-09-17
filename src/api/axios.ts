import axios from "axios";
import { getToken } from "../services/authService";

const api = axios.create({
  baseURL: "https://localhost:7188/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
