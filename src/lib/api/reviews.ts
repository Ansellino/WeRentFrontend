import { apiClient } from '@/lib/api/client'
import type { Review, CreateReviewDto } from '@/lib/types'
 
export interface ReviewsParams {
  page?: number
  limit?: number
  rating?: number[]
  sort?: 'newest' | 'helpful'
  hasMedia?: boolean
}
 
export const reviewsApi = {
  list: (productId: string, params?: ReviewsParams) =>
  apiClient.get(`/reviews/product/${productId}`, {
    params: {
      ...params,
      // saya menambahkan fix agar rating array jadi string
      rating: params?.rating?.join(',')
    }
  }).then(r => ({ data: r.data.data, meta: r.data.meta })),

  // check if current user already reviewed this product
  hasReviewed: (productId: string) =>
    apiClient
      .get<{ success: boolean; data: { hasReviewed: boolean } }>(
        `/reviews/product/${productId}/me`
      )
      .then(r => r.data.data),

    create: (productId: string, dto: CreateReviewDto) => {
    const token = localStorage.getItem('token')
    console.log('TOKEN:', token)

    return apiClient.post<{ success: boolean; data: Review }>(
      `/reviews/product/${productId}`,
      {
        ...dto,
        measurements: {
          bust: 85,
          waist: 70,
          hips: 90
        }
      },
      {
        // saya menambahkan Authorization header agar tidak 400/401
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(r => r.data.data)
     .catch(err => {
       // saya menambahkan debug agar tahu error dari backend
       console.error('CREATE REVIEW ERROR:', err?.response?.data || err)
       throw err
     })
  },

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
