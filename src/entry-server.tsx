import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { basename, routes } from './routes'
export { routeMeta } from './data/seo'

/** Рендер маршрута в строку для пререндера (scripts/prerender.mjs). */
export async function render(path: string): Promise<string> {
  const handler = createStaticHandler(routes, { basename })
  const context = await handler.query(new Request(`http://localhost${basename}${path}`))
  if (context instanceof Response) throw new Error(`Unexpected redirect for ${path}`)
  const router = createStaticRouter(handler.dataRoutes, context)
  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  )
}
