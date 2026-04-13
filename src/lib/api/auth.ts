import { apiClient } from '@/lib/api/client'
import type { AuthResponse, User } from '@/lib/types'
 
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    apiClient.post<{ success: boolean; data: AuthResponse }>('/auth/register', data)
      .then(r => r.data.data),
 
  login: (data: { email: string; password: string }) =>
    apiClient.post<{ success: boolean; data: AuthResponse }>('/auth/login', data)
      .then(r => r.data.data),
 
  me: () =>
    apiClient.get<{ success: boolean; data: User }>('/auth/me')
      .then(r => r.data.data),
 
  refresh: () =>
    apiClient.post<{ success: boolean; data: { access_token: string } }>('/auth/refresh')
      .then(r => r.data.data),
}
