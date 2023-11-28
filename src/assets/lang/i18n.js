import { languages, defaultLocale } from '@/assets/lang'
import { createI18n } from 'vue-i18n'

const messages = Object.assign(languages)

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'ru',
  messages
})

export default i18n;