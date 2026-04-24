import { apiClient } from '@/lib/api/client'
import type { Review, PaginatedResponse } from '@/lib/types'

// ===== QUERY PARAMS =====
export interface ReviewsParams {
  page?: number
  limit?: number
  rating?: number[]
  sort?: 'newest' | 'helpful'
  hasMedia?: boolean
}

// ===== DTO (HARUS SAMA DENGAN BACKEND) =====
export interface CreateReviewDto {
  rating: number
  comment: string
  fit: 'small' | 'true' | 'large'
  measurements: {
    bust: number
    waist: number
    hips: number
  }
  mediaUrls?: string[]
}

export type UpdateReviewDto = Partial<CreateReviewDto>

// ===== API =====
export const reviewsApi = {
  // ===== LIST =====
  list: async (productId: string, params?: ReviewsParams) => {
    const res = await apiClient.get<{
      success: boolean
      data: Review[]
      meta: PaginatedResponse<Review>['meta']
    }>(`/reviews/product/${productId}`, { params })

    return {
      data: res.data.data,
      meta: res.data.meta,
    }
  },

  // ===== CREATE =====
  create: async (productId: string, dto: CreateReviewDto) => {
    const res = await apiClient.post<{
      success: boolean
      data: Review
    }>(`/reviews/product/${productId}`, dto)

    return res.data.data
  },

  // ===== UPDATE =====
  update: async (reviewId: string, dto: UpdateReviewDto) => {
    const res = await apiClient.patch<{
      success: boolean
      data: Review
    }>(`/reviews/${reviewId}`, dto)

    return res.data.data
  },

  // ===== DELETE =====
  remove: async (reviewId: string) => {
    await apiClient.delete(`/reviews/${reviewId}`)
  },

  // ===== HELPFUL =====
  toggleHelpful: async (reviewId: string) => {
    const res = await apiClient.post<{
      success: boolean
      data: {
        helpful: boolean
        helpfulCount: number
      }
    }>(`/reviews/${reviewId}/helpful`)

    return res.data.data
  },

  checkHelpful: async (reviewId: string) => {
    const res = await apiClient.get<{
      success: boolean
      data: {
        helpful: boolean
      }
    }>(`/reviews/${reviewId}/helpful`)

    return res.data.data
  },
}