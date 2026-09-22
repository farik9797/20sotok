import { infographics } from '@/data/infographics'

/** Плоская инфографика из SVG-примитивов; на мобильном прокручивается горизонтально внутри рамки. */
export function Infographic({ kind, className }: { kind: keyof typeof infographics; className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-x-auto border border-stone-2/15 bg-ink-2/45 p-[clamp(18px,3vw,36px)] text-stone-2" dangerouslySetInnerHTML={{ __html: infographics[kind] }} />
    </div>
  )
}
