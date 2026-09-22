import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { scrollToId } from '@/lib/site'
import { Footer } from './Footer'
import { Header } from './Header'
import { QuizModal } from './QuizModal'
import { QuizProvider } from './QuizContext'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // ждём отрисовку страницы, затем скроллим к якорю
      const t = setTimeout(() => scrollToId(id), 60)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

export function Layout() {
  return (
    <QuizProvider>
      <div className="grain">
        <a href="#main" className="skip-link">Перейти к содержанию</a>
        <ScrollManager />
        <Header />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
        <QuizModal />
      </div>
    </QuizProvider>
  )
}
