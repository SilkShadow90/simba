export const earlyDate = (nextDate:string): string => {
  const dayStrings: [string, string, string] = ['день', 'дня', 'дней'];
  const hourStrings: [string, string, string] = ['час', 'часа', 'часов'];
  const minuteStrings: [string, string, string] = ['минута', 'минуты', 'минут'];
  const getString = (num: number, strings: [string, string, string]) => {
    if (days >= 5 && days <= 20 || Number(days.toString().slice(-1)) >= 5) {
      return strings[2];
    }

    if (Number(days.toString().slice(-1)) >= 2 || Number(days.toString().slice(-1)) <= 4) {
      return strings[1];
    }

    return strings[0];
  };

  const date = new Date();

  const currentDate: Date = new Date(nextDate);

  const diff: number = currentDate.getTime() - date.getTime();

  const seconds = diff / 1000;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // return '3 дня 12 часов 30 минут'
  return `${days} ${getString(days, dayStrings)} ${hours % 24} ${getString(hours % 24, hourStrings)} ${minutes % 60} ${getString(minutes % 60, minuteStrings)}`;
};

console.log(earlyDate("2022-12-31T23:59:59"));
