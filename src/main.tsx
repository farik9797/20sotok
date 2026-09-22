import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import { Layout } from '@/components/site/Layout'
import Home from '@/pages/Home'

const Service = lazy(() => import('@/pages/Service'))
const Projects = lazy(() => import('@/pages/Projects'))
const Blog = lazy(() => import('@/pages/Blog'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Fallback = () => <div className="sheet min-h-[60svh]" aria-busy="true" />
const page = (el: React.ReactNode) => <Suspense fallback={<Fallback />}>{el}</Suspense>

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/uslugi/:slug', element: page(<Service />) },
        { path: '/proekty', element: page(<Projects />) },
        { path: '/blog', element: page(<Blog />) },
        { path: '*', element: page(<NotFound />) },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') },
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
