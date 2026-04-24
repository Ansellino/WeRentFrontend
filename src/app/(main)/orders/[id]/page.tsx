'use client'

import { useParams, useRouter } from 'next/navigation'
import { useOrderDetail } from '@/lib/hooks/useOrders'
import Image from 'next/image'
import ReviewForm from '@/components/review/ReviewForm'
import { useState } from 'react'
import { useProductList } from '@/lib/hooks/useProducts'

export default function OrderDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { data: order, isLoading, refetch } = useOrderDetail(id)
  const { data: productsData } = useProductList()
  const products = productsData?.data ?? []

  const [openReviewItemId, setOpenReviewItemId] = useState<string | null>(null)

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
        <h1 className="text-2xl font-semibold">Order #{order.id}</h1>
        <p className="text-gray-600">Status: {order.status}</p>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {order.items.map((item) => {
          const product = products.find(p => p.id === item.productId) // ← pindah ke sini

          return (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">

              <div
                className="sm:flex sm:gap-4 sm:space-y-0 cursor-pointer hover:bg-gray-50 rounded"
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
                <div className="flex-1 space-y-1 mt-2 sm:mt-0">
                  <h2 className="font-medium line-clamp-2">{item.productName}</h2>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} • Qty: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">{item.rentalDays} days rental</p>
                  <p className="text-sm text-gray-400">
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </p>
                </div>

                {/* Subtotal */}
                <div className="flex flex-col justify-between items-start sm:items-end mt-2 sm:mt-0">
                  <p className="font-semibold">
                    Rp {item.subtotal.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              {/* Review section */}
              {order.status === 'COMPLETED' && (
                <div onClick={(e) => e.stopPropagation()}>
                  {item.review ? (
                    <p className="text-sm text-green-600 font-medium">✓ Sudah direview</p>
                  ) : openReviewItemId === item.id ? (
                    <ReviewForm
                      productId={item.productId}
                      productName={item.productName}
                      onSuccess={() => {
                        setOpenReviewItemId(null)
                        refetch()
                      }}
                      onCancel={() => setOpenReviewItemId(null)}
                    />
                  ) : (
                    <button
                      onClick={() => setOpenReviewItemId(item.id)}
                      className="text-sm text-green-600 underline hover:text-green-700"
                    >
                      Tulis Review
                    </button>
                  )}
                </div>
              )}

            </div>
          )
        })}
      </div>

    </div>
  )
}