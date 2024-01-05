import ru from './ru.json'
import kz from './kz.json'

export let defaultLocale = localStorage.getItem('lang-respublica') ?? 'kz';

export const setNewLang = (newLang) => {
  defaultLocale = newLang;

  localStorage.setItem('lang-respublica', newLang);
  location.reload();
}

export const languages = {
  ru,
  kz
}


export const getLangForURL = () => {
  const lang = defaultLocale == 'ru' ? 'ru-RU' : 'kz-KZ';
  document.documentElement.lang = lang;
  document.cookie = `lang=${lang}`;

  console.log('getLang ', lang);
  return lang
}