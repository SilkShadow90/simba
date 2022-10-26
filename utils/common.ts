/**
 * @name delay
 * @description может использоваться в цепочке промисов для синтетической задержки выполнения кода или для выполнения функции с задержкой
 * @param ms время задержки
 * @param func функция которая будет выполнена с задержкой
 * @return void
 */
export function delay<T>(ms: number = 1000, func?: () => T) {
  return new Promise(resolve => setTimeout(() => resolve(func), ms));
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
export const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const getBackEndUrl = (): string => process.env.NODE_ENV === 'production' ? '/simba' : ''
