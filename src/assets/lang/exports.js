import ru from './ru.json'
import kz from './kz.json'

export const defaultLocale = localStorage.getItem('lang-respublica') ?? 'kz'

export const languages = {
  ru,
  kz
}
