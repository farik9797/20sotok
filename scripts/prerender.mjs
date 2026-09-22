// Пререндер: для каждого маршрута рендерим React в HTML и подставляем мета-теги.
// Итог: dist/<route>/index.html с готовой разметкой (гидрируется клиентом), 404.html — чистая SPA-оболочка.
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const { render, routeMeta } = await import(pathToFileURL(join(process.cwd(), 'dist-ssr', 'entry-server.js')).href)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const withMeta = (html, m) => html
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`)
  .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(m.description)}$2`)
  .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(m.title)}$2`)
  .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(m.description)}$2`)
  .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(m.title)}$2`)
  .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(m.description)}$2`)
  .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1https://www.20sotok.by${m.path}$2`)
  .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1https://www.20sotok.by${m.path}$2`)

// 404.html — оболочка без пререндера (любой неизвестный адрес)
cpSync(join(dist, 'index.html'), join(dist, '404.html'))

for (const m of routeMeta) {
  const appHtml = await render(m.path)
  const html = withMeta(template, m)
    .replace('<html lang="ru">', '<html lang="ru" class="prerender">')
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  const dir = m.path === '/' ? dist : join(dist, m.path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`prerender: ${m.path} (${(html.length / 1024).toFixed(0)} KB)`)
}
