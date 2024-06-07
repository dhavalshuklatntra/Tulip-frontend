'use client'

import { useEffect } from 'react'
import i18next, { i18n } from 'i18next'
import {
  initReactI18next,
  useTranslation as useTransAlias,
} from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import Cookies from 'js-cookie'

import {
  FALLBACK_LOCALE,
  getOptions,
  LANGUAGE_COOKIE,
  Locales,
  supportedLocales,
} from './config'

const runsOnServerSide = typeof window === 'undefined'

// Initialize i18next for the client side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((lang, ns) => import(`./locales/${lang}/${ns}.json`)))
  .init({
    ...getOptions(),
    lng: getLocale(), // detect the language on the client
    detection: {
      // We only care about the cookie
      order: ['cookie'],
      // If `lookupCookie` is not set, it will use `i18next` as the cookie name
      lookupCookie: LANGUAGE_COOKIE,
      // This will automatically update the cookie
      caches: ['cookie'],
    },
    preload: runsOnServerSide ? supportedLocales : [],
  })

export function useTranslation(ns) {
  const lng = getLocale()

  const translator = useTransAlias(ns)
  const { i18n } = translator

  // Run content is being rendered on server side
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // Use our custom implementation when running on client side
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomTranslationImplem(i18n, lng)
  }
  return translator
}

function useCustomTranslationImplem(i18n, lng) {
  // This effect changes the language of the application when the lng prop changes.
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return
    i18n.changeLanguage(lng)
  }, [lng, i18n])
}

export function getLocale() {
  return Cookies.get(LANGUAGE_COOKIE) ?? FALLBACK_LOCALE
}
