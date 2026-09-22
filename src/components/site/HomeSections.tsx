import { Link } from 'react-router'
import { Marquee } from '@/components/ui/marquee'
import { brand, catalog, director, features, gallery, steps } from '@/data/content'
import { img } from '@/lib/site'
import { Icon, InstagramIcon } from './Icon'
import { useQuiz } from './QuizContext'
import { Reveal } from './Reveal'
import { Section, SectionHead } from './Section'

export function PlacesRibbon() {
  return (
    <div className="border-y border-stone-2/15 bg-ink" aria-hidden="true">
      <Marquee className="[--duration:38s] [--gap:3.5rem] py-3">
        {brand.places.map((p) => <span key={p} className="inline-flex items-center gap-3 whitespace-nowrap text-[.9rem] tracking-[.06em] text-stone-2/62"><Icon name="map-pin" className="size-3.5 text-brass" />{p}</span>)}
      </Marquee>
    </div>
  )
}

export function Features() {
  return (
    <Section id="preimushchestva" tone="sheet">
      <SectionHead n="02" eyebrow="Почему нам доверяют" title="Почему нам доверяют требовательные заказчики"
        lead="Наши клиенты — руководители, тимлиды и владельцы бизнеса. Им не нужно думать, где что заказать, и контролировать процесс: это делаем мы — по проекту, по договору, с отчётностью." />
      <div className="grid border-b border-stone-2/15 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal as="article" key={f.n} delay={i * 0.08} className="border-t border-stone-2/15 px-7 pb-10 pt-8 transition-colors hover:bg-stone-2/[.03] md:border-l md:first:border-l-0">
            <div className="num mb-9 text-[2.6rem] text-stone-2/62">{f.n}</div>
            <Icon name={f.icon} className="size-8 text-brass" />
            <h3 className="h3 mt-5 mb-3">{f.title}</h3>
            <p className="text-[.98rem] text-stone-2/62">{f.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Catalog() {
  return (
    <Section id="uslugi">
      <SectionHead n="03" eyebrow="Пакетные решения под ключ" title="Четыре инженерные системы — одна команда"
        lead="Выемка грунта спецтехникой, мощение, газон, автополив, дренаж и ливнёвка. Каждая система проектируется с учётом остальных — поэтому мы делаем всё сами." />
      <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
        {catalog.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 2) * 0.1}>
            <Link to={`/uslugi/${c.slug}`} className="group relative block overflow-hidden border border-stone-2/15 bg-ink-2 transition-transform duration-300 hover:-translate-y-0.5">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={img(c.img)} alt={c.title} loading="lazy" decoding="async" width={1600} height={1200} className="size-full object-cover transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.045]" />
              </div>
              <span className="absolute left-[18px] top-[18px] border border-stone-2/15 bg-ink/70 px-[11px] py-[7px] text-[10.5px] font-medium uppercase tracking-[.16em] backdrop-blur-sm">{c.n} / {c.tag}</span>
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-5 px-7 pb-8 pt-6">
                <div className="num pt-1 text-[2.2rem] text-stone-2/62">{c.n}</div>
                <div><h3 className="h3">{c.title}</h3><p className="mt-2 max-w-[44ch] text-[.95rem] text-stone-2/62">{c.text}</p></div>
                <span className="grid size-12 place-items-center rounded-full border border-stone-2/15 transition-colors group-hover:border-brass group-hover:bg-brass group-hover:text-[#1B1F24]"><Icon name="arrow-up-right" className="size-5" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Director() {
  return (
    <Section id="o-kompanii" tone="light">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative overflow-hidden bg-ink-3">
            <img src={img(director.img)} alt={`${director.name}, ${director.role.toLowerCase()}`} loading="lazy" decoding="async" width={1342} height={2000} className="aspect-[2/3] size-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-3.5 flex justify-between text-[11px] font-medium uppercase tracking-[.14em] text-stone-2/85"><span>{director.name}</span><span>{director.role.split(',')[0]}</span></div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:pl-8">
          <div className="mb-5 flex items-baseline gap-4"><span className="num text-[clamp(3.2rem,6vw,6rem)] text-ink">04</span><span className="eyebrow -translate-y-[.6em]">{director.eyebrow}</span></div>
          <h2 className="h2">{director.title}</h2>
          <div className="prose-site mt-8 max-w-[66ch] text-[1.06rem] text-ink/85">{director.text.map((p) => <p key={p}>{p}</p>)}</div>
          <div className="mt-8 flex items-center gap-5">
            <span className="num text-[2.6rem] text-brass">Е.Д.</span>
            <div><div className="font-heading text-[1.1rem] font-medium">{director.name}</div><div className="text-[.9rem] text-ink/65">{director.role}</div></div>
          </div>
          <dl className="mt-12 grid gap-x-8 sm:grid-cols-3">
            {director.stats.map((s) => (
              <div key={s.label} className="border-t border-ink/15 py-6">
                <dd className="num text-[clamp(2.8rem,4vw,4rem)]">{s.val}<span className="font-normal">{s.b}</span></dd>
                <dt className="mt-2 text-[.92rem] text-ink/65">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}

export function Process() {
  const { open } = useQuiz()
  return (
    <Section id="process" tone="sheet">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="mb-5 flex items-baseline gap-4"><span className="num text-[clamp(3.2rem,6vw,6rem)] text-stone-2/90">05</span><span className="eyebrow -translate-y-[.6em]">Как проходит работа</span></div>
            <h2 className="h2">От расчёта до гарантии — без вашего участия в стройке</h2>
            <p className="mt-6 text-stone-2/62">Пять шагов, на каждом из которых у вас есть цифры, документ или видеоотчёт.</p>
            <button type="button" onClick={() => open()} className="btn btn-brass mt-8">Начать с расчёта <Icon name="arrow-right" className="size-4" /></button>
          </div>
        </Reveal>
        <div className="border-b border-stone-2/15 lg:col-span-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="grid grid-cols-[72px_1fr] gap-6 border-t border-stone-2/15 py-8">
              <div className="num text-[2.6rem] text-stone-2/62">{s.n}</div>
              <div>
                <h3 className="h3">{s.title}</h3>
                <p className="mt-2 max-w-[60ch] text-[.98rem] text-stone-2/62">{s.text}</p>
                {s.note && <div className="mt-3 inline-flex items-center gap-2 text-[.85rem] text-brass"><Icon name="badge-check" className="size-4" />{s.note}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Portfolio() {
  const photos = gallery.slice(0, 6)
  return (
    <Section id="portfolio">
      <SectionHead n="06" eyebrow="Портфолио" title="Реальные объекты в Минске и Минском районе — каждую неделю в Instagram" wide
        aside={<div className="flex flex-wrap gap-3 lg:justify-end"><a className="btn btn-ghost" href={brand.instagram} target="_blank" rel="noopener"><InstagramIcon className="size-4" /> Открыть Instagram</a><Link className="btn btn-ghost" to="/proekty">Инженерные кейсы <Icon name="arrow-right" className="size-4" /></Link></div>} />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        {photos.map((g, i) => (
          <Reveal key={g.img} delay={i * 0.05}>
            <a href={brand.instagram} target="_blank" rel="noopener" className="group relative block aspect-square overflow-hidden bg-ink-3" aria-label={`Открыть публикацию в Instagram: ${g.alt}`}>
              <img src={img(g.img)} alt={g.alt} loading="lazy" decoding="async" width={800} height={800} className="size-full object-cover transition-[transform,opacity] duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-75" />
              <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><InstagramIcon className="size-8" /></span>
            </a>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-[.85rem] text-stone-2/62">Блок подключается к рабочему Instagram-аккаунту студии {brand.instagramHandle}: последние публикации подгружаются автоматически.</p>
    </Section>
  )
}
