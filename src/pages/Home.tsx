import { CtaBand } from '@/components/site/CtaBand'
import { Hero } from '@/components/site/Hero'
import { Catalog, Director, Features, PlacesRibbon, Portfolio, Process } from '@/components/site/HomeSections'
import { Seo } from '@/components/site/Seo'

export default function Home() {
  return (
    <>
      <Seo title="20 соток — инженерное благоустройство под ключ в Минске" description="Студия инженерного благоустройства «20 соток»: мощение, премиальные газоны, автополив Hunter / Rain Bird, дренаж и ливнёвка под ключ в Минске и Минском районе. Договор, фиксированная смета, гарантия от 2 лет." />
      <Hero />
      <PlacesRibbon />
      <Features />
      <Catalog />
      <Director />
      <Process />
      <Portfolio />
      <CtaBand title="Рассчитайте бюджет вашего участка за 1 минуту" text="Три вопроса — и вы получите предварительный расчёт сметы и примеры похожих объектов в Telegram или Viber." />
    </>
  )
}
