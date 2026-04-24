interface Props {
  fitScale: { small: number; true: number; large: number }
}

export function FitScaleChart({ fitScale }: Props) {
  const total = fitScale.small + fitScale.true + fitScale.large
  if (total === 0) return null

  const pct = (n: number) => Math.round((n / total) * 100)

  const entries = [
    { key: 'small', label: 'Runs small', value: fitScale.small },
    { key: 'true', label: 'True to size', value: fitScale.true },
    { key: 'large', label: 'Runs large', value: fitScale.large },
  ]

  const max = Math.max(...entries.map(e => e.value))
  const winners = entries.filter(e => e.value === max)
  const dominant = winners.length === 1 ? winners[0].label : 'Mixed fit'

  return (
    <div>
      <p className='text-sm font-medium mb-2'>
        Fit Scale —{' '}
        <span className='text-green-700'>
          {dominant === 'Mixed fit' ? 'Mixed sizing' : dominant}
        </span>
      </p>

      <div className='flex h-3 overflow-hidden rounded-full'>
        {fitScale.small > 0 && (
          <div style={{ flex: fitScale.small }} className='bg-blue-300'
            title={`Runs small: ${pct(fitScale.small)}%`} />
        )}
        {fitScale.true > 0 && (
          <div style={{ flex: fitScale.true }} className='bg-green-400'
            title={`True to size: ${pct(fitScale.true)}%`} />
        )}
        {fitScale.large > 0 && (
          <div style={{ flex: fitScale.large }} className='bg-orange-300'
            title={`Runs large: ${pct(fitScale.large)}%`} />
        )}
      </div>

      <div className='flex gap-4 text-xs text-gray-500 mt-1'>
        <span className='flex gap-1 items-center'>
          <span className='w-2 h-2 rounded-full bg-blue-300' />
          Small {pct(fitScale.small)}%
        </span>
        <span className='flex gap-1 items-center'>
          <span className='w-2 h-2 rounded-full bg-green-400' />
          True {pct(fitScale.true)}%
        </span>
        <span className='flex gap-1 items-center'>
          <span className='w-2 h-2 rounded-full bg-orange-300' />
          Large {pct(fitScale.large)}%
        </span>
      </div>
    </div>
  )
}