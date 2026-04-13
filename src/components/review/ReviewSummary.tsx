import { StarRating } from '@/components/shared/StarRating'
import { FitScaleChart } from './FitScaleChart'
import type { ReviewSummary as IReviewSummary } from '@/lib/types'
 
export function ReviewSummary({ summary }: { summary: IReviewSummary }) {
  return (
    <div className='border rounded-lg p-5 space-y-4'>
      <div className='flex items-center gap-4'>
        <span className='text-4xl font-bold'>{summary.avgRating.toFixed(1)}</span>
        <div>
          <StarRating value={summary.avgRating} readonly />
          <p className='text-sm text-gray-500'>{summary.total} reviews</p>
        </div>
      </div>
 
      {/* Rating distribution bars */}
      <div className='space-y-1'>
        {([5,4,3,2,1] as const).map(star => (
          <div key={star} className='flex items-center gap-2 text-sm'>
            <span className='w-3'>{star}</span>
            <div className='flex-1 bg-gray-100 rounded h-2'>
              <div
                className='bg-yellow-400 h-2 rounded'
                style={{ width: `${summary.total > 0 ? (summary.distribution[String(star) as '1'] / summary.total) * 100 : 0}%` }}
              />
            </div>
            <span className='w-6 text-right text-gray-400'>{summary.distribution[String(star) as '1']}</span>
          </div>
        ))}
      </div>
 
      <FitScaleChart fitScale={summary.fitScale} />
    </div>
  )
}