import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { AxiosError } from "axios"
import type { ApiError } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const queryKeys = {
  // Auth
  me: ["me"] as const,

  // Products
  products: {
    all: ["products"] as const,
    list: (params?: object) => ["products", "list", params] as const,
    detail: (id: string) => ["products", "detail", id] as const,
    availability: (id: string, p: object) =>
      ["products", "availability", id, p] as const,
    reviewSummary: (id: string) => ["products", "summary", id] as const,
  },

  // Reviews
  reviews: {
    all: ["reviews"] as const,
    list: (productId: string, params?: object) =>
      ["reviews", productId, params] as const,
  },

  // Cart
  cart: ["cart"] as const,

  // Orders
  orders: {
    all: ["orders"] as const,
    list: (params?: object) => ["orders", "list", params] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
  },

  // Shipment
  shipment: {
    options: (dest: string) => ["shipment", "options", dest] as const,
  },

  // Wishlist
  wishlist: ["wishlist"] as const,
}

export function getApiErrorCode(error: unknown): string | null {
  const axiosErr = error as AxiosError<ApiError>
  return axiosErr.response?.data?.error?.code ?? null
}

export function getApiErrorMessage(error: unknown): string {
  const axiosErr = error as AxiosError<ApiError>
  return axiosErr.response?.data?.error?.message ?? "Something went wrong"
}
