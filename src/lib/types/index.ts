// ── Auth ─────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
  avatarUrl?: string | null
  createdAt: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  avatarUrl?: string | null
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: AuthUser
}

// ── Product ──────────────────────────────────────────

export interface Product {
  id: string
  name: string
  description: string
  pricePerDay: number
  category: string
  images: string[]
  sizes: string[]
  avgRating: number
  totalReviews: number
  fitScale: 'true_to_size' | 'runs_small' | 'runs_large'
}

export interface ProductListItem {
  id: string
  name: string
  category: string
  pricePerDay: number
  images: string[]
  avgRating: number
  totalReviews: number
  
}

export interface Availability {
  available: boolean
  startDate: string
  endDate: string
  size: string
  unavailableDates: string[]
}

export interface ReviewSummary {
  avgRating: number
  distribution: Record<'1' | '2' | '3' | '4' | '5', number>
  fitScale: { small: number; true: number; large: number }
  total: number
}

// ── Review ───────────────────────────────────────────

export interface Review {
  id: string
  productId: string
  userId: string
  user: {
    id: string
    name: string
    avatarUrl: string | null
  }
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  fit: 'small' | 'true' | 'large'
  measurements: {
    bust: number
    waist: number
    hips: number
  }
  mediaUrls: string[]
  helpfulCount: number
  isHelpful?: boolean
  isEdited: boolean
  createdAt: string
  updatedAt: string
}

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

// ── Cart ─────────────────────────────────────────────

export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage: string
  size: string
  quantity: number
  startDate: string
  rentalDays: number
  endDate: string
  pricePerDay: number
  subtotal: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface AddToCartDto {
  productId: string
  size: string
  quantity: number
  startDate: string
  rentalDays: number
}

export interface UpdateCartItemDto {
  quantity: number
}

// ── Shipment ─────────────────────────────────────────

export interface ShipmentOption {
  id: string
  courier: string
  service: string
  label: string
  estimatedDays: number
  price: number
}

// ── Order ────────────────────────────────────────────

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'

export interface OrderItem {
  id: string
  productId: string
  productName: string
  size: string
  quantity: number
  startDate: string
  rentalDays: number
  endDate: string
  subtotal: number
  review?: { id: string } | null
}

export interface Order {
  id: string
  status: OrderStatus
  items: OrderItem[]
  shippingAddress: string
  courier: string
  shippingCost: number
  total: number
  createdAt: string
}

// ── Shared (untuk module lain yang masih pakai wrapper) ─────────

export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
  }
}