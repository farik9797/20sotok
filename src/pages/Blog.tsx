import { CtaBand } from '@/components/site/CtaBand'
import { Icon } from '@/components/site/Icon'
import { Reveal } from '@/components/site/Reveal'
import { Section } from '@/components/site/Section'
import { Seo } from '@/components/site/Seo'
import { posts } from '@/data/content'
import { img } from '@/lib/site'

export default function Blog() {
  return (
    <>
      <Seo title="Полезно знать — блог студии «20 соток»" description="Экспертный блог студии инженерного благоустройства «20 соток»: подготовка грунта, газон, автополив, дренаж, уход за участком." path="/blog" />
      <Section tone="sheet" className="pb-0 pt-40 md:pb-0 md:pt-44">
        <Reveal className="grid gap-5 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div><div className="eyebrow mb-5">Полезно знать · экспертный блог</div><h1 className="h1 text-[clamp(2.4rem,4.8vw,4.6rem)]">Инженерные заметки о том, что не видно под газоном</h1></div>
          <p className="lead text-stone-2/62 lg:pb-2">Статьи руководителя студии Евгения Денисова: как устроены основания, полив и дренаж, на чём нельзя экономить и как ухаживать за участком.</p>
        </Reveal>
        <div className="flex flex-wrap gap-2 py-12">{['Все статьи', 'Инженерия', 'Мощение', 'Газон', 'Полив', 'Дренаж', 'Уход'].map((c) => <span key={c} className="rounded-full border border-stone-2/15 px-3.5 py-2 text-[.85rem]">{c}</span>)}</div>
      </Section>
      <Section className="pt-0 md:pt-0">
        <div className="border-b border-stone-2/15">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <a href="#" className="group grid gap-5 border-t border-stone-2/15 py-7 md:grid-cols-[220px_1fr_auto] md:items-start md:gap-8">
                <div className="aspect-[4/3] overflow-hidden bg-ink-3"><img src={img(p.img)} alt="" loading="lazy" decoding="async" width={900} height={675} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <div>
                  <div className="mb-2.5 flex flex-wrap gap-4 text-[.82rem] text-stone-2/62"><span>{p.cat}</span><span className="inline-flex items-center gap-1.5"><Icon name="ruler" className="size-3.5" /> {p.time}</span></div>
                  <h2 className="h3 transition-colors group-hover:text-brass">{p.title}</h2>
                  <p className="mt-2.5 max-w-[60ch] text-stone-2/62">{p.text}</p>
                </div>
                <span className="hidden size-12 place-items-center rounded-full border border-stone-2/15 transition-colors group-hover:border-brass group-hover:bg-brass group-hover:text-[#1B1F24] md:grid"><Icon name="arrow-up-right" className="size-5" /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand title="Вопрос по своему участку?" text="Расчёт занимает минуту, а ответ приходит в Telegram или Viber вместе с примерами похожих объектов." />
    </>
  )
}
