'use client'

import { useState } from 'react'
import { Star, X, ImagePlus } from 'lucide-react'
import { reviewsApi } from '@/lib/api/reviews'

type FitType = 'small' | 'true' | 'large'

interface Props {
  productId: string
  productName: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ReviewForm({ productId, productName, onSuccess, onCancel }: Props) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [fit, setFit] = useState<FitType>('true')
  const [measurements, setMeasurements] = useState({ bust: 0, waist: 0, hips: 0 })
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setError(null)
    if (!rating) return setError('Rating tidak boleh kosong')
    if (!comment.trim()) return setError('Komentar tidak boleh kosong')
    if (!measurements.bust || !measurements.waist || !measurements.hips)
      return setError('Ukuran badan harus diisi')

    setLoading(true)
    try {
      await reviewsApi.create(productId, {
        rating,
        comment,
        fit,
        measurements,
        mediaUrls: mediaUrls.filter((url) => url.trim() !== ''),
      })
      onSuccess?.()
    } catch (err) {
      const error = err as { response?: { data?: { error?: { code?: string } } } }
      const code = error?.response?.data?.error?.code
      if (code === 'REVIEW_NOT_ELIGIBLE') {
        setError('Kamu belum memiliki pesanan selesai untuk produk ini')
      } else {
        setError('Gagal mengirim review, coba lagi')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-border rounded-xl p-5 space-y-4 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Review: {productName}</h3>
        {onCancel && (
          <button onClick={onCancel} className="text-sm text-muted-foreground hover:underline">
            Batal
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">{error}</p>
      )}

      {/* Rating */}
      <div>
        <p className="text-sm mb-1 font-medium">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={22}
              className={`cursor-pointer transition-colors ${
                (hover || rating) >= star
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>
      </div>

      {/* Fit */}
      <div>
        <p className="text-sm mb-1 font-medium">Ukuran terasa?</p>
        <div className="flex gap-2">
          {([
            { label: 'Kecil', value: 'small' },
            { label: 'Pas', value: 'true' },
            { label: 'Besar', value: 'large' },
          ] as { label: string; value: FitType }[]).map((item) => (
            <button
              key={item.value}
              onClick={() => setFit(item.value)}
              className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                fit === item.value
                  ? 'bg-green-500 text-white border-green-500'
                  : 'border-border hover:border-green-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Measurements */}
      <div>
        <p className="text-sm mb-2 font-medium">Ukuran badan kamu (cm)</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { key: 'bust', label: 'Dada' },
            { key: 'waist', label: 'Pinggang' },
            { key: 'hips', label: 'Pinggul' },
          ] as { key: keyof typeof measurements; label: string }[]).map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs text-muted-foreground">{label}</label>
              <input
                type="number"
                min={0}
                value={measurements[key] || ''}
                onChange={(e) =>
                  setMeasurements((prev) => ({ ...prev, [key]: Number(e.target.value) }))
                }
                placeholder="cm"
                className="w-full border border-border rounded-md p-2 text-sm mt-0.5"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <p className="text-sm mb-1 font-medium">Komentar</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Bagaimana pengalaman kamu menyewa produk ini?"
          className="w-full border border-border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          rows={3}
        />
      </div>

      {/* Media URLs */}
      <div>
        <p className="text-sm mb-2 font-medium">Foto (opsional)</p>
        {mediaUrls.map((url, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={url}
              onChange={(e) =>
                setMediaUrls((prev) => prev.map((u, idx) => idx === i ? e.target.value : u))
              }
              placeholder="https://..."
              className="flex-1 border border-border rounded-md p-2 text-sm"
            />
            <button
              onClick={() => setMediaUrls((prev) => prev.filter((_, idx) => idx !== i))}
              className="text-red-500 hover:text-red-600 px-2"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {mediaUrls.length < 5 && (
          <button
            onClick={() => setMediaUrls((prev) => [...prev, ''])}
            className="flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-md text-sm text-muted-foreground hover:border-green-400 transition-colors"
          >
            <ImagePlus size={16} />
            Tambah URL Foto
          </button>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {loading ? 'Mengirim...' : 'Kirim Review'}
      </button>
    </div>
  )
}