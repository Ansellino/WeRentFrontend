import Link from 'next/link'
import type { ProductListItem } from '@/lib/types'

export function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className='block overflow-hidden rounded-lg border bg-white transition hover:shadow-sm'
    >
      <img
        src={product.images[0] ?? '/placeholder.png'}
        alt={product.name}
        className='h-48 w-full object-cover'
      />
      <div className='space-y-1 p-3'>
        <p className='line-clamp-1 font-medium'>{product.name}</p>
        <p className='text-xs text-gray-500'>{product.category}</p>
        <p className='text-sm font-semibold text-green-700'>
          Rp {product.pricePerDay.toLocaleString('id-ID')} / day
        </p>
      </div>
    </Link>
  )
}