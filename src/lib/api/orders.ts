import { apiClient } from '@/lib/api/client'
import type { Order, PaginatedResponse } from '@/lib/types'
 
export const ordersApi = {
  checkout: (dto: { paymentMethod: string; shippingAddress: string; courierId: string }) =>
    apiClient.post<{ success: boolean; data: Order }>('/orders/checkout', dto)
      .then(r => r.data.data),
 
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<{
      success: boolean
      data: Order[]
      meta: PaginatedResponse<Order>['meta']
    }>('/orders', { params })
      .then(r => ({ data: r.data.data, meta: r.data.meta })),
 
  detail: (id: string) =>
    apiClient.get<{ success: boolean; data: Order }>(`/orders/${id}`)
      .then(r => r.data.data),
}
