'use client'

import { useState, useRef } from 'react'
import { useProductList } from '@/lib/hooks/useProducts'
import ProductCard from '@/components/product/ProductCard'
import { Input } from '@/components/ui/input'
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const timerRef = useRef<NodeJS.Timeout | null>(null) // ✅ di sini

  const handleSearch = (val: string) => {
    setSearch(val)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setDebouncedSearch(val)
    }, 400)
  }

  const { data, isLoading } = useProductList({ search: debouncedSearch })

  return (
    <div className='space-y-6'>
      <Input
        placeholder='Search products...'
        value={search}
        onChange={e => handleSearch(e.target.value)}
        className='max-w-sm'
      />

      {isLoading ? (
        <LoadingSkeleton count={6} />
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {data?.data.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}