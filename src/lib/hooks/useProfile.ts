import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { queryKeys } from "@/lib/utils";
import { useAuthStore } from "@/lib/stores/authStore";

export const useProfile = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: authApi.me,
    enabled: !!token,
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
  });
};

export const useUpdateAvatarUrl = () => {
  return useMutation({
    mutationFn: (avatarUrl: string) => authApi.updateAvatarUrl(avatarUrl),
  });
};