'use client'
import { useCart, useRemoveCartItem } from '@/lib/hooks/useCart'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { format, parseISO } from 'date-fns'
 
export default function CartPage() {
  const { data: cart, isLoading } = useCart()
  const { mutate: removeItem } = useRemoveCartItem()
  const router = useRouter()
 
  if (isLoading) return <p>Loading cart...</p>
  if (!cart || cart.items.length === 0) return (
    <div className='text-center py-20'>
      <p className='text-gray-500 mb-4'>Your cart is empty</p>
      <Button onClick={() => router.push('/')}>Browse Products</Button>
    </div>
  )
 
  return (
    <div className='space-y-6'>
      <h1 className='text-xl font-semibold'>Cart ({cart.items.length} items)</h1>
      <div className='space-y-4'>
        {cart.items.map(item => (
          <div key={item.id} className='border rounded-lg p-4 flex gap-4'>
            <img src={item.productImage} alt={item.productName}
              className='w-20 h-20 object-cover rounded' />
            <div className='flex-1 space-y-1'>
              <p className='font-medium'>{item.productName}</p>
              <p className='text-sm text-gray-500'>Size: {item.size}</p>
              <p className='text-sm text-gray-500'>
                {format(parseISO(item.startDate), 'dd MMM')} →{' '}
                {format(parseISO(item.endDate), 'dd MMM yyyy')} ({item.rentalDays} days)
              </p>
              <p className='font-medium text-green-700'>
                Rp {item.subtotal.toLocaleString('id-ID')}
              </p>
            </div>
            <Button variant='ghost' size='sm' onClick={() => removeItem(item.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className='border-t pt-4 flex justify-between items-center'>
        <p className='text-lg font-semibold'>Total: Rp {cart.total.toLocaleString('id-ID')}</p>
        <Button onClick={() => router.push('/checkout/shipment')}
          className='bg-green-700 hover:bg-green-800'>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}
