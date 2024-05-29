import { languages, defaultLocale } from '@/assets/lang/exports'
import { createI18n } from 'vue-i18n'

const messages = Object.assign(languages)

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages
})

export default i18n;
