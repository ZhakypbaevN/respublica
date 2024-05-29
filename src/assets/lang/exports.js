import ru from './ru.json'
import kz from './kz.json'

let defaultLocale = localStorage.getItem('lang-respublica') ?? 'kz';

const setNewLang = (newLang) => {
  defaultLocale = newLang;

  localStorage.setItem('lang-respublica', newLang);
  location.reload();
}

const languages = {
  ru,
  kz
}

const getLangForURL = () => {
  const lang = defaultLocale == 'ru' ? 'ru-RU' : 'kz-KZ';
  document.documentElement.lang = lang;
  document.cookie = `lang=${lang}`;

  return lang
}

export { defaultLocale, languages, setNewLang, getLangForURL }