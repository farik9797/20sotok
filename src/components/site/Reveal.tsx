import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

const hidden = { opacity: 0, y: 28 }
const visible = { opacity: 1, y: 0 }

/**
 * Мягкое появление блока при скролле. Элементы, уже попавшие во вьюпорт при монтировании
 * (например, после ленивой загрузки страницы), показываются сразу — без ожидания IntersectionObserver.
 * При prefers-reduced-motion анимации нет.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'article' | 'li' }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) setSeen(true)
  }, [])
  const show = reduce || inView || seen
  const M = as === 'article' ? motion.article : as === 'li' ? motion.li : motion.div
  return (
    <M ref={ref as never} initial={reduce ? false : hidden} animate={show ? visible : hidden}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </M>
  )
}
