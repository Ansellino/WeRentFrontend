// reviewcard untuk menampilkan review
// reviewsummary untuk ringkasa
// rating filter untuk rating
// fitscalechart untuk menampilkan fit scale
// dony : reviewform untuk membuat review (per order, bukan per product)


'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { Star } from 'lucide-react'
import { reviewsApi } from '@/lib/api/reviews'

type FitType = 'small' | 'true' | 'large'

export default function ReviewForm({
    productId,
    onSubmit,
    hasReviewed = false,
    orderDetail,
    orderId,
    disabled = false,
}: {
    productId: string
    onSubmit?: (data: {
        rating: number
        comment: string
        fit: FitType
        orderId?: string
        orderDetail?: {
            size?: string
            quantity?: number
            rentalDuration?: number
        }
        measurements: {
            height: number
            weight: number
            bust: number
            waist: number
            hips: number
        }
    }) => void
    hasReviewed?: boolean
    orderId?: string
    disabled?: boolean
    orderDetail?: {
        size?: string
        quantity?: number
        rentalDuration?: number
    }
}) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState('')
    const [fit, setFit] = useState<FitType>('true')
    const [loading, setLoading] = useState(false)
    const [isReviewed, setIsReviewed] = useState(false)

    const isDisabled = disabled || isReviewed || hasReviewed

useEffect(() => {
    // kalau dari backend sudah pernah review
    if (hasReviewed) {
        setIsReviewed(true)
        return
    }

    // reset hanya ketika order berubah
    if (orderId) {
        setIsReviewed(false)
    }
}, [orderId, hasReviewed])

    const handleSubmit = async () => {
        if (isDisabled) {
            return alert('Kamu sudah pernah mereview produk ini')
        }
        if (!rating) return alert('Rating tidak boleh kosong')
        if (!comment) return alert('Comment tidak boleh kosong')

        setLoading(true)

        // saya memperbaiki agar sesuai dengan tipe DTO (tidak uppercase)
        const data = { 
            rating, 
            comment, 
            fit,
            orderId,
            orderDetail,
            measurements: {
                height: 1,
                weight: 1,
                bust: 1,
                waist: 1,
                hips: 1
            }
        }
        if (!productId) throw new Error('productId is required')

        try {
            if (onSubmit) {
                await onSubmit(data)
            } else {
                // fallback API
                await reviewsApi.create(productId, data)
            }

            setIsReviewed(true)

            // untuk reset form
            setRating(0)
            setComment('')
            setFit('true')
        } catch (err: unknown) {
            const error = err as {
                response?: {
                    data?: {
                        error?: {
                            code?: string
                            message?: string
                        }
                    }
                }
            }
            console.error(error)
            const code = error?.response?.data?.error?.code

            if (code === 'ALREADY_REVIEWED') {
                setIsReviewed(true)
                alert('Kamu sudah pernah mereview produk ini')
            } else if (code === 'ERROR') {
                alert(error?.response?.data?.error?.message)
            } else {
                alert('Gagal submit review')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="border border-border rounded-xl p-5 space-y-4 bg-background">
            <h3 className="text-lg font-semibold">Tulis Review anda disini</h3>
            {isDisabled && (
                <p className="text-sm text-red-500">
                    Kamu sudah pernah memberikan review untuk produk ini
                </p>
            )}

            {/* untuk Rating */}
            <div>
                <p className="text-sm mb-1">Rating : </p>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                        key={star}
                        size={20}
                        className={`cursor-pointer transition ${
                            (hover || rating) >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        onClick={() => !isDisabled && setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        />
                    ))}
                </div>
            </div>

            {/* untuk fit atau size */}
            <div>
                <p className="text-sm mb-1">Pilih Ukuranmu</p>
                <div className="flex gap-2">
                {[
                    { label: 'Kecil', value: 'small' },
                    { label: 'Pas', value: 'true' },
                    { label: 'Besar', value: 'large' },
                ].map((item) => (
                    <button
                        key={item.value}
                        onClick={() => !isDisabled && setFit(item.value as FitType)}
                        className={`px-3 py-1 rounded-full border transition ${
                            fit === item.value
                            ? 'bg-green-500 text-white border-green-500'
                            : 'border-border'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
                </div>
            </div>

            {/* untuk komentar */}
            <div>
                <p className="text-sm mb-1">Tulis Komentarmu Disini :</p>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Bagaimana pengalaman kamu?"
                    className="w-full border border-border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    rows={3}
                    disabled={isDisabled}
                />
            </div>

            {/* tombol submit */}
            <button
                type="button"
                onClick={() => {
                    if (loading || isDisabled) return
                    handleSubmit()
                }}
                disabled={loading || isDisabled}
                className={`w-full py-2 rounded-md transition ${
                    loading || isDisabled
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
            >
                {isDisabled ? 'Sudah Direview' : loading ? 'Mengirim...' : 'Kirim Review'}
            </button>
        </div>
    )
}