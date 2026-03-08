export const SUPPORTED_LOCALES = ['en', 'zh-HK'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export function normalizeLocale(locale: string | null | undefined): AppLocale {
  if (!locale) return 'en'

  const normalized = locale.toLowerCase().replace('_', '-')
  if (normalized === 'zh-hk' || normalized === 'zh-tw' || normalized.startsWith('zh')) {
    return 'zh-HK'
  }

  return 'en'
}

export function addLocaleToHref(href: string, locale: AppLocale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href

  const [pathAndQuery, hash = ''] = href.split('#', 2)
  const [pathname, query = ''] = pathAndQuery.split('?', 2)
  const params = new URLSearchParams(query)
  params.set('locale', locale)

  const search = params.toString()
  const hashSuffix = hash ? `#${hash}` : ''

  return search ? `${pathname}?${search}${hashSuffix}` : `${pathname}${hashSuffix}`
}
