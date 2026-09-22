import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { hero } from '@/data/content'
import { asset } from '@/lib/site'
import { Icon } from './Icon'
import { LaserLevel } from './LaserLevel'
import { useQuiz } from './QuizContext'

export function Hero() {
  const ref = useRef<HTMLElement | null>(null)
  const reduce = useReducedMotion()
  const { open } = useQuiz()
  const item = (delay: number) => ({
    'data-reveal': '' as const,
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as const },
  })
  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink text-stone-2">
      <div className="absolute inset-0 -z-10">
        <video className="size-full object-cover [filter:brightness(.82)_saturate(.9)]" autoPlay muted loop playsInline preload="metadata" poster={asset('img/hero-poster.webp')} aria-hidden="true">
          <source src={asset('video/hero.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,47,53,.5)_0%,rgba(42,47,53,.3)_35%,rgba(42,47,53,.8)_75%,#2A2F35_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(42,47,53,.9)_0%,rgba(42,47,53,.62)_45%,rgba(42,47,53,0)_78%)]" />
      </div>
      <LaserLevel containerRef={ref} />
      <div className="wrap relative z-[4] flex flex-col justify-end pb-9 pt-28 md:min-h-[100svh] md:pb-14 md:pt-36">
        <motion.div {...item(0.15)} className="eyebrow mb-6">{hero.eyebrow}</motion.div>
        <motion.h1 {...item(0.27)} className="h1 font-normal text-stone-2 [text-shadow:0_2px_30px_rgba(42,47,53,.65)] lg:max-w-[30ch]">{hero.title}</motion.h1>
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-end">
          <motion.p {...item(0.39)} className="lead max-w-[50ch] text-stone [text-shadow:0_1px_18px_rgba(42,47,53,.6)] lg:col-span-7">{hero.lead}</motion.p>
          <motion.div {...item(0.51)} className="grid gap-3 lg:col-span-5 lg:w-max lg:justify-self-end">
            <button type="button" onClick={() => open()} className="btn btn-brass btn-lg w-full">{hero.cta} <Icon name="arrow-right" className="size-4" /></button>
            <Link to="/proekty" className="btn btn-ghost btn-lg w-full">{hero.ctaSecondary}</Link>
          </motion.div>
        </div>
        <motion.dl {...item(0.63)} className="mt-10 grid grid-cols-2 border-t border-stone-2/15 md:grid-cols-4 lg:mt-12">
          {hero.specs.map((s, i) => (
            <div key={s.label} className={`border-b border-stone-2/15 py-4 pr-5 md:border-b-0 md:border-r md:py-[18px] md:pr-7 ${i > 0 ? 'md:pl-7' : ''} md:last:border-r-0`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-heading text-[clamp(1.7rem,3vw,2.6rem)] font-extralight leading-none tracking-[-.03em] tabular-nums [text-shadow:0_1px_14px_rgba(42,47,53,.6)]">{s.val}<b className="font-normal">{s.b}</b></dd>
              <dd className="mt-1.5 text-[.76rem] leading-snug text-stone md:mt-2 md:text-[.8rem]">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
