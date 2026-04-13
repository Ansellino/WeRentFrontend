import { apiClient } from '@/lib/api/client'
import type { Cart, CartItem, AddToCartDto } from '@/lib/types'
 
export const cartApi = {
  get: () =>
    apiClient.get<{ success: boolean; data: Cart }>('/cart')
      .then(r => r.data.data),
 
  addItem: (dto: AddToCartDto) =>
    apiClient.post<{ success: boolean; data: CartItem }>('/cart/items', dto)
      .then(r => r.data.data),
 
  updateItem: (id: string, dto: { quantity?: number; startDate?: string; rentalDays?: number }) =>
    apiClient.patch<{ success: boolean; data: CartItem }>(`/cart/items/${id}`, dto)
      .then(r => r.data.data),
 
  removeItem: (id: string) =>
    apiClient.delete(`/cart/items/${id}`),
}
