'use client'
import { useWishlist, useToggleWishlist } from '@/lib/hooks/useWishlist'
import { ProductCard } from '@/components/product/ProductCard'
 
export default function WishlistPage() {
  const { data: items, isLoading } = useWishlist()
  const { mutate: remove } = useToggleWishlist()
 
  if (isLoading) return <p>Loading wishlist...</p>
  if (!items || items.length === 0) return <p className='text-gray-500 py-10 text-center'>Your wishlist is empty</p>
 
  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-semibold'>Wishlist ({items.length})</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {items.map(item => (
          <div key={item.id} className='relative'>
            <ProductCard product={item.product} />
            <button
              onClick={() => remove({ productId: item.product.id, inWishlist: true })}
              className='absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 text-xs border'
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
