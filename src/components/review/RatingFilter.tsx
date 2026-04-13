interface Props {
  selected: number[]
  onToggle: (rating: number) => void
}
 
export function RatingFilter({ selected, onToggle }: Props) {
  return (
    <div className='flex gap-2'>
      {[5,4,3,2,1].map(r => (
        <button key={r} onClick={() => onToggle(r)}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            selected.includes(r)
              ? 'border-green-600 bg-green-50 text-green-700'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {r}★
        </button>
      ))}
    </div>
  )
}
