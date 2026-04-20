"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToast } from "@/hooks/use-toast";

// ================= TYPES =================
type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

type AuthError = {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
};

// ================= HOOK =================
export const useAuth = () => {
  const router = useRouter();
  const { setAuth, user, logout: clearAuth, refreshToken } = useAuthStore();
  const { toast } = useToast();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ================= HELPER =================
  const getErrorMessage = (error: AuthError, fallback: string) => {
    const message = error?.response?.data?.message;
    if (Array.isArray(message)) return message[0];
    return message || fallback;
  };

  const normalize = (res: AuthResponse | { data: AuthResponse }): AuthResponse => {
    return "data" in res ? res.data : res;
  };

  // ================= REGISTER =================
  const registerMutation = useMutation<AuthResponse, AuthError, RegisterPayload>({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Akun berhasil dibuat, silakan login",
      });

      router.replace("/login");
    },

    onError: (error) => {
      toast({
        title: "Register gagal",
        description: getErrorMessage(error, "Terjadi kesalahan saat register"),
        variant: "destructive",
      });
    },
  });

  // ================= LOGIN =================
  const loginMutation = useMutation<AuthResponse, AuthError, LoginPayload>({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      const { access_token, refresh_token, user } = normalize(res);

      setAuth(access_token, refresh_token, user);

      toast({
        title: "Login berhasil",
        description: `Selamat datang, ${user?.name ?? "User"}!`,
      });

      router.replace("/");
    },

    onError: (error) => {
      toast({
        title: "Login gagal",
        description: getErrorMessage(error, "Email atau password salah"),
        variant: "destructive",
      });
    },
  });

  // ================= LOGOUT =================
  const logout = async () => {
    setIsLoggingOut(true);

    try {
      if (refreshToken) {
        await authApi.logout?.(refreshToken);
      }
    } catch {
      // ignore error
    } finally {
      clearAuth();

      toast({
        title: "Logout berhasil",
        description: "Sampai jumpa",
      });

      router.replace("/login");
      setIsLoggingOut(false);
    }
  };

  return {
    user,

    // actions
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    logout,

    // states
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut,
  };
};
