import { defaultLocale } from '@/assets/lang/exports'

function formatDateKazakh(inputDate) {
  if (!(inputDate instanceof Date)) {
    throw new Error("Пожалуйста, передайте объект Date в качестве аргумента.");
  }

  const monthNamesKazakh = [
    "қаңтар", "ақпан", "наурыз",
    "сәуір", "мамыр", "маусым",
    "шілде", "тамыз", "қыркүйек",
    "қазан", "қараша", "желтоқсан"
  ];

  const yearEndingsKazakh = ["ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж.", "ж."];

  const day = inputDate.getDate();
  const month = inputDate.getMonth();
  const year = inputDate.getFullYear();

  const formattedDate = `${day} ${monthNamesKazakh[month]} ${year} ${yearEndingsKazakh[year % 10]}`;

  return formattedDate;
}

// Пример использования
const currentDate = new Date();
const formattedDateStringKazakh = formatDateKazakh(currentDate);
console.log(formattedDateStringKazakh);


function convertDateTime(datetimeStr) {
  const datetime = new Date(datetimeStr);

  const optionsRussian = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const russianDateTime = datetime.toLocaleString('ru-RU', optionsRussian);
  const kazakhDateTime = formatDateKazakh(datetime);

  return defaultLocale == 'ru' ? russianDateTime : kazakhDateTime;
}

export default convertDateTime