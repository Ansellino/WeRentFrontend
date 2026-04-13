interface Props {
  fitScale: { small: number; true: number; large: number }
}
 
export function FitScaleChart({ fitScale }: Props) {
  const total = fitScale.small + fitScale.true + fitScale.large
  if (total === 0) return null
 
  const pct = (n: number) => Math.round((n / total) * 100)
  const dominant = fitScale.true >= fitScale.small && fitScale.true >= fitScale.large
    ? 'True to size'
    : fitScale.small > fitScale.large ? 'Runs small' : 'Runs large'
 
  return (
    <div>
      <p className='text-sm font-medium mb-2'>Fit Scale — <span className='text-green-700'>{dominant}</span></p>
      <div className='flex rounded overflow-hidden h-3'>
        {fitScale.small > 0 && (
          <div style={{ width: `${pct(fitScale.small)}%` }} className='bg-blue-300' title={`Runs small: ${pct(fitScale.small)}%`} />
        )}
        {fitScale.true > 0 && (
          <div style={{ width: `${pct(fitScale.true)}%` }} className='bg-green-400' title={`True to size: ${pct(fitScale.true)}%`} />
        )}
        {fitScale.large > 0 && (
          <div style={{ width: `${pct(fitScale.large)}%` }} className='bg-orange-300' title={`Runs large: ${pct(fitScale.large)}%`} />
        )}
      </div>
      <div className='flex gap-4 text-xs text-gray-500 mt-1'>
        <span className='flex gap-1 items-center'><span className='w-2 h-2 rounded-full bg-blue-300'/> Small {pct(fitScale.small)}%</span>
        <span className='flex gap-1 items-center'><span className='w-2 h-2 rounded-full bg-green-400'/> True {pct(fitScale.true)}%</span>
        <span className='flex gap-1 items-center'><span className='w-2 h-2 rounded-full bg-orange-300'/> Large {pct(fitScale.large)}%</span>
      </div>
    </div>
  )
}
