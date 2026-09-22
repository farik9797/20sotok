import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'
import { Icon } from './Icon'

/** Тонкая латунная линия прогресса прокрутки. */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })
  if (reduce) return null
  return <motion.div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-brass" style={{ scaleX }} />
}

/** Кнопка «наверх»: появляется после 600px прокрутки. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  const reduce = useReducedMotion()
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <button type="button" aria-label="Наверх" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
      className={cn('fixed right-[clamp(16px,2.5vw,32px)] bottom-[calc(clamp(16px,2.5vw,32px)+env(safe-area-inset-bottom,0px))] z-[70] grid size-[46px] place-items-center rounded-full border border-stone-2/15 bg-ink-2/80 text-stone-2 backdrop-blur-md transition-[opacity,translate,background-color,border-color,color] duration-300 hover:border-brass hover:bg-brass hover:text-[#1B1F24] md:size-[52px]', show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0')}>
      <Icon name="chevron-down" className="size-5 rotate-180" />
    </button>
  )
}

/** Фирменный курсор: латунная точка и кольцо, увеличивается на ссылках и показывает подпись на карточках. Только для мыши. */
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<{ visible: boolean; active: boolean; label: string; text: boolean; down: boolean }>({ visible: false, active: false, label: '', text: false, down: false })
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 }), ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 })
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setState((s) => (s.visible ? s : { ...s, visible: true })) }
    const leave = () => setState((s) => ({ ...s, visible: false }))
    const over = (e: MouseEvent) => {
      const t = (e.target as Element).closest?.('[data-cursor-label]') as HTMLElement | null
      const i = (e.target as Element).closest?.('a,button,label,[role=button],input[type=range]')
      const txt = (e.target as Element).closest?.('input:not([type=range]),textarea,select')
      setState((s) => ({ ...s, label: t?.dataset.cursorLabel ?? '', active: !!i && !t, text: !!txt }))
    }
    const down = () => setState((s) => ({ ...s, down: true })), up = () => setState((s) => ({ ...s, down: false }))
    window.addEventListener('pointermove', move, { passive: true }); document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseover', over); document.addEventListener('pointerdown', down); document.addEventListener('pointerup', up)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('mouseleave', leave); document.removeEventListener('mouseover', over); document.removeEventListener('pointerdown', down); document.removeEventListener('pointerup', up); document.documentElement.classList.remove('has-cursor') }
  }, [reduce, x, y])
  if (!enabled) return null
  const size = state.label ? 92 : state.active ? 56 : 36
  const hidden = !state.visible || state.text
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass" style={{ x, y, opacity: hidden ? 0 : 1 }} />
      <motion.div aria-hidden className={cn('pointer-events-none fixed left-0 top-0 z-[90] grid place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-300', state.label ? 'border-brass bg-ink/70 backdrop-blur-sm' : state.active ? 'border-brass bg-brass/12' : 'border-stone-2/55')}
        style={{ x: rx, y: ry, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, opacity: hidden ? 0 : 1, scale: state.down ? 0.88 : 1 }}>
        <span className={cn('whitespace-nowrap text-[10px] font-semibold uppercase tracking-[.14em] text-stone-2 transition-opacity', state.label ? 'opacity-100' : 'opacity-0')}>{state.label}</span>
      </motion.div>
    </>
  )
}

/** Параллакс изображения внутри контейнера с overflow:hidden. */
export function ParallaxImg({ src, alt, className, strength = 7, ...rest }: Omit<HTMLMotionProps<'img'>, 'ref'> & { strength?: number }) {
  const ref = useRef<HTMLImageElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yPct = useTransform(scrollYProgress, [0, 1], [-strength, strength])
  const yStr = useTransform(yPct, (v) => `${v}%`)
  return <motion.img ref={ref} src={src} alt={alt} className={cn('will-change-transform', className)} style={reduce ? undefined : { y: yStr, scale: 1.14 }} {...rest} />
}

/** Крупный номер секции слегка въезжает слева по мере прокрутки. */
export function DriftNum({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 55%'] })
  const x = useTransform(scrollYProgress, [0, 1], [-28, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1])
  return <motion.span ref={ref} className={cn('inline-block', className)} style={reduce ? undefined : { x, opacity }}>{children}</motion.span>
}

/** Счётчик: целое число набирается от 0 при появлении в зоне видимости. */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const reduce = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) { el.textContent = String(value); return }
    const controls = animate(0, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { el.textContent = String(Math.round(v)) } })
    return () => controls.stop()
  }, [inView, value, reduce])
  return <span ref={ref} className={className}>{value}</span>
}

/** Вертикальная линия шагов, «прорисовывается» по мере прокрутки блока. */
export function StepsLine({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 75%', 'end 60%'] })
  return <motion.span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-0.5 origin-top bg-brass" style={reduce ? undefined : { scaleY: scrollYProgress }} />
}
