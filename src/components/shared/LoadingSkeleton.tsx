import { Skeleton } from '@/components/ui/skeleton'

interface LoadingSkeletonProps {
  count?: number
}

export function LoadingSkeleton({ count = 6 }: LoadingSkeletonProps) {
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='space-y-3 rounded-lg border p-3'>
          <Skeleton className='h-40 w-full rounded-md' />
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-3 w-1/2' />
          <Skeleton className='h-4 w-2/3' />
        </div>
      ))}
    </div>
  )
}
