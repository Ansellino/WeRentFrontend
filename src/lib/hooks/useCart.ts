import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '@/lib/api/cart'
import { queryKeys } from '@/lib/utils'
import type { AddToCartDto } from '@/lib/types'
import { useAuthStore } from '@/lib/stores/authStore'
 
export const useCart = () => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: cartApi.get,
    enabled: isAuthenticated,    // only fetch when logged in
    staleTime: 0,                // always fresh
  })
}
 
export const useAddToCart = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: AddToCartDto) => cartApi.addItem(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.cart }),
  })
}
 
export const useUpdateCartItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: any }) => cartApi.updateItem(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.cart }),
  })
}
 
export const useRemoveCartItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => cartApi.removeItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.cart }),
  })
}
