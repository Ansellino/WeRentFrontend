"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToast } from "@/hooks/use-toast";

type AuthError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export const useAuth = () => {
  const router = useRouter();
  const { setAuth, user, logout: clearAuth } = useAuthStore();
  const { toast } = useToast();

  // ================= REGISTER =================
  const registerMutation = useMutation({
    mutationFn: authApi.register,

    onSuccess: (res) => {
      const { access_token, refresh_token, user } = res.data;

      setAuth(access_token, refresh_token, user);

      toast({
        title: "Berhasil",
        description: "Akun berhasil dibuat",
      });

      router.push("/dashboard");
    },

    onError: (error: AuthError) => {
      toast({
        title: "Register gagal",
        description:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat register",
        variant: "destructive",
      });
    },
  });

  // ================= LOGIN =================
  const loginMutation = useMutation({
    mutationFn: authApi.login,

    onSuccess: (res) => {
      const { access_token, refresh_token, user } = res.data;

      setAuth(access_token, refresh_token, user);

      toast({
        title: "Login berhasil",
        description: "Selamat datang 👋",
      });

      router.push("/dashboard");
    },

    onError: (error: AuthError) => {
      toast({
        title: "Login gagal",
        description:
          error?.response?.data?.message ||
          "Email atau password salah",
        variant: "destructive",
      });
    },
  });

  const logout = () => {
    clearAuth();

    toast({
      title: "Logout berhasil",
      description: "Sampai jumpa 👋",
    });

    router.push("/login");
  };

  return {
    user,
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    logout,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
  };
};