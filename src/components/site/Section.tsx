import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { DriftNum } from './Effects'
import { Reveal } from './Reveal'

type Tone = 'ink' | 'sheet' | 'light'
const tones: Record<Tone, string> = { ink: 'bg-ink text-stone-2', sheet: 'sheet text-stone-2', light: 'bg-stone text-ink' }

export function Section({ id, tone = 'ink', className, children }: { id?: string; tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn('py-20 md:py-28 scroll-mt-20', tones[tone], className)}>
      <div className="wrap">{children}</div>
    </section>
  )
}

/** Заголовок секции с крупной тонкой нумерацией в стиле архитектурных бюро. */
export function SectionHead({ n, eyebrow, title, lead, aside, wide, light }: { n: string; eyebrow: string; title: string; lead?: string; aside?: ReactNode; wide?: boolean; light?: boolean }) {
  return (
    <Reveal className={cn('mb-10 grid gap-5 lg:mb-16 lg:items-end', wide ? 'lg:grid-cols-[2fr_1fr]' : 'lg:grid-cols-2')}>
      <div>
        <div className="mb-5 flex items-baseline gap-4">
          <DriftNum className={cn('num text-[clamp(3.2rem,6vw,6rem)]', light ? 'text-ink' : 'text-stone-2/90')}>{n}</DriftNum>
          <span className="eyebrow -translate-y-[.6em]">{eyebrow}</span>
        </div>
        <h2 className="h2">{title}</h2>
      </div>
      {lead && <p className={cn('lead max-w-[50ch]', light ? 'text-ink/65' : 'text-stone-2/62')}>{lead}</p>}
      {aside}
    </Reveal>
  )
}
