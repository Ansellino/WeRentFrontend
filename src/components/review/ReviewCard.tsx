'use client'
import Image from 'next/image'
import { useState } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { StarRating } from '@/components/shared/StarRating'
import { Badge } from '@/components/ui/badge'
import { useUIStore } from '@/lib/stores/uiStore'
import type { Review } from '@/lib/types'

const MAX_CHARS = 200

interface Props {
  review: Review
  onHelpful: () => void
  currentUserId?: string
}

export function ReviewCard({ review, onHelpful, currentUserId }: Props) {
  const [expanded, setExpanded] = useState(false)
  const openLightbox = useUIStore(s => s.openLightbox)
  const isLong = review.comment.length > MAX_CHARS
  const displayComment = expanded || !isLong
    ? review.comment
    : review.comment.slice(0, MAX_CHARS) + '...'

  const timeAgo = formatDistanceToNow(parseISO(review.createdAt), { addSuffix: true })
  const isOwnReview = currentUserId === review.userId  // ← tambah

  return (
    <div className='border rounded-lg p-4 space-y-3'>
      {/* Header */}
      <div className='flex items-center gap-3'>
        <div className='w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium text-sm'>
          {review.user.name[0].toUpperCase()}
        </div>
        <div>
          <p className='font-medium text-sm'>{review.user.name}</p>
          <p className='text-xs text-gray-400'>{timeAgo}{review.isEdited ? ' - edited' : ''}</p>
        </div>
        <StarRating value={review.rating} readonly className='ml-auto' />
      </div>

      {/* Body measurements + fit */}
      <div className='flex gap-3 text-xs text-gray-500'>
        <span>Bust {review.measurements.bust}cm</span>
        <span>Waist {review.measurements.waist}cm</span>
        <span>Hips {review.measurements.hips}cm</span>
        <Badge variant='secondary' className='ml-auto capitalize'>
          {review.fit === 'true' ? 'True to size' : review.fit === 'small' ? 'Runs small' : 'Runs large'}
        </Badge>
      </div>

      {/* Comment */}
      <div>
        <p className='text-sm text-gray-700'>{displayComment}</p>
        {isLong && (
          <button
            onClick={() => setExpanded(p => !p)}
            className='text-green-700 text-sm mt-1 hover:underline'
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Attached media */}
      {review.mediaUrls.length > 0 && (
        <div className='flex gap-2 flex-wrap'>
          {review.mediaUrls.map((url, i) => (
            <button key={url} onClick={() => openLightbox(review.mediaUrls, i)}
              className='w-16 h-16 rounded overflow-hidden border'
            >
              <Image src={url} alt='' width={64} height={64} className='w-full h-full object-cover' />
            </button>
          ))}
        </div>
      )}

      {/* Helpful — sembunyikan kalau review milik sendiri */}
      {!isOwnReview && (
        <div className='flex justify-end'>
          <button
            onClick={onHelpful}
            className={`flex items-center gap-1 text-sm px-3 py-1 rounded border transition-colors ${
              review.isHelpful ? 'border-green-600 text-green-700 bg-green-50' : 'border-gray-200 text-gray-500'
            }`}
          >
            Helpful {review.helpfulCount > 0 && `(${review.helpfulCount})`}
          </button>
        </div>
      )}
    </div>
  )
}