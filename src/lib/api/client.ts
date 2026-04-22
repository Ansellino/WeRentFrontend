import axios from "axios";
import { useAuthStore } from "@/lib/stores/authStore";

export const apiClient = axios.create({
  // Always use same-origin path in browser; Next.js rewrites proxy this to backend.
  baseURL: "/api",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
