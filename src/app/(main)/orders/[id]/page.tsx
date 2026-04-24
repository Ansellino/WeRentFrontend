'use client'

import { useParams, useRouter } from 'next/navigation'
import { useOrderDetail } from '@/lib/hooks/useOrders'
import { useProductList } from '@/lib/hooks/useProducts'
import Image from 'next/image'
import Link from 'next/link'

export default function OrderDetailPage() {
  const router = useRouter()
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
            className="border rounded-lg p-4 space-y-3 sm:flex sm:gap-4 sm:space-y-0 cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/products/${item.productId}`)}
            >

            {/* Image */}
            <div className="flex-shrink-0">
               <Image
                  src={product?.images?.[0] || 'https://placehold.co/100x140'}
                  alt={item.productName}
                  width={100}
                  height={140}
                  className="w-24 h-32 object-cover rounded"
               />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1">
               <h2 className="font-medium line-clamp-2">
                  {item.productName}
               </h2>

               <p className="text-sm text-gray-500">
                  Size: {item.size} • Qty: {item.quantity}
               </p>

               <p className="text-sm text-gray-500">
                  {item.rentalDays} days rental
               </p>

               <p className="text-sm text-gray-400">
                  {formatDate(item.startDate)} - {formatDate(item.endDate)}
               </p>
            </div>

            {/* Right section */}
            <div className="flex flex-col justify-between items-start sm:items-end mt-2 sm:mt-0">
          
               <p className="font-semibold">
                  Rp. {item.subtotal.toLocaleString('id-ID')}
               </p>

               <Link
                  href={`/products/${item.productId}?review=true&orderId=${order.id}`}
                  className="mt-2 text-sm text-green-600 underline hover:text-green-700"
               >
                  Give Review
               </Link>

            </div>
            </div>
         )
      })}
      </div>
   </div>
  )
}