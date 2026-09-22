import { brand } from '@/data/content'
import { Icon } from './Icon'
import { useQuiz } from './QuizContext'
import { Reveal } from './Reveal'

export function CtaBand({ title, text }: { title: string; text: string }) {
  const { open } = useQuiz()
  return (
    <section className="sheet py-14 text-stone-2 md:py-20">
      <div className="wrap">
        <Reveal className="grid items-center gap-7 border border-stone-2/15 bg-[linear-gradient(135deg,rgba(43,66,54,.35),transparent_60%)] p-6 md:p-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="eyebrow mb-4">Предварительный расчёт</div>
            <h2 className="h2 text-[clamp(1.7rem,3vw,2.8rem)]">{title}</h2>
            <p className="lead mt-4 text-stone-2/62">{text}</p>
          </div>
          <div className="grid gap-3 lg:justify-self-end">
            <button type="button" onClick={() => open()} className="btn btn-brass btn-lg">Рассчитать бюджет проекта за 1 минуту <Icon name="arrow-right" className="size-4" /></button>
            <a href={`tel:${brand.phoneTel}`} className="btn btn-ghost btn-lg"><Icon name="phone" className="size-4" /> {brand.phoneDisplay}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
