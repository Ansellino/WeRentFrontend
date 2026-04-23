'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useReviewList, useToggleHelpful } from '@/lib/hooks/useReviews'
import { useReviewSummary } from '@/lib/hooks/useProducts'
import { ReviewSummary } from '@/components/review/ReviewSummary'
import { ReviewCard } from '@/components/review/ReviewCard'
import { RatingFilter } from '@/components/review/RatingFilter'
import { Button } from '@/components/ui/button'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
 
export default function ReviewsPage() {
  const { id: productId } = useParams<{ id: string }>()
  const [ratingFilter, setRatingFilter] = useState<number[]>([])
  const [sort, setSort] = useState<'newest' | 'helpful'>('newest')
  const [hasMediaOnly, setHasMediaOnly] = useState(false)

  // saya menambahkan code ini
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [ratingFilter, sort, hasMediaOnly])
 
  const { data: summary } = useReviewSummary(productId)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useReviewList(productId, {
      // saya menyesuaikan type agar sesuai dengan hook (tetap kirim array)
      rating: ratingFilter.length ? ratingFilter : undefined,
      sort,
      hasMedia: hasMediaOnly || undefined,
    })
 
  const { mutate: toggleHelpful } = useToggleHelpful(productId)
 
  // Infinite scroll trigger
  const { ref: loadMoreRef, inView } = useInView()
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])
 
  const reviews = data?.pages.flatMap(p => p.data) ?? []
  const totalReviews = data?.pages[0]?.meta.total ?? 0
 
  const handleRatingFilter = (rating: number) => {
    setRatingFilter(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    )
  }
 
  return (
    <div className='space-y-6'>
      {/* Back button */}
      <a href={`/products/${productId}`} className='text-sm text-gray-500 hover:underline'>
        ← Back to product
      </a>
 
      <h1 className='text-xl font-semibold'>Reviews ({totalReviews})</h1>
 
      {/* Summary + Fit Scale */}
      {summary && <ReviewSummary summary={summary} />}
 
      {/* Filter & Sort bar */}
      <div className='flex flex-wrap gap-3 items-center'>
        <RatingFilter selected={ratingFilter} onToggle={handleRatingFilter} />
 
        <Button
          variant={sort === 'newest' ? 'default' : 'outline'} size='sm'
          onClick={() => setSort('newest')}
        >Newest</Button>
        <Button
          variant={sort === 'helpful' ? 'default' : 'outline'} size='sm'
          onClick={() => setSort('helpful')}
        >Most Helpful</Button>
 
        <Button
          variant={hasMediaOnly ? 'default' : 'outline'} size='sm'
          onClick={() => setHasMediaOnly(p => !p)}
        >With Photos</Button>
 
        {(ratingFilter.length > 0 || hasMediaOnly) && (
          <Button variant='ghost' size='sm'
            onClick={() => { setRatingFilter([]); setHasMediaOnly(false) }}
          >Clear filters</Button>
        )}
      </div>
 
      {/* Review list */}
      {isLoading ? <p>Loading reviews...</p> : (
        <div className='space-y-4'>
          {reviews.length === 0 ? (
            <p className='text-gray-500 text-center py-8'>No reviews yet. Be the first!</p>
          ) : (
            reviews.map(review => (
              <ReviewCard
                key={review.id}
                review={review}
                onHelpful={() => {
                  // saya menambahkan agar klik helpful juga mengaktifkan filter helpful
                  toggleHelpful(review.id)
                  setSort('helpful')
                }}
              />
            ))
          )}
        </div>
      )}
 
      {/* Infinite scroll sentinel */}
      <div ref={loadMoreRef} className='py-4 text-center'>
        {isFetchingNextPage && <p className='text-gray-500 text-sm'>Loading more...</p>}
      </div>
    </div>
  )
}
