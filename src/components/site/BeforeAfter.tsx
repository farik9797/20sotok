import { useState } from 'react'

export function BeforeAfter({ before, after, beforeLabel = 'До', afterLabel = 'После', altBefore, altAfter }: { before: string; after: string; beforeLabel?: string; afterLabel?: string; altBefore: string; altAfter: string }) {
  const [pos, setPos] = useState(50)
  return (
    <div className="ba" style={{ ['--pos' as string]: `${pos}%` }}>
      <img src={before} alt={altBefore} loading="lazy" decoding="async" />
      <img className="ba-after" src={after} alt={altAfter} loading="lazy" decoding="async" />
      <span className="absolute left-3.5 top-3.5 bg-ink/70 px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[.16em]">{beforeLabel}</span>
      <span className="absolute right-3.5 top-3.5 bg-ink/70 px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[.16em]">{afterLabel}</span>
      <div className="ba-handle" aria-hidden />
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Сравнение до и после" />
    </div>
  )
}
