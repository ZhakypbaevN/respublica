import ru from './ru.json'
// import kz from './kz.json'

export const defaultLocale = localStorage.getItem('lang') ?? 'ru'

export const languages = {
  ru,
  // kz
}
