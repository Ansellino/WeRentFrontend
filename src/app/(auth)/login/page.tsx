"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/stores/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ================= SCHEMA =================
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
});

type FormData = z.infer<typeof schema>;

// ================= PAGE =================
export default function LoginPage() {
  const { login, isLoggingIn, user } = useAuth();
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const router = useRouter();

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

  const onSubmit = (data: FormData) => {
    login(data);
  };

  if (!hasHydrated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f7f5] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100">
        {/* Branding */}
        <div className="text-center space-y-2">
          <p className="text-xs bg-green-100 text-green-700 inline-block px-3 py-1 rounded-full font-medium">We Rent, We Return, We Repeat</p>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500">Login to continue your fashion journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div>
            <Input placeholder="Email" className="h-11 rounded-lg border-gray-200 focus:ring-2 focus:ring-green-500" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <Input type="password" placeholder="Password" className="h-11 rounded-lg border-gray-200 focus:ring-2 focus:ring-green-500" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* BUTTON */}
          <Button type="submit" className="w-full h-11 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          No account?{" "}
          <Link href="/register" className="text-green-700 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
