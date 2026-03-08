'use client'

import { useEffect } from 'react'
import i18n from 'i18next'
import '@/lib/i18n/config'
import { normalizeLocale } from '@/lib/i18n/locale'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const localeFromUrl = params.get('locale')

    // Avoid server/client language mismatch by selecting language on the client only.
    const stored = localStorage.getItem('i18nextLng')
    const preferred =
      localeFromUrl ||
      stored ||
      navigator.language ||
      'en'

    const normalized = normalizeLocale(preferred)
    if (i18n.language !== normalized) {
      i18n.changeLanguage(normalized)
    }

    if (localeFromUrl !== normalized) {
      params.set('locale', normalized)
      const search = params.toString()
      const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
      window.history.replaceState(null, '', nextUrl)
    }
  }, [])

  useEffect(() => {
    const syncLocaleInUrl = (lng: string) => {
      if (typeof window === 'undefined') return

      const normalized = normalizeLocale(lng)
      const params = new URLSearchParams(window.location.search)
      if (params.get('locale') === normalized) return

      params.set('locale', normalized)
      const search = params.toString()
      const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
      window.history.replaceState(null, '', nextUrl)
    }

    syncLocaleInUrl(i18n.language)
    i18n.on('languageChanged', syncLocaleInUrl)

    return () => {
      i18n.off('languageChanged', syncLocaleInUrl)
    }
  }, [])

  return <>{children}</>
}
