import type { RouteObject } from 'react-router'
import { Layout } from '@/components/site/Layout'
import Home from '@/pages/Home'

/** Общая карта маршрутов для клиента и пререндера. Внутренние страницы — ленивые модули. */
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, Component: Home },
      { path: 'uslugi/:slug', lazy: async () => ({ Component: (await import('@/pages/Service')).default }) },
      { path: 'proekty', lazy: async () => ({ Component: (await import('@/pages/Projects')).default }) },
      { path: 'blog', lazy: async () => ({ Component: (await import('@/pages/Blog')).default }) },
      { path: '*', lazy: async () => ({ Component: (await import('@/pages/NotFound')).default }) },
    ],
  },
]

export const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
