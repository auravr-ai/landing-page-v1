'use client'

import { useEffect } from 'react'
import i18n from 'i18next'
import '@/lib/i18n/config'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Avoid server/client language mismatch by selecting language on the client only.
    const stored = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null
    const preferred =
      stored ||
      (typeof navigator !== 'undefined' ? navigator.language : null) ||
      'en'

    const normalized = preferred.startsWith('zh') ? 'zh-TW' : 'en'
    if (i18n.language !== normalized) {
      i18n.changeLanguage(normalized)
    }
  }, [])

  return <>{children}</>
}
