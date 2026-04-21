import { apiClient } from "@/lib/api/client";
import type { User } from "@/lib/types";

// ================= TYPES =================

// Generic API wrapper (sesuai backend)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Payload auth (login & register)
export interface AuthPayload {
  access_token: string;
  refresh_token: string;
  user: User;
}

// Input types
type RegisterInput = {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

type LoginInput = {
  email: string;
  password: string;
};

// ================= API =================

export const authApi = {
  // ---------- REGISTER ----------
  register: (data: RegisterInput) =>
    apiClient
      .post<ApiResponse<AuthPayload>>("/auth/register", data)
      .then((r) => r.data.data),

  // ---------- LOGIN ----------
  login: (data: LoginInput) =>
    apiClient
      .post<ApiResponse<AuthPayload>>("/auth/login", data)
      .then((r) => r.data.data),

  // ---------- GET PROFILE ----------
  me: () =>
    apiClient
      .get<ApiResponse<User>>("/auth/me", {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      .then((r) => r.data.data),

  // ---------- REFRESH TOKEN ----------
  refresh: (refresh_token: string) =>
    apiClient
      .post<{ access_token: string; refresh_token: string }>(
        "/auth/refresh",
        { refresh_token }
      )
      .then((r) => r.data),

  // ---------- LOGOUT ----------
  logout: (refresh_token: string) =>
    apiClient
      .post<{ message: string }>("/auth/logout", { refresh_token })
      .then((r) => r.data),
};