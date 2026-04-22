import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { wishlistApi } from '@/lib/api/wishlist'
import { queryKeys } from '@/lib/utils'
import { useAuthStore } from '@/lib/stores/authStore'
 
export const useWishlist = () => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  return useQuery({
    queryKey: queryKeys.wishlist.all(),
    queryFn: wishlistApi.get,
    enabled: isAuthenticated,
  })
}
 
export const useToggleWishlist = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ productId, inWishlist }: { productId: string; inWishlist: boolean }) =>
      inWishlist ? wishlistApi.remove(productId) : wishlistApi.add(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.wishlist.all() }),
  })
}
