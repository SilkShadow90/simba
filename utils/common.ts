import { ChangeEvent } from 'react';

/**
 * @name delay
 * @description может использоваться в цепочке промисов для синтетической задержки выполнения кода или для выполнения функции с задержкой
 * @param ms время задержки
 * @param func функция которая будет выполнена с задержкой
 * @return void
 */
export function delay<T>(ms: number = 1000, func?: () => T) {
  return new Promise(resolve => {
    setTimeout(() => resolve(func), ms);
  });
}

/**
 * @name getAbbreviation
 * @description создает из строки или массива строк аббревиатуру
 * @param strings строка или массив строк
 * @return string
 * @example getAbbreviation('example string') getAbbreviation(['example', 'string']) // EX
 */
export function getAbbreviation(...strings: string[]): string {
  return strings.map(str => str.replace(/(\S)\S+\s?/g, '$1').toUpperCase()).join('');
}

/**
 * @name isObject
 * @description проверка является ли переменная объектом
 * @param obj объект для проверки
 * @return boolean
 * @example isObject({})
 */
export function isObject(obj: unknown): obj is object {
  return obj !== null && typeof obj === 'object';
}

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const isProd = (): boolean => process.env.NODE_ENV === 'production';

export const getBackEndUrl = (): string => isProd() ? '/simba' : '';

export const onChangeInput = (func: (text: string) => void) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  func(e.target.value);
};

export const earlyDate = (nextDate:string): boolean => {
  const date = new Date();
  const currentDate: Date = new Date(nextDate);
  const diff: number = currentDate.getTime() - date.getTime();

  return diff < 0;
};

export const getDateString = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dateString = `${endDate.toLocaleString('ru', {dateStyle: 'long'})}`;

  if (startDate.getDate() === endDate.getDate()) {
    return dateString;
  }

  return dateString.replace(/^\S+/, `${startDate.getDate()} - ${endDate.getDate()}` );
};

// console.warn(getDateString(new Date().toString(), new Date().toString()));
