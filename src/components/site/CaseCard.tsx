import { Link } from 'react-router'
import { tagNames, type Case } from '@/data/content'
import { img } from '@/lib/site'
import { ParallaxImg } from './Effects'
import { Icon } from './Icon'

export function CaseCard({ c }: { c: Case }) {
  return (
    <Link to={`/proekty#${c.id}`} data-cursor-label="Кейс" className="group block border border-stone-2/15 bg-ink-2 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-stone-2/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
        <ParallaxImg src={img(c.img)} alt={`${c.title} — ${c.place}`} loading="lazy" decoding="async" width={1600} height={1200} strength={6} className="size-full object-cover transition-[filter] duration-700 group-hover:brightness-110" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
        <div className="absolute inset-x-4 bottom-3.5 flex justify-between text-[11px] font-medium uppercase tracking-[.14em] text-stone-2/85"><span>{c.place}</span><span>{c.year}</span></div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-4 text-[.82rem] text-stone-2/62">
          <span className="inline-flex items-center gap-1.5"><Icon name="map-pin" className="size-3.5" />{c.place}</span>
          <span className="inline-flex items-center gap-1.5"><Icon name="layout-grid" className="size-3.5" />{c.area}</span>
          <span className="inline-flex items-center gap-1.5"><Icon name="calendar" className="size-3.5" />{c.year}</span>
        </div>
        <h3 className="h3 mt-3">{c.title}</h3>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {c.tags.split(' ').map((t) => <span key={t} className="border border-stone-2/15 px-2.5 py-1 text-[10.5px] uppercase tracking-[.12em] text-stone-2/62">{tagNames[t]}</span>)}
        </div>
      </div>
    </Link>
  )
}
