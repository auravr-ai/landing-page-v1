"use client"

import { useTranslation } from "react-i18next"
import { Logo } from "@/components/ui/logo"
import { addLocaleToHref, normalizeLocale } from "@/lib/i18n/locale"

export function Footer() {
  const { t, i18n } = useTranslation()
  const activeLocale = normalizeLocale(i18n.resolvedLanguage || i18n.language)
  return (
    <footer className="bg-background border-t border-purple-300">
      <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.services.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={addLocaleToHref(t('footer.links.features'), activeLocale)}
                  className="text-muted-foreground hover:text-purple-600 transition-colors"
                >
                  {t('footer.services.features')}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.company.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={addLocaleToHref(t('footer.links.team'), activeLocale)}
                  className="text-muted-foreground hover:text-purple-600 transition-colors"
                >
                  {t('footer.company.team')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.contact.title')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={t('footer.links.email')}
                  className="break-all text-muted-foreground hover:text-purple-600 transition-colors"
                >
                  {t('footer.contact.email')}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{t('footer.contact.phone')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <a
                  href={t('footer.links.address')}
                  className="text-muted-foreground hover:text-purple-600 transition-colors"
                >
                  <span>
                    {t('footer.contact.address')}
                    <br />
                    {t('footer.contact.city')}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-5 border-t border-purple-300">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">{t('footer.copyright')}</div>
            {/* <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                {t('footer.cookies')}
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
