'use client'

import { useParams } from 'next/navigation'
import { useOrderDetail } from '@/lib/hooks/useOrders'
import { useProductList } from '@/lib/hooks/useProducts'
import Image from 'next/image'

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: order, isLoading } = useOrderDetail(id)

  const { data } = useProductList()
  const products = data?.data ?? []

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (!order) return <div>Order not found</div>

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Order #{order.id}
        </h1>
        <p className="text-gray-600">
          Status: {order.status}
        </p>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {order.items.map((item) => {
          const product = products?.find(p => p.id === item.productId)
          
          return (
            <div
              key={`${item.productId}-${item.size}`}
              className="border rounded-lg p-4 flex gap-4"
            >

              {/* Product Image */}
              <Image
                src={product?.images?.[0] || 'https://placehold.co/100x140'}
                alt={item.productName}
                width={100}
                height={140}
                className="w-24 h-32 object-cover rounded"
              />

              {/* Info */}
              <div className="flex-1 space-y-1">
                <h2 className="font-medium">{item.productName}</h2>

                <p className="text-sm text-gray-500">
                  Size: {item.size}
                </p>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="text-sm text-gray-500">
                  Rental Duration: {item.rentalDays} days
                </p>

                <p className="text-sm text-gray-500">
                  Rental Date: {formatDate(item.startDate)} to {formatDate(item.endDate)}
                </p>
              </div>

              {/* Price */}
              <div className="text-right font-medium">
                Rp. {item.subtotal.toLocaleString('id-ID')}
              </div>

            </div>
          )
        })}
      </div>

      {/* Total */}
      <div className="border-t pt-4 text-right">
        <p className='mb-2 text-lg font-semibold'> 
          Shipping: Rp. {order.shippingCost.toLocaleString('id-ID')} 
        </p>

        <p className="text-lg font-semibold">
          Total: Rp. {order.total.toLocaleString('id-ID')}
        </p>
      </div>

    </div>
  )
}