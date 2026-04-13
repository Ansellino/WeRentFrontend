import { useQuery } from '@tanstack/react-query'
import { shipmentApi } from '@/lib/api/shipment'
import { queryKeys } from '@/lib/utils'
 
export const useShipmentOptions = (destination: string) =>
  useQuery({
    queryKey: queryKeys.shipment.options(destination),
    queryFn: () => shipmentApi.options(destination),
    enabled: !!destination,
    staleTime: 1000 * 60 * 10,
  })
