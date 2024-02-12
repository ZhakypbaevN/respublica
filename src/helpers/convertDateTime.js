import { defaultLocale } from '@/assets/lang/exports'

function convertDateTime(datetimeStr) {
  const datetime = new Date(datetimeStr);

  const optionsRussian = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const optionsKazakh = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const russianDateTime = datetime.toLocaleString('ru-RU', optionsRussian);
  const kazakhDateTime = datetime.toLocaleString('kk-KZ', optionsKazakh);

  return defaultLocale == 'ru' ? russianDateTime : kazakhDateTime;
}

export default convertDateTime