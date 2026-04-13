import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersApi } from '@/lib/api/orders'
import { queryKeys } from '@/lib/utils'

export const useOrderList = (params?: { page?: number }) =>
  useQuery({
    queryKey: queryKeys.orders.list(params),
    queryFn: () => ordersApi.list(params),
  })

export const useOrderDetail = (id: string) =>
  useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => ordersApi.detail(id),
    enabled: !!id,
  })

export const useCheckout = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ordersApi.checkout,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart })
      qc.invalidateQueries({ queryKey: queryKeys.orders.all })
    },
  })
}

export {}
