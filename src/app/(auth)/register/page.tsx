"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToast } from "@/hooks/use-toast";

const schema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Minimal 8 karakter"),
    confirmPassword: z.string(),
    avatarUrl: z.string().url("URL tidak valid").optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

type AuthError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  // ✅ Auth guard tetap jalan
  useEffect(() => {
    if (hasHydrated && user) {
      router.replace("/");
    }
  }, [user, hasHydrated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.register,

    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Akun berhasil dibuat, silakan login",
      });

      router.replace("/login");
    },

    onError: (error: AuthError) => {
      toast({
        title: "Register gagal",
        description: error?.response?.data?.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutate({
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password,
      avatarUrl: data.avatarUrl || undefined,
    });
  };

  // ✅ Prevent flicker
  if (!hasHydrated) return null;

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* ================= LEFT (BRANDING) ================= */}
      <div className="hidden md:flex flex-col justify-center bg-green-700 text-white p-12 relative overflow-hidden">
        {/* Blur decoration */}
        <div className="absolute w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-30 top-10 left-10" />
        <div className="absolute w-72 h-72 bg-green-900 rounded-full blur-3xl opacity-30 bottom-10 right-10" />

        <div className="relative z-10 space-y-6 max-w-md">
          <p className="text-sm bg-white/10 inline-block px-3 py-1 rounded-full">We Rent, We Return, We Repeat</p>

          <h1 className="text-4xl font-bold leading-tight">Start Your Fashion Journey</h1>

          <p className="text-white/80">Rent premium outfits, manage bookings, and return with ease — all in one platform.</p>

          <div className="space-y-2 text-sm text-white/90">
            <p>✔ Curated premium collections</p>
            <p>✔ Flexible rental dates</p>
            <p>✔ Easy return system</p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT (FORM) ================= */}
      <div className="flex items-center justify-center bg-[#f3f7f5] px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100">
          {/* Header */}
          <div className="text-center space-y-2">
            <p className="text-xs bg-green-100 text-green-700 inline-block px-3 py-1 rounded-full font-medium">Join WeRent</p>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-sm text-gray-500">Start renting today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input placeholder="Full Name" {...register("name")} className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input placeholder="Email" {...register("email")} className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input type="password" placeholder="Password" {...register("password")} className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <input placeholder="Avatar URL (optional)" {...register("avatarUrl")} className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <button type="submit" disabled={isPending} className="w-full h-11 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition">
              {isPending ? "Registering..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-green-700 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
