import { apiClient } from '@/lib/api/client'
 
export const uploadApi = {
  reviewMedia: (file: File) => {
    const form = new FormData()
    form.append('file', file)
    return apiClient.post<{ success: boolean; data: { url: string; type: string } }>(
      '/upload/review-media', form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then(r => r.data.data)
  },
}
