"use client";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { uploadApi } from "@/lib/api/upload";
import { AxiosError } from "axios";

export const useUpload = () => {
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadApi.reviewMedia(file),

    onSuccess: () => {
      toast({
        title: "Upload berhasil",
        description: "File berhasil diupload",
      });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Upload gagal",
        description: error.response?.data?.message || error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    },
  });

  return {
    upload: uploadMutation.mutate,
    isUploading: uploadMutation.isPending,
    data: uploadMutation.data,
  };
};