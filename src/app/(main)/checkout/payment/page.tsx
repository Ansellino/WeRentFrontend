'use client'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/hooks/useCart'
import { useCheckout } from '@/lib/hooks/useOrders'
import { useUIStore } from '@/lib/stores/uiStore'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
 
export default function PaymentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: cart } = useCart()
  const { checkout, resetCheckout } = useUIStore()
  const { mutate: doCheckout, isPending } = useCheckout()
 
  const handlePay = () => {
    if (!checkout.selectedCourier) return
    doCheckout(
      {
        paymentMethod: 'dummy',
        shippingAddress: checkout.shippingAddress,
        courierId: checkout.selectedCourier.id,
      },
      {
        onSuccess: (order) => {
          resetCheckout()
          toast({ title: 'Order placed!', description: `Order #${order.id.slice(0,8)}` })
          router.push(`/orders/${order.id}`)
        },
        onError: (err: any) => {
          const code = err.response?.data?.error?.code
          if (code === 'DATE_UNAVAILABLE') {
            toast({ title: 'Date conflict', description: 'Some items are no longer available', variant: 'destructive' })
            router.push('/cart')
          } else {
            toast({ title: 'Checkout failed', variant: 'destructive' })
          }
        },
      }
    )
  }
 
  if (!cart) return null
 
  return (
    <div className='max-w-lg mx-auto space-y-6'>
      <h1 className='text-xl font-semibold'>Order Summary</h1>
      {cart.items.map(item => (
        <div key={item.id} className='flex justify-between text-sm py-2 border-b'>
          <span>{item.productName} × {item.quantity}</span>
          <span>Rp {item.subtotal.toLocaleString('id-ID')}</span>
        </div>
      ))}
      <div className='flex justify-between text-sm'>
        <span>Shipping ({checkout.selectedCourier?.label})</span>
        <span>Rp {checkout.selectedCourier?.price.toLocaleString('id-ID')}</span>
      </div>
      <div className='flex justify-between font-semibold text-lg'>
        <span>Total</span>
        <span>Rp {((cart.total) + (checkout.selectedCourier?.price ?? 0)).toLocaleString('id-ID')}</span>
      </div>
      <Button onClick={handlePay} disabled={isPending}
        className='w-full bg-green-700 hover:bg-green-800'>
        {isPending ? 'Processing...' : 'Confirm & Pay'}
      </Button>
    </div>
  )
}
