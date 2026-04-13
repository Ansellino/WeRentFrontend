import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@/lib/api/products'
import { queryKeys } from '@/lib/utils'
 
export const useProductList = (params?: {
  page?: number; limit?: number; category?: string; search?: string
}) => useQuery({
  queryKey: queryKeys.products.list(params),
  queryFn: () => productsApi.list(params),
  staleTime: 1000 * 60 * 5,   // 5 min — product list rarely changes
})
 
export const useProductDetail = (id: string) => useQuery({
  queryKey: queryKeys.products.detail(id),
  queryFn: () => productsApi.detail(id),
  staleTime: 1000 * 60 * 5,
  enabled: !!id,
})
 
export const useAvailability = (
  id: string,
  params: { size: string; startDate: string; rentalDays: number },
  enabled: boolean
) => useQuery({
  queryKey: queryKeys.products.availability(id, params),
  queryFn: () => productsApi.availability(id, params),
  staleTime: 1000 * 30,         // 30 sec — availability changes frequently
  refetchOnWindowFocus: true,    // re-check when user returns to tab
  enabled: enabled && !!params.size && !!params.startDate,
})
 
export const useReviewSummary = (id: string) => useQuery({
  queryKey: queryKeys.products.reviewSummary(id),
  queryFn: () => productsApi.reviewSummary(id),
  staleTime: 1000 * 60 * 2,
  enabled: !!id,
})
