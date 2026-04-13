import { apiClient } from '@/lib/api/client'
import type { ProductListItem } from '@/lib/types'

export interface WishlistItem {
  id: string
  product: ProductListItem
}
 
export const wishlistApi = {
  get: () =>
    apiClient.get<{ success: boolean; data: { items: WishlistItem[] } }>('/wishlist')
      .then(r => r.data.data.items),
 
  add: (productId: string) =>
    apiClient.post('/wishlist', { productId }),
 
  remove: (productId: string) =>
    apiClient.delete(`/wishlist/${productId}`),
}
