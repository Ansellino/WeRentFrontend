import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '@/lib/api/cart'
import type { AddToCartDto, UpdateCartItemDto } from '@/lib/types'
import { useAuthStore } from '@/lib/stores/authStore'

const queryKeys = {
  cart: ['cart'] as const,
}

export const useCart = () => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: cartApi.get,
    enabled: isAuthenticated,
    staleTime: 0,
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
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCartItemDto }) =>
      cartApi.updateItem(id, dto),
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