// После сборки: копируем index.html в папки известных маршрутов (200 вместо 404 на GitHub Pages)
// и в 404.html — фолбэк для любых других адресов SPA.
import { cpSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const routes = ['uslugi/plitka', 'uslugi/gazon', 'uslugi/poliv', 'uslugi/drenazh', 'proekty', 'blog']
for (const r of routes) {
  mkdirSync(join(dist, r), { recursive: true })
  cpSync(join(dist, 'index.html'), join(dist, r, 'index.html'))
}
cpSync(join(dist, 'index.html'), join(dist, '404.html'))
console.log(`postbuild: ${routes.length} маршрутов + 404.html`)
