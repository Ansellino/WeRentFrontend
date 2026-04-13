import { create } from 'zustand'
import type { ShipmentOption } from '@/lib/types'
 
interface CheckoutState {
  shippingAddress: string
  selectedCourier: ShipmentOption | null
}
 
interface UIState {
  // Checkout multi-step state
  checkout: CheckoutState
  setShippingAddress: (address: string) => void
  setSelectedCourier: (courier: ShipmentOption) => void
  resetCheckout: () => void
  // Review media lightbox
  lightboxUrls: string[]
  lightboxIndex: number
  openLightbox: (urls: string[], index: number) => void
  closeLightbox: () => void
}
 
const defaultCheckout: CheckoutState = {
  shippingAddress: '',
  selectedCourier: null,
}
 
export const useUIStore = create<UIState>()((set) => ({
  checkout: defaultCheckout,
  setShippingAddress: (address) =>
    set(s => ({ checkout: { ...s.checkout, shippingAddress: address } })),
  setSelectedCourier: (courier) =>
    set(s => ({ checkout: { ...s.checkout, selectedCourier: courier } })),
  resetCheckout: () => set({ checkout: defaultCheckout }),
 
  lightboxUrls: [],
  lightboxIndex: 0,
  openLightbox: (urls, index) => set({ lightboxUrls: urls, lightboxIndex: index }),
  closeLightbox: () => set({ lightboxUrls: [], lightboxIndex: 0 }),
}))
