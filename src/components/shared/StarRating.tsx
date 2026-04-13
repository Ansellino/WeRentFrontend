interface Props {
  value: number
  readonly?: boolean
  onChange?: (v: number) => void
  className?: string
}
 
export function StarRating({ value, readonly, onChange, className = '' }: Props) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {[1,2,3,4,5].map(star => (
        <button key={star}
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`text-lg ${star <= value ? 'text-yellow-400' : 'text-gray-300'} ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}
