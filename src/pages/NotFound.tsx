import { Link } from 'react-router'
import { Seo } from '@/components/site/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Страница не найдена — 20 соток" description="Такой страницы нет." />
      <section className="sheet flex min-h-[70svh] items-center text-stone-2">
        <div className="wrap py-32">
          <div className="num text-[clamp(5rem,14vw,12rem)]">404</div>
          <h1 className="h2 mt-4">Такой страницы нет</h1>
          <p className="mt-4 text-stone-2/62">Возможно, ссылка устарела. Вернитесь на главную или посмотрите проекты.</p>
          <div className="mt-8 flex gap-3"><Link to="/" className="btn btn-brass">На главную</Link><Link to="/proekty" className="btn btn-ghost">Проекты</Link></div>
        </div>
      </section>
    </>
  )
}
