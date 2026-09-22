import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * «Лазерный нивелир» — фирменный интерактив первого экрана.
 * Красная линия следует за курсором, как луч нивелира на стройплощадке,
 * и показывает условную отметку высоты относительно центра экрана.
 * На сенсорных экранах луч медленно «сканирует» сам, при prefers-reduced-motion — статичен.
 */
export function LaserLevel({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion()
  const [pos, setPos] = useState<{ x: number; y: number; h: number; w: number } | null>(null)
  const [coarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || coarse || reduce) return
    const onMove = (e: PointerEvent) => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        raf.current = null
        const r = el.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top, h: r.height, w: r.width })
      })
    }
    const onLeave = () => setPos(null)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [containerRef, coarse, reduce])

  if (reduce) return null

  // Сенсорные экраны: автоматический медленный «скан»
  if (coarse || !pos) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
        <div className="laser-line animate-laser-sweep opacity-70" />
      </div>
    )
  }

  const elevation = (((pos.h / 2 - pos.y) / pos.h) * 0.6).toFixed(3)
  const sign = Number(elevation) >= 0 ? '+' : ''
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      <div className="laser-line" style={{ top: pos.y }} />
      <div className="laser-vline" style={{ left: pos.x }} />
      <div
        className="absolute rounded-md border border-laser/60 bg-brand-950/80 px-2.5 py-1.5 font-mono text-[11px] leading-none tracking-wider text-white/90 backdrop-blur-sm"
        style={{ left: Math.min(pos.x + 16, pos.w - 150), top: Math.max(pos.y - 44, 12) }}
      >
        <span className="text-laser">●</span> отметка {sign}{elevation} м
        <div className="mt-1 text-[10px] text-white/50">лазерный нивелир · точность 1 мм</div>
      </div>
    </div>
  )
}
