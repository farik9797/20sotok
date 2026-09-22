import { Link, useParams } from 'react-router'
import { CaseCard } from '@/components/site/CaseCard'
import { Icon } from '@/components/site/Icon'
import { Infographic } from '@/components/site/Infographic'
import { Quiz } from '@/components/site/Quiz'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHead } from '@/components/site/Section'
import { Seo } from '@/components/site/Seo'
import { cases, servicePages, tileFormats, type ExtraGrid, type ExtraTable } from '@/data/content'
import { img, scrollToId } from '@/lib/site'
import NotFound from './NotFound'

function ExtraBlock({ extra }: { extra: ExtraGrid | ExtraTable }) {
  return (
    <Section tone="sheet">
      <SectionHead n={extra.n} eyebrow={extra.eyebrow} title={extra.title} lead={extra.lead} />
      {extra.kind === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {extra.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06} className="border border-stone-2/15 px-6 pb-7 pt-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-stone-2/40">
              <Icon name={it.icon} className="size-8 text-brass" />
              <h3 className="mt-5 font-heading text-[1.1rem] font-medium leading-tight">{it.title}</h3>
              <p className="mt-2.5 text-[.93rem] text-stone-2/62">{it.text}</p>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="overflow-x-auto">
          <table className="w-full border-collapse text-[.95rem]">
            <thead><tr><th className="border-t border-stone-2/15 p-4 text-left" /><th className="border-t border-stone-2/15 p-4 text-left font-heading text-[1.05rem] font-medium">{extra.head[0]}</th><th className="border-t border-stone-2/15 p-4 text-left font-heading text-[1.05rem] font-medium">{extra.head[1]}</th></tr></thead>
            <tbody>
              {extra.rows.map((r) => (
                <tr key={String(r[0])}>
                  <td className="w-[28%] border-t border-stone-2/15 p-4 align-top text-[.88rem] text-stone-2/62">{r[0]}</td>
                  <td className={`border-t border-stone-2/15 p-4 align-top ${r[3] === 0 ? 'font-medium text-brass' : ''}`}>{r[1]}</td>
                  <td className={`border-t border-stone-2/15 p-4 align-top ${r[3] === 1 ? 'font-medium text-brass' : ''}`}>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      )}
    </Section>
  )
}

function TileFormats() {
  return (
    <Section tone="light">
      <SectionHead n="04b" eyebrow="Форматы плитки" title="Плитка и камень, с которыми работаем" light
        lead="Реальные форматы с наших объектов. Стоимость работ для стандартных форматов считаем по объёму и основанию — за минуту в калькуляторе ниже." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {tileFormats.map((t, i) => (
          <Reveal key={t.name} delay={(i % 5) * 0.05} className="group overflow-hidden border border-ink/10 bg-stone-2">
            <div className="aspect-[4/3] overflow-hidden"><img src={img(t.img)} alt={`Тротуарная плитка «${t.name}»`} loading="lazy" decoding="async" width={900} height={675} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="flex items-start justify-between gap-2 p-3.5"><span className="text-[.9rem] font-medium">{t.name}</span>{t.price && <span className="whitespace-nowrap text-[.75rem] text-ink/65">{t.price}</span>}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default function Service() {
  const { slug } = useParams()
  const p = servicePages.find((s) => s.slug === slug)
  if (!p) return <NotFound />
  const related = cases.filter((c) => c.tags.split(' ').includes(p.pre)).slice(0, 3)
  return (
    <>
      <Seo title={p.seoTitle} description={p.seoDesc} path={`/uslugi/${p.slug}`} />
      <section className="relative isolate overflow-hidden bg-ink text-stone-2">
        <div className="absolute inset-0 -z-10"><img src={img(p.hero)} alt="" aria-hidden="true" className="size-full object-cover [filter:brightness(.82)_saturate(.9)]" width={1600} height={1200} />
          <div className="absolute inset-0 bg-ink/45" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,47,53,.45)_0%,rgba(42,47,53,.1)_35%,rgba(42,47,53,.78)_75%,#2A2F35_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,47,53,.7),transparent_65%)]" /></div>
        <div className="wrap flex flex-col justify-end pb-9 pt-28 md:min-h-[62vh] md:pb-14 md:pt-36">
          <Reveal><div className="eyebrow mb-6">Услуга {p.n} · {p.tag}</div><h1 className="h1 font-normal text-stone-2 [text-shadow:0_2px_30px_rgba(42,47,53,.65)] lg:max-w-[30ch]">{p.h1}</h1></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal delay={0.1} className="lg:col-span-7"><p className="lead max-w-[50ch] text-stone [text-shadow:0_1px_18px_rgba(42,47,53,.6)]">{p.lead}</p></Reveal>
            <Reveal delay={0.15} className="grid gap-3 lg:col-span-5 lg:w-max lg:justify-self-end">
              <button type="button" onClick={() => scrollToId('raschet')} className="btn btn-brass btn-lg w-full">Рассчитать бюджет за 1 минуту <Icon name="arrow-right" className="size-4" /></button>
              <Link to="/proekty" className="btn btn-ghost btn-lg w-full">Проекты</Link>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 border-t border-stone-2/15 md:grid-cols-4">
              {p.specs.map((s, i) => (
                <div key={s.label} className={`border-b border-stone-2/15 py-4 pr-5 md:border-b-0 md:border-r md:py-[18px] md:pr-7 ${i > 0 ? 'md:pl-7' : ''} md:last:border-r-0`}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-heading text-[clamp(1.7rem,3vw,2.6rem)] font-extralight leading-none tracking-[-.03em] tabular-nums [&_b]:font-normal" dangerouslySetInnerHTML={{ __html: s.val }} />
                  <dd className="mt-2 text-[.8rem] leading-snug text-stone">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <Section id="sostav">
        <SectionHead n="01" eyebrow="Что входит" title={p.inclTitle} lead={p.inclLead} />
        <div className="grid gap-x-10 border-b border-stone-2/15 md:grid-cols-2 lg:grid-cols-3">
          {p.includes.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.06} className="grid grid-cols-[56px_1fr] gap-4 border-t border-stone-2/15 py-7">
              <div className="num text-[1.9rem] text-stone-2/62">{String(i + 1).padStart(2, '0')}</div>
              <div><h3 className="font-heading text-[1.1rem] font-medium leading-tight">{it.title}</h3><p className="mt-1.5 text-[.95rem] text-stone-2/62">{it.text}</p></div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="inzheneriya" tone="sheet">
        <SectionHead n="02" eyebrow="Инженерия" title={p.infoTitle} lead={p.infoLead} />
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8"><Infographic kind={p.infographic} /></Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:pl-4">
            <ol className="grid gap-3 text-[.92rem]">
              {p.legend.map((t, i) => <li key={t} className="flex gap-3"><span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-brass text-[12px] font-semibold text-[#1B1F24]">{i + 1}</span><span>{t}</span></li>)}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section id="expert" tone="light">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="mb-5 flex items-baseline gap-4"><span className="num text-[clamp(3.2rem,6vw,6rem)] text-ink">03</span><span className="eyebrow -translate-y-[.6em]">Экспертный блок</span></div>
            <h2 className="h2">{p.expTitle}</h2>
            <p className="mt-6 flex items-start gap-2 text-[.85rem] text-ink/65"><Icon name="file-pen-line" className="mt-0.5 size-4 shrink-0" /> Блок редактируется в админке сайта: статьи, фото, схемы дополняются по мере накопления кейсов.</p>
            <div className="relative mt-8 overflow-hidden bg-ink-3">
              <img src={img(p.expImg)} alt={p.expTitle} loading="lazy" decoding="async" width={1600} height={1200} className="aspect-[4/3] size-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-3.5 text-[11px] font-medium uppercase tracking-[.14em] text-stone-2/85">{p.expImgCap}</div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="prose-site max-w-[66ch] text-[1.05rem] text-ink/85 lg:col-span-7 lg:pl-8" >
            <div dangerouslySetInnerHTML={{ __html: p.expHtml }} />
          </Reveal>
        </div>
      </Section>

      <ExtraBlock extra={p.extra} />
      {p.slug === 'plitka' && <TileFormats />}

      <Section id="raschet" tone="sheet">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="mb-5 flex items-baseline gap-4"><span className="num text-[clamp(3.2rem,6vw,6rem)] text-stone-2/90">05</span><span className="eyebrow -translate-y-[.6em]">Расчёт</span></div>
              <h2 className="h2">Предварительный бюджет — за 1 минуту</h2>
              <p className="mt-6 text-stone-2/62">Три вопроса. Ответ — цифры и примеры похожих объектов в Telegram или Viber. Выезд инженера на участок платный, стоимость засчитывается в смету.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8"><Quiz key={p.slug} preselect={p.pre} /></Reveal>
        </div>
      </Section>

      <Section id="proekty">
        <SectionHead n="06" eyebrow="Проекты" title={`Объекты, где мы делали ${p.relWord}`} wide aside={<div className="lg:justify-self-end"><Link className="btn btn-ghost" to="/proekty">Все инженерные кейсы <Icon name="arrow-right" className="size-4" /></Link></div>} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {related.map((c, i) => <Reveal key={c.id} delay={i * 0.08}><CaseCard c={c} /></Reveal>)}
        </div>
      </Section>
    </>
  )
}
