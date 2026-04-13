import { apiClient } from '@/lib/api/client'
import type { Review, CreateReviewDto, PaginatedResponse } from '@/lib/types'
 
export interface ReviewsParams {
  page?: number
  limit?: number
  rating?: number[]
  sort?: 'newest' | 'helpful'
  hasMedia?: boolean
}
 
export const reviewsApi = {
  list: (productId: string, params?: ReviewsParams) =>
    apiClient.get<{
      success: boolean
      data: Review[]
      meta: PaginatedResponse<Review>['meta']
    }>(
      `/reviews/product/${productId}`, { params }
    ).then(r => ({ data: r.data.data, meta: r.data.meta })),
 
  create: (productId: string, dto: CreateReviewDto) =>
    apiClient.post<{ success: boolean; data: Review }>(
      `/reviews/product/${productId}`, dto
    ).then(r => r.data.data),
  update: (reviewId: string, dto: Partial<Pick<CreateReviewDto, 'rating'|'comment'|'fit'>>) =>
    apiClient.patch<{ success: boolean; data: Review }>(`/reviews/${reviewId}`, dto)
      .then(r => r.data.data),
 
  remove: (reviewId: string) =>
    apiClient.delete(`/reviews/${reviewId}`),
 
  toggleHelpful: (reviewId: string) =>
    apiClient.post<{ success: boolean; data: { helpful: boolean; helpfulCount: number } }>(
      `/reviews/${reviewId}/helpful`
    ).then(r => r.data.data),
 
  checkHelpful: (reviewId: string) =>
    apiClient.get<{ success: boolean; data: { helpful: boolean } }>(
      `/reviews/${reviewId}/helpful`
    ).then(r => r.data.data),
}
