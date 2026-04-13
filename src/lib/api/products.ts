import { apiClient } from '@/lib/api/client'
import type { Product, ProductListItem, Availability, ReviewSummary, PaginatedResponse } from '@/lib/types'
 
export const productsApi = {
  list: (params?: { page?: number; limit?: number; category?: string; search?: string }) =>
    apiClient.get<{
      success: boolean
      data: ProductListItem[]
      meta: PaginatedResponse<ProductListItem>['meta']
    }>('/products', { params })
      .then(r => ({ data: r.data.data, meta: r.data.meta })),
 
  detail: (id: string) =>
    apiClient.get<{ success: boolean; data: Product }>(`/products/${id}`)
      .then(r => r.data.data),
 
  availability: (id: string, params: { size: string; startDate: string; rentalDays: number }) =>
    apiClient.get<{ success: boolean; data: Availability }>(`/products/${id}/availability`, { params })
      .then(r => r.data.data),
 
  reviewSummary: (id: string) =>
    apiClient.get<{ success: boolean; data: ReviewSummary }>(`/products/${id}/reviews/summary`)
      .then(r => r.data.data),
}
