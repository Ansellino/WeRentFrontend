import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/* =========================================================
   SHADCN REQUIRED HELPER
========================================================= */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* =========================================================
   UI HELPERS
========================================================= */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}

export function getFirstName(name?: string) {
  return name?.split(" ")[0] ?? "";
}

/* =========================================================
   API RESPONSE TYPES (SWAGGER)
========================================================= */
export interface ApiError {
  code: string;
  message: string;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: ApiMeta;
  error?: ApiError;
}

/* =========================================================
   API HELPER (UNWRAP)
========================================================= */
export function unwrapResponse<T>(res: ApiResponse<T>): T {
  if (!res.success) {
    throw new Error(res.error?.message || "API Error");
  }
  return res.data;
}

/* =========================================================
   QUERY KEYS (TANSTACK QUERY)
========================================================= */
export const queryKeys = {
  // AUTH
  auth: {
    me: () => ["auth", "me"] as const,
  },

  // PRODUCTS
  products: {
    all: ["products"] as const,

    list: (params?: {
      page?: number;
      limit?: number;
      category?: string;
      search?: string;
    }) => ["products", "list", params] as const,

    detail: (id: string) =>
      ["products", "detail", id] as const,

    availability: (
      id: string,
      params: {
        size: string;
        startDate: string;
        rentalDays: number;
      }
    ) => ["products", "availability", id, params] as const,

    reviewSummary: (id: string) =>
      ["products", "summary", id] as const,
  },

  // REVIEWS
  reviews: {
    all: ["reviews"] as const,

    list: (
      productId: string,
      params?: {
        page?: number;
        limit?: number;
        rating?: number[];
        sort?: "newest" | "helpful";
        hasMedia?: boolean;
      }
    ) => ["reviews", "list", productId, params] as const,
  },

  // CART
  cart: {
    all: () => ["cart"] as const,
  },

  // ORDERS
  orders: {
    all: ["orders"] as const,

    list: (params?: { page?: number; limit?: number }) =>
      ["orders", "list", params] as const,

    detail: (id: string) =>
      ["orders", "detail", id] as const,
  },

  // SHIPMENT
  shipment: {
    options: (destination: string) =>
      ["shipment", "options", destination] as const,
  },

  // WISHLIST
  wishlist: {
    all: () => ["wishlist"] as const,
  },

  // UPLOAD
  upload: {
    all: () => ["upload"] as const,
  },
};