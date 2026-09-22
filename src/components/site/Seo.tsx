import { useEffect } from 'react'

/** Метаданные страницы для SPA: title, description, canonical и og:title. */
export function Seo({ title, description, path = '/' }: { title: string; description: string; path?: string }) {
  useEffect(() => {
    document.title = title
    const set = (sel: string, attr: string, val: string) => { const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(sel); if (el) el.setAttribute(attr, val) }
    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)
    set('meta[property="og:url"]', 'content', `https://www.20sotok.by${path}`)
    set('link[rel="canonical"]', 'href', `https://www.20sotok.by${path}`)
  }, [title, description, path])
  return null
}
