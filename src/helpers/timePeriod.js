function timePeriod(dateString) {
  const date = new Date(dateString);
  const dateNow = new Date();

  const difference = dateNow - date;
  let timeUnit = "";
  let timeValue = 0;

  if (difference >= 365 * 24 * 60 * 60 * 1000) {
    timeValue = Math.floor(difference / (365 * 24 * 60 * 60 * 1000));

    if (timeValue == 1) timeUnit = "год";
    else if (timeValue > 1 && timeValue < 5) timeUnit += "года";
    else if (timeValue >= 5 || timeValue == 0) timeUnit += "лет";

  } else if (difference >= 30 * 24 * 60 * 60 * 1000) {
    timeValue = Math.floor(difference / (30 * 24 * 60 * 60 * 1000));

    if (timeValue == 1) timeUnit = "месяц";
    else if (timeValue > 1 && timeValue < 5) timeUnit += "месяца";
    else if (timeValue >= 5 || timeValue == 0) timeUnit += "месяцев";

  } else if (difference >= 24 * 60 * 60 * 1000) {
    timeValue = Math.floor(difference / (24 * 60 * 60 * 1000));

    if (timeValue == 1) timeUnit = "день";
    else if (timeValue > 1 && timeValue < 5) timeUnit += "дня";
    else if (timeValue >= 5 || timeValue == 0) timeUnit += "дней";

  } else if (difference >= 60 * 60 * 1000) {
    timeValue = Math.floor(difference / (60 * 60 * 1000));

    if (timeValue == 1) timeUnit = "час";
    else if (timeValue > 1 && timeValue < 5) timeUnit += "часа";
    else if (timeValue >= 5 || timeValue == 0) timeUnit += "часов";
  } else {
    timeValue = Math.floor(difference / (60 * 1000));

    if (timeValue == 1) timeUnit = "минута";
    else if (timeValue > 1 && timeValue < 5) timeUnit += "минуты";
    else if (timeValue >= 5 || timeValue == 0) timeUnit += "минут";
  }

  return `${timeValue} ${timeUnit} назад`;
}


export default timePeriod