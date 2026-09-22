/** Абсолютный путь к статике с учётом base (GitHub Pages: /20sotok/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
export const img = (name: string) => asset(`img/${name}.webp`)

/** Плавный переход к секции с учётом sticky-шапки; уважает prefers-reduced-motion. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

/** Маска телефона РБ: +375 (__) ___-__-__ */
export function formatByPhone(raw: string): string {
  let d = raw.replace(/\D/g, '')
  if (d.startsWith('375')) d = d.slice(3)
  else if (d.startsWith('80')) d = d.slice(2)
  d = d.slice(0, 9)
  let out = '+375'
  if (d.length > 0) out += ' (' + d.slice(0, 2)
  if (d.length >= 2) out += ')'
  if (d.length > 2) out += ' ' + d.slice(2, 5)
  if (d.length > 5) out += '-' + d.slice(5, 7)
  if (d.length > 7) out += '-' + d.slice(7, 9)
  return out
}
export const isPhoneComplete = (v: string) => v.replace(/\D/g, '').length === 12
