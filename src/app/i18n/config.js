export const FALLBACK_LOCALE = 'en'
export const supportedLocales = ['en', 'jp']

// You can name the cookie to whatever you want
export const LANGUAGE_COOKIE = 'language'

export function getOptions(lang = FALLBACK_LOCALE, ns = 'common') {
  return {
    // debug: true, // Set to true to see console logs
    supportedLngs: supportedLocales,
    fallbackLng: FALLBACK_LOCALE,
    lng: lang,
    keySeparator: '.',
    debug: true,
    ns,
  }
}
