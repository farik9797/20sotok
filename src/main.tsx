import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, matchRoutes, RouterProvider } from 'react-router'
import './index.css'
import { basename, routes } from './routes'

// Ленивые маршруты, совпавшие с текущим адресом, загружаем до гидратации —
// иначе клиентская разметка не совпадёт с пререндером.
const lazyMatches = matchRoutes(routes, window.location, basename)?.filter((m) => m.route.lazy)
if (lazyMatches?.length) {
  await Promise.all(lazyMatches.map(async (m) => {
    const mod = await (m.route.lazy as () => Promise<object>)()
    Object.assign(m.route, { ...mod, lazy: undefined })
  }))
}

const router = createBrowserRouter(routes, { basename })
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
const root = document.getElementById('root')!
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
