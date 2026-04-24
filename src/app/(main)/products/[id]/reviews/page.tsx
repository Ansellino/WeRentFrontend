'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useReviewList, useToggleHelpful } from '@/lib/hooks/useReviews'
import { useReviewSummary } from '@/lib/hooks/useProducts'
import { ReviewSummary } from '@/components/review/ReviewSummary'
import { ReviewCard } from '@/components/review/ReviewCard'
import { RatingFilter } from '@/components/review/RatingFilter'
import { useInView } from 'react-intersection-observer'
import { useAuthStore } from '@/lib/stores/authStore'

export default function ReviewsPage() {
  const { id: productId } = useParams<{ id: string }>()
  const [ratingFilter, setRatingFilter] = useState<number[]>([])
  const [sort, setSort] = useState<'newest' | 'helpful'>('newest')
  const [hasMediaOnly, setHasMediaOnly] = useState(false)

  const user = useAuthStore(s => s.user)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [ratingFilter, sort, hasMediaOnly])

  const { data: summary } = useReviewSummary(productId)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useReviewList(productId, {
      rating: ratingFilter.length ? ratingFilter : undefined,
      sort,
      hasMedia: hasMediaOnly || undefined,
    })

  const { mutate: toggleHelpful } = useToggleHelpful(productId)

  const { ref: loadMoreRef, inView } = useInView()
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const reviews = data?.pages.flatMap(p => p.data) ?? []
  const totalReviews = data?.pages[0]?.meta.total ?? 0

  const handleRatingFilter = (rating: number) => {
    setRatingFilter(prev =>
      prev.includes(rating) ? [] : [rating]  // toggle: kalau sudah dipilih → clear, kalau belum → set
    )
  }

  const filterBtnClass = (active: boolean) =>
    `px-3 py-1 rounded-full text-sm border transition-colors ${
      active
        ? 'border-green-600 bg-green-50 text-green-700'
        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
    }`

  return (
    <div className='space-y-6'>
      <a href={`/products/${productId}`} className='text-sm text-gray-500 hover:underline'>
        ← Back to product
      </a>

      <h1 className='text-xl font-semibold'>Reviews ({totalReviews})</h1>

      {summary && <ReviewSummary summary={summary} />}

      {/* Filter & Sort bar */}
      <div className='flex flex-wrap gap-3 items-center'>
        <RatingFilter selected={ratingFilter} onToggle={handleRatingFilter} />

        <button className={filterBtnClass(sort === 'newest')} onClick={() => setSort('newest')}>
          Newest
        </button>
        <button className={filterBtnClass(sort === 'helpful')} onClick={() => setSort('helpful')}>
          Most Helpful
        </button>
        <button className={filterBtnClass(hasMediaOnly)} onClick={() => setHasMediaOnly(p => !p)}>
          With Photos
        </button>

        {(ratingFilter.length > 0 || hasMediaOnly) && (
          <button
            onClick={() => { setRatingFilter([]); setHasMediaOnly(false) }}
            className='px-3 py-1 rounded-full text-sm text-gray-500 hover:text-gray-700'
          >
            Clear filters
          </button>
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
                currentUserId={user?.id}
                onHelpful={() => toggleHelpful(review.id)}
              />
            ))
          )}
        </div>
      )}

      <div ref={loadMoreRef} className='py-4 text-center'>
        {isFetchingNextPage && <p className='text-gray-500 text-sm'>Loading more...</p>}
      </div>
    </div>
  )
}