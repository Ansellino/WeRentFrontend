import { apiClient } from "@/lib/api/client";
import type { User } from "@/lib/types";

// ================= TYPES =================

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
  // ================= Update AvatarUrl =================
  updateAvatarUrl: (avatarUrl: string) =>
    apiClient
      .put<User>("/auth/update-avatar", { avatarUrl })
      .then((r) => r.data),

  // ---------- REGISTER ----------
  register: (data: RegisterInput) =>
    apiClient.post<AuthPayload>("/auth/register", data).then((r) => r.data),

  // ---------- LOGIN ----------
  login: (data: LoginInput) =>
    apiClient.post<AuthPayload>("/auth/login", data).then((r) => r.data),

  // ---------- GET PROFILE ----------
  me: () =>
    apiClient
      .get<User>("/auth/me", {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      .then((r) => r.data),

  // ---------- REFRESH TOKEN ----------
  refresh: (refresh_token: string) =>
    apiClient
      .post<{
        access_token: string;
        refresh_token: string;
      }>("/auth/refresh", { refresh_token })
      .then((r) => r.data),

  // ---------- LOGOUT ----------
  logout: (refresh_token: string) =>
    apiClient
      .post<{ message: string }>("/auth/logout", { refresh_token })
      .then((r) => r.data),
};
