import { Link } from 'react-router'
import { brand, catalog } from '@/data/content'
import { asset } from '@/lib/site'
import { Icon, InstagramIcon, TelegramIcon, ViberIcon } from './Icon'

export function Footer() {
  const msg = 'inline-flex min-h-12 items-center justify-center gap-2.5 border border-stone-2/15 px-4 text-[.92rem] font-medium transition-colors hover:border-stone-2/50 hover:bg-stone-2/5'
  return (
    <footer id="kontakty" className="scroll-mt-20 border-t border-stone-2/15 bg-ink-2 text-stone-2">
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src={asset('img/logo-cream.svg')} alt="20sotok.by" width={150} height={34} className="h-9 w-auto" />
            <p className="mt-6 max-w-[38ch] text-[.95rem] text-stone-2/62">{brand.studio}. Комплексное благоустройство придомовых территорий, ландшафтная инженерия и дорожное строительство премиум-класса.</p>
            <p className="mt-4 flex items-start gap-2 text-[.9rem] text-stone-2/62"><Icon name="map-pin" className="mt-1 size-4 shrink-0" /><span>{brand.places.join(', ')}</span></p>
          </div>
          <nav className="lg:col-span-2" aria-label="Услуги в подвале">
            <h5 className="mb-5 text-[11px] font-medium uppercase tracking-[.18em] text-stone-2/62">Услуги</h5>
            <ul className="grid gap-2.5 text-[.95rem]">{catalog.map((c) => <li key={c.slug}><Link to={`/uslugi/${c.slug}`} className="text-stone-2/80 transition-colors hover:text-stone-2">{c.title}</Link></li>)}</ul>
          </nav>
          <nav className="lg:col-span-2" aria-label="Компания в подвале">
            <h5 className="mb-5 text-[11px] font-medium uppercase tracking-[.18em] text-stone-2/62">Компания</h5>
            <ul className="grid gap-2.5 text-[.95rem]">
              <li><Link to="/proekty" className="text-stone-2/80 hover:text-stone-2">Наши проекты</Link></li>
              <li><Link to="/blog" className="text-stone-2/80 hover:text-stone-2">Полезно знать</Link></li>
              <li><Link to="/#o-kompanii" className="text-stone-2/80 hover:text-stone-2">Руководитель</Link></li>
              <li><a href={brand.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-stone-2/80 hover:text-stone-2"><InstagramIcon className="size-4" /> Instagram</a></li>
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <h5 className="mb-5 text-[11px] font-medium uppercase tracking-[.18em] text-stone-2/62">Связаться</h5>
            <a href={`tel:${brand.phoneTel}`} className="font-heading text-2xl font-light tracking-tight">{brand.phoneDisplay}</a>
            <p className="mt-2 text-[.9rem] text-stone-2/62">Ежедневно 9:00–20:00 · <a href={`mailto:${brand.email}`} className="underline decoration-brass/60 underline-offset-4">{brand.email}</a></p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:w-max">
              <a className={msg} href={brand.telegram} target="_blank" rel="noopener"><TelegramIcon className="size-5" /> Написать в Telegram</a>
              <a className={msg} href={brand.viber}><ViberIcon className="size-5" /> Написать в Viber</a>
            </div>
            <p className="mt-6 text-[.9rem] text-stone-2/62">Выезд инженера на объект — платная консультация. При заключении договора её стоимость засчитывается в итоговую смету.</p>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-x-10 gap-y-3 border-t border-stone-2/15 pt-8 text-[.8rem] leading-relaxed text-stone-2/62">
          <div>{brand.legal}<br />Офис: {brand.address}</div>
          <div>© {new Date().getFullYear()} {brand.studio}</div>
        </div>
      </div>
    </footer>
  )
}
