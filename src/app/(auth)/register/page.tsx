"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToast } from "@/hooks/use-toast";

const schema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Minimal 6 karakter"),
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
  const setAuth = useAuthStore((s) => s.setAuth);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#047857] px-4 font-mono">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative w-full max-w-md bg-[#047857] border-4 border-black shadow-[6px_6px_0px_#000] p-6">
        <h1 className="text-2xl text-center mb-6 text-white tracking-widest">REGISTER</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm mb-1 text-white">
              Nama<span className="text-red-400">*</span>
            </label>
            <input {...register("name")} required className="w-full bg-[#c2b280] border-2 border-black px-3 py-2 focus:outline-none" />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1 text-white">
              Email<span className="text-red-400">*</span>{" "}
            </label>
            <input {...register("email")} required className="w-full bg-[#c2b280] border-2 border-black px-3 py-2 focus:outline-none" />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1 text-white">
              Password<span className="text-red-400">*</span>{" "}
            </label>
            <input type="password" {...register("password")} required className="w-full bg-[#c2b280] border-2 border-black px-3 py-2 focus:outline-none" />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm mb-1 text-white">
              Confirm Password<span className="text-red-400">*</span>
            </label>
            <input type="password" {...register("confirmPassword")} required className="w-full bg-[#c2b280] border-2 border-black px-3 py-2 focus:outline-none" />
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* AVATAR */}
          <div>
            <label className="block text-sm mb-1 text-white">Avatar URL (optional)</label>
            <input placeholder="https://..." {...register("avatarUrl")} className="w-full bg-[#c2b280] border-2 border-black px-3 py-2 focus:outline-none" />
          </div>

          {/* BUTTON */}
          <button type="submit" disabled={isPending} className="w-full bg-[#228b22] border-2 border-black py-2 text-white shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition">
            {isPending ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-white">
          Already have an account?{" "}
          <a href="/login" className="underline text-[#9acd32]">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
