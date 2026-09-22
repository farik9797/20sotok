import { useState } from 'react'
import { BeforeAfter } from '@/components/site/BeforeAfter'
import { CaseCard } from '@/components/site/CaseCard'
import { CtaBand } from '@/components/site/CtaBand'
import { Icon } from '@/components/site/Icon'
import { Reveal } from '@/components/site/Reveal'
import { Section } from '@/components/site/Section'
import { Seo } from '@/components/site/Seo'
import { cases, tagNames } from '@/data/content'
import { img } from '@/lib/site'
import { cn } from '@/lib/utils'

const filters = [['all', 'Все'], ['paving', 'Мощение'], ['lawn', 'Газон'], ['irrigation', 'Полив'], ['drainage', 'Дренаж'], ['lighting', 'Освещение']]

export default function Projects() {
  const [f, setF] = useState('all')
  const feat = cases[0]
  const rest = cases.slice(1).filter((c) => f === 'all' || c.tags.split(' ').includes(f))
  return (
    <>
      <Seo title="Наши проекты — инженерные кейсы «20 соток»" description="Портфолио студии инженерного благоустройства «20 соток»: объекты в Тарасово, Колодищах, Раубичах, Валерьяново, Марьяливо с описанием скрытых работ." path="/proekty" />
      <Section tone="sheet" className="pt-40 md:pt-44">
        <Reveal className="mb-10 grid gap-5 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div><div className="eyebrow mb-5">Наши проекты · Минск и Минский район</div><h1 className="h1 text-[clamp(2.4rem,4.8vw,4.6rem)]">Инженерные кейсы: что скрыто под газоном и плиткой</h1></div>
          <p className="lead text-stone-2/62 lg:pb-2">Каждый объект — с локацией, площадью, ТЗ заказчика, описанием скрытых работ, фото «до / после» и отзывом. Кейсы ниже — пример наполнения.</p>
        </Reveal>
        <Reveal className="flex flex-wrap gap-2">
          {filters.map(([k, l]) => <button key={k} type="button" onClick={() => setF(k)} className={cn('min-h-11 rounded-full border border-stone-2/15 px-4 text-[.88rem] transition-colors hover:border-stone-2 hover:bg-stone-2 hover:text-ink', f === k && 'border-stone-2 bg-stone-2 text-ink')}>{l}</button>)}
        </Reveal>
      </Section>

      <Section id={feat.id} className="py-0 md:py-0">
        <Reveal as="article" className="border border-stone-2/15 bg-ink-2 p-[clamp(20px,3vw,40px)]">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <BeforeAfter before={img('hero')} after={img(feat.img)} beforeLabel="Процесс" afterLabel="Результат" altBefore="Укладка тротуарной плитки: подрезка и подгонка элементов" altAfter="Двор после благоустройства" />
              <p className="mt-3 text-[.85rem] text-stone-2/62">Потяните ползунок: слева — этап работ, справа — сданный объект.</p>
            </div>
            <div className="lg:col-span-5">
              <div className="flex flex-wrap gap-4 text-[.82rem] text-stone-2/62">
                <span className="inline-flex items-center gap-1.5"><Icon name="map-pin" className="size-3.5" />{feat.place}</span>
                <span className="inline-flex items-center gap-1.5"><Icon name="layout-grid" className="size-3.5" />{feat.area}</span>
                <span className="inline-flex items-center gap-1.5"><Icon name="calendar" className="size-3.5" />{feat.year}</span>
              </div>
              <h2 className="h2 mt-4 text-[clamp(1.7rem,2.8vw,2.6rem)]">{feat.title}</h2>
              <dl className="mt-8 text-[.95rem]">
                {[['ТЗ клиента', feat.tz], ['Системы', feat.tags.split(' ').map((t) => tagNames[t]).join(', ')], ['Срок', '26 рабочих дней']].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[140px_1fr] gap-4 border-t border-stone-2/15 py-3.5"><dt className="text-[.85rem] text-stone-2/62">{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </div>
          </div>
          <div className="mt-12 grid gap-10 border-t border-stone-2/15 pt-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-5">Скрытые работы</div>
              <ul className="grid gap-4 text-[.98rem]">{feat.hidden.map((h, i) => <li key={h} className="flex gap-3"><span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-brass text-[12px] font-semibold text-[#1B1F24]">{i + 1}</span><span>{h}</span></li>)}</ul>
            </div>
            <div className="lg:col-span-5">
              <div className="eyebrow mb-5">Отзыв заказчика</div>
              <blockquote className="border-l border-brass pl-6 text-[1.05rem] leading-relaxed"><Icon name="quote" className="size-6 text-brass" /><p className="mt-3">{feat.review.text}</p><footer className="mt-3.5 text-[.85rem] text-stone-2/62">— {feat.review.author}</footer></blockquote>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{rest.map((c, i) => <Reveal key={c.id} delay={(i % 3) * 0.08}><CaseCard c={c} /></Reveal>)}</div>
        <p className="mt-10 text-[.9rem] text-stone-2/62">По клику каждый кейс раскрывается в такой же формат, как первый: ТЗ, скрытые работы, «до / после», отзыв.</p>
      </Section>
      <CtaBand title="Хотите такой же результат на своём участке?" text="Начните с расчёта: три вопроса — и мы подберём похожие объекты из портфолио и подготовим предварительную смету." />
    </>
  )
}
