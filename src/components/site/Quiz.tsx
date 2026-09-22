import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { quiz } from '@/data/content'
import { formatByPhone, isPhoneComplete } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Icon, TelegramIcon, ViberIcon } from './Icon'

/**
 * Квиз-калькулятор бюджета по ТЗ: площадь → системы → населённый пункт → экран захвата (Telegram/Viber + телефон).
 * Шаги переключаются без перезагрузки. Используется в модалке и встроенным блоком на страницах услуг.
 */
export function Quiz({ preselect = '', onClose, className }: { preselect?: string; onClose?: () => void; className?: string }) {
  const id = useId()
  const reduce = useReducedMotion()
  const [step, setStep] = useState(1)
  const [area, setArea] = useState('')
  const [systems, setSystems] = useState<string[]>(preselect ? [preselect] : [])
  const [place, setPlace] = useState('')
  const [msg, setMsg] = useState<'Telegram' | 'Viber'>('Telegram')
  const [phone, setPhone] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const done = step === 5

  const next = () => {
    if (step === 1 && !area) return setErr('Выберите площадь участка')
    if (step === 2 && systems.length === 0) return setErr('Выберите хотя бы одну систему')
    if (step === 3 && place.trim().length < 2) return setErr('Укажите населённый пункт или направление')
    setErr(null); setStep((s) => s + 1)
  }
  const back = () => { setErr(null); setStep((s) => Math.max(1, s - 1)) }
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isPhoneComplete(phone)) return setErr('Введите номер полностью: +375 (__) ___-__-__')
    setErr(null); setStep(5)
    // В макете отправка не выполняется. Здесь будет POST в CRM / Telegram-бот.
  }
  const toggleSystem = (k: string) => setSystems((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]))
  const anim = { initial: reduce ? false : { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: reduce ? undefined : { opacity: 0, y: -8 }, transition: { duration: 0.28 } }
  const opt = (checked: boolean) => cn('flex min-h-16 cursor-pointer select-none items-center gap-4 border px-5 py-4 transition-colors', checked ? 'border-fir bg-fir/10' : 'border-ink/20 bg-stone-2/50 hover:border-ink/50')
  const box = (checked: boolean, round?: boolean) => cn('grid size-[22px] shrink-0 place-items-center border transition-colors', round && 'rounded-full', checked ? 'border-fir bg-fir text-stone-2' : 'border-ink/45')

  return (
    <div className={cn('border border-ink/15 bg-stone text-ink', className)}>
      <div className="flex items-center justify-between gap-4 border-b border-ink/15 px-7 py-5 md:px-11">
        <div>
          <div className="eyebrow no-rule">{quiz.title}</div>
          {!done && <div className="mt-1 text-sm text-ink/60">{quiz.sub.replace('{n}', String(Math.min(step, 4)))}</div>}
        </div>
        {onClose && <button type="button" onClick={onClose} aria-label="Закрыть" className="grid size-11 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink/5"><Icon name="x" className="size-5" /></button>}
      </div>
      <div className="relative h-0.5 bg-ink/15"><i className="absolute inset-y-0 left-0 bg-brass transition-[width] duration-400" style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }} /></div>

      <form onSubmit={submit} noValidate className="px-7 py-8 md:px-11 md:py-10">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.fieldset key="s1" {...anim} className="m-0 border-0 p-0">
              <legend className="mb-6 font-heading text-[clamp(1.35rem,2vw,1.8rem)] font-normal leading-tight tracking-tight">{quiz.q1}</legend>
              <div className="grid gap-3">
                {quiz.areas.map((a) => (
                  <label key={a.v} className={opt(area === a.v)}>
                    <input type="radio" name={`${id}-area`} value={a.v} checked={area === a.v} onChange={() => setArea(a.v)} className="sr-only" />
                    <span className={box(area === a.v, true)}>{area === a.v && <Icon name="check" className="size-3.5" strokeWidth={3} />}</span>
                    <span className="font-medium">{a.v}</span>
                    <span className="ml-auto whitespace-nowrap text-sm text-ink/60">{a.s}</span>
                  </label>
                ))}
              </div>
            </motion.fieldset>
          )}
          {step === 2 && (
            <motion.fieldset key="s2" {...anim} className="m-0 border-0 p-0">
              <legend className="mb-2 font-heading text-[clamp(1.35rem,2vw,1.8rem)] font-normal leading-tight tracking-tight">{quiz.q2}</legend>
              <p className="mb-6 text-sm text-ink/60">{quiz.q2hint}</p>
              <div className="grid gap-3 md:grid-cols-2">
                {quiz.systems.map((s) => {
                  const c = systems.includes(s.k)
                  return (
                    <label key={s.k} className={opt(c)}>
                      <input type="checkbox" name={`${id}-sys`} value={s.k} checked={c} onChange={() => toggleSystem(s.k)} className="sr-only" />
                      <span className={box(c)}>{c && <Icon name="check" className="size-3.5" strokeWidth={3} />}</span>
                      <span className="font-medium">{s.v}</span>
                    </label>
                  )
                })}
              </div>
            </motion.fieldset>
          )}
          {step === 3 && (
            <motion.div key="s3" {...anim}>
              <label htmlFor={`${id}-place`} className="mb-6 block font-heading text-[clamp(1.35rem,2vw,1.8rem)] leading-tight tracking-tight">{quiz.q3}</label>
              <input id={`${id}-place`} value={place} onChange={(e) => setPlace(e.target.value)} placeholder={quiz.q3placeholder} list={`${id}-places`} autoComplete="off"
                className="min-h-14 w-full border border-ink/35 bg-stone-2 px-4 text-base outline-none transition-colors placeholder:text-ink/40 focus:border-fir focus-visible:ring-2 focus-visible:ring-brass" />
              <datalist id={`${id}-places`}>{quiz.places.map((p) => <option key={p} value={p} />)}</datalist>
              <div className="mt-4 flex flex-wrap gap-2">
                {quiz.places.map((p) => <button key={p} type="button" onClick={() => setPlace(p)} className="rounded-full border border-ink/15 px-3.5 py-2 text-sm transition-colors hover:border-fir hover:bg-fir/10">{p}</button>)}
              </div>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="s4" {...anim}>
              <h3 className="font-heading text-[clamp(1.35rem,2vw,1.8rem)] font-normal leading-tight tracking-tight">{quiz.captureTitle}</h3>
              <p className="mt-2 mb-6 text-sm text-ink/60">{quiz.captureLead}</p>
              <div className="mb-5 grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Мессенджер">
                {(['Telegram', 'Viber'] as const).map((m) => (
                  <label key={m} className={cn(opt(msg === m), 'justify-center')}>
                    <input type="radio" name={`${id}-msg`} value={m} checked={msg === m} onChange={() => setMsg(m)} className="sr-only" />
                    <span className={box(msg === m, true)}>{msg === m && <Icon name="check" className="size-3.5" strokeWidth={3} />}</span>
                    {m === 'Telegram' ? <TelegramIcon className="size-5" /> : <ViberIcon className="size-5" />}
                    <span className="font-medium">{m}</span>
                  </label>
                ))}
              </div>
              <label htmlFor={`${id}-phone`} className="mb-2 block text-xs font-medium uppercase tracking-[.12em] text-ink/60">Телефон</label>
              <input id={`${id}-phone`} type="tel" inputMode="tel" required value={phone} onChange={(e) => setPhone(formatByPhone(e.target.value))}
                onFocus={() => !phone && setPhone('+375 (')} onBlur={() => (phone === '+375 (' || phone === '+375') && setPhone('')} placeholder="+375 (__) ___-__-__" autoComplete="tel"
                className="min-h-14 w-full border border-ink/35 bg-stone-2 px-4 text-base outline-none transition-colors placeholder:text-ink/40 focus:border-fir focus-visible:ring-2 focus-visible:ring-brass" />
              <p className="mt-4 text-xs leading-relaxed text-ink/60">{quiz.consent}</p>
            </motion.div>
          )}
          {done && (
            <motion.div key="done" {...anim}>
              <Icon name="badge-check" className="size-14 text-fir" />
              <h3 className="mt-4 font-heading text-[clamp(1.35rem,2vw,1.8rem)] font-normal leading-tight tracking-tight">{quiz.doneTitle}</h3>
              <p className="mt-3 max-w-[60ch] text-ink/65">{quiz.doneText.replace('{msg}', msg)}</p>
              <dl className="mt-6 grid text-sm">
                {[['Участок', area], ['Системы', systems.map((k) => quiz.systems.find((s) => s.k === k)?.v).join(', ')], ['Объект', place.trim()], ['Контакт', `${msg} · ${phone}`]].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[140px_1fr] gap-4 border-t border-ink/15 py-3.5"><dt className="text-ink/60">{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>

        {err && <p role="alert" className="mt-4 text-sm text-[#9B3B2E]">{err}</p>}

        {!done && (
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            {step > 1 ? <button type="button" onClick={back} className="inline-flex min-h-11 items-center gap-2 text-sm text-ink/60 hover:text-ink"><Icon name="arrow-left" className="size-4" /> Назад</button> : <span />}
            {step < 4
              ? <button type="button" onClick={next} className="btn btn-fir">Далее <Icon name="arrow-right" className="size-4" /></button>
              : <button type="submit" className="btn btn-brass btn-lg">{quiz.submit} <Icon name="send" className="size-4" /></button>}
          </div>
        )}
      </form>
    </div>
  )
}
