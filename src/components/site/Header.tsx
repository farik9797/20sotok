import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { brand, nav } from '@/data/content'
import { useScrolled } from '@/hooks/useScrolled'
import { asset } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Icon, TelegramIcon, ViberIcon } from './Icon'
import { useQuiz } from './QuizContext'

function Messengers({ className }: { className?: string }) {
  const base = 'inline-flex size-10 items-center justify-center rounded-full border border-stone-2/15 text-stone-2/80 transition-colors hover:border-stone-2/50 hover:text-stone-2'
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <a className={base} href={brand.viber} aria-label="Написать в Viber"><ViberIcon className="size-[18px]" /></a>
      <a className={base} href={brand.telegram} target="_blank" rel="noopener" aria-label="Написать в Telegram"><TelegramIcon className="size-[18px]" /></a>
    </div>
  )
}

const Logo = ({ className }: { className?: string }) => (
  <Link to="/" className={cn('flex items-center', className)} aria-label="20 соток — на главную">
    <img src={asset('img/logo-cream.svg')} alt="20sotok.by" width={150} height={34} className="h-8 w-auto md:h-9" />
  </Link>
)

export function Header() {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)
  const { open: openQuiz } = useQuiz()
  const { hash } = useLocation()
  // Якорные ссылки главной активны только при совпадении хеша, страницы — по пути
  const activeFor = (to: string, isActive: boolean) => (to.includes('#') ? hash === to.slice(to.indexOf('#')) : isActive)
  const linkCls = (to: string) => ({ isActive }: { isActive: boolean }) =>
    cn('relative whitespace-nowrap py-1.5 text-[15px] font-medium text-stone-2/78 transition-colors hover:text-stone-2 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:w-0 after:bg-brass after:transition-[width] hover:after:w-full', activeFor(to, isActive) && 'text-stone-2 after:w-full')

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300', scrolled ? 'border-b border-stone-2/15 bg-ink/85 backdrop-blur-xl' : 'bg-transparent')}>
      <div className="wrap flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
        <Logo />
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Основная навигация">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls(n.to)} end>{n.label}</NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <a href={`tel:${brand.phoneTel}`} className="whitespace-nowrap font-heading text-[15px] font-medium text-stone-2">{brand.phoneDisplay}</a>
          <Messengers />
          <button type="button" onClick={() => openQuiz()} className="btn btn-brass">Рассчитать бюджет</button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={`tel:${brand.phoneTel}`} aria-label="Позвонить" className="inline-flex size-11 items-center justify-center rounded-sm border border-stone-2/15 text-stone-2"><Icon name="phone" className="size-5" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" aria-label="Открыть меню" className="inline-flex size-11 items-center justify-center rounded-sm border border-stone-2/15 text-stone-2"><Icon name="menu" className="size-5" /></button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(92vw,400px)] border-l border-stone-2/10 bg-ink p-0 text-stone-2 [&>button]:hidden">
              <SheetTitle className="sr-only">Меню</SheetTitle>
              <div className="flex h-full flex-col p-6">
                <div className="flex h-12 items-center justify-between">
                  <Logo />
                  <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть меню" className="inline-flex size-11 items-center justify-center rounded-sm border border-stone-2/15"><Icon name="x" className="size-5" /></button>
                </div>
                <nav className="mt-8 flex flex-col" aria-label="Мобильная навигация">
                  {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-stone-2/10 py-3.5 font-heading text-[clamp(1.8rem,7vw,2.6rem)] font-light tracking-tight">{n.label}</Link>)}
                </nav>
                <div className="mt-auto grid gap-4 pt-8">
                  <a href={`tel:${brand.phoneTel}`} className="font-heading text-xl">{brand.phoneDisplay}</a>
                  <Messengers />
                  <button type="button" onClick={() => { setOpen(false); openQuiz() }} className="btn btn-brass btn-lg w-full">Рассчитать бюджет проекта <Icon name="arrow-right" className="size-4" /></button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
