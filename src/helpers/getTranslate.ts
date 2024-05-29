import { languages } from '@/assets/lang/exports'
import i18n from '@/assets/lang'

const getTranslate = (key: string) => {
  const keys = key.split('.');
  
  let translation = languages[i18n.global.locale.value];

  keys.forEach(k => {
    translation = translation[k];
  });

  return translation;
};

export default getTranslate