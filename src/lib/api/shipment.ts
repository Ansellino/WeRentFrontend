import { apiClient } from '@/lib/api/client'
import type { ShipmentOption } from '@/lib/types'
 
export const shipmentApi = {
  options: (destination: string) =>
    apiClient.get<{ success: boolean; data: ShipmentOption[] }>(
      '/shipment/options', { params: { destination } }
    ).then(r => r.data.data),
 
  estimate: (shippingAddress: string, courierId: string) =>
    apiClient.post<{ success: boolean; data: ShipmentOption }>(
      '/shipment/estimate', { shippingAddress, courierId }
    ).then(r => r.data.data),
}
