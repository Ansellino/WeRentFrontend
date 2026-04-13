import { useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { reviewsApi, ReviewsParams } from '@/lib/api/reviews'
import { queryKeys } from '@/lib/utils'
import type { Review, CreateReviewDto } from '@/lib/types'
 
// Paginated review list — uses useInfiniteQuery for 'load more'
export const useReviewList = (productId: string, params?: Omit<ReviewsParams, 'page'>) =>
  useInfiniteQuery({
    queryKey: queryKeys.reviews.list(productId, params),
    queryFn: ({ pageParam = 1 }) =>
      reviewsApi.list(productId, { ...params, page: pageParam }),
    getNextPageParam: (last) => {
      const { page, limit, total } = last.meta
      return page * limit < total ? page + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: 1000 * 60,
    enabled: !!productId,
  })
 
// Create review
export const useCreateReview = (productId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateReviewDto) => reviewsApi.create(productId, dto),
    onSuccess: () => {
      // Invalidate both review list and summary
      qc.invalidateQueries({ queryKey: queryKeys.reviews.list(productId) })
      qc.invalidateQueries({ queryKey: queryKeys.products.reviewSummary(productId) })
      qc.invalidateQueries({ queryKey: queryKeys.products.detail(productId) })
    },
  })
}
 
// Helpful toggle — optimistic update
export const useToggleHelpful = (productId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (reviewId: string) => reviewsApi.toggleHelpful(reviewId),
 
    // Optimistically update before server responds
    onMutate: async (reviewId) => {
      await qc.cancelQueries({ queryKey: queryKeys.reviews.list(productId) })
      const previous = qc.getQueryData(queryKeys.reviews.list(productId))
 
      qc.setQueryData(queryKeys.reviews.list(productId), (old: any) => {
        if (!old) return old
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((r: Review) =>
              r.id === reviewId
                ? {
                    ...r,
                    isHelpful: !r.isHelpful,
                    helpfulCount: r.isHelpful ? r.helpfulCount - 1 : r.helpfulCount + 1,
                  }
                : r
            ),
          })),
        }
      })
      return { previous }
    },
 
    // Roll back on error
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(queryKeys.reviews.list(productId), ctx.previous)
      }
    },
 
    onSettled: () => {
      qc.invalidateQueries({ queryKey: queryKeys.reviews.list(productId) })
    },
  })
}
 
// Delete review
export const useDeleteReview = (productId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (reviewId: string) => reviewsApi.remove(reviewId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.reviews.list(productId) })
      qc.invalidateQueries({ queryKey: queryKeys.products.reviewSummary(productId) })
    },
  })
}
