"use client"

import { Code } from "lucide-react"
import { useTranslation } from "react-i18next"

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ")
}

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="bg-orange-500 rounded-lg p-2">
        <Code className="h-6 w-6 text-white" />
      </div>
      <span className="text-xl font-bold">BBros</span>
    </div>
  )
}

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-background border-t border-orange-200">
      <div className="mx-auto max-w-7xl py-16 px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <svg className="h-5 w-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.services.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.services.web')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.services.mobile')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.services.custom')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.services.api')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.services.cloud')}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.company.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.company.about')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.company.team')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.company.careers')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.company.caseStudies')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  {t('footer.company.blog')}
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
                <span className="break-all">{t('footer.contact.email')}</span>
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
                <span>
                  {t('footer.contact.address')}
                  <br />
                  {t('footer.contact.city')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">{t('footer.copyright')}</div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                {t('footer.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
