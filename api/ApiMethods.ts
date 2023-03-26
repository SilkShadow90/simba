import { isProd } from '../utils';
import mockData from './mockData.json';

export abstract class ApiMethods {
  isProd: boolean = isProd();

  isDev = false;

  useMock = this.isProd || this.isDev;

  getMock = (key: keyof typeof mockData, useId?: boolean, id?: string): any => {
    return Promise.resolve().then(() => {
      if (useId) {
        if (id) {
          return (mockData[key] as any)[id] as any;
        }

        return Object.values(mockData[key])?.[0] || null;
      }

      return Object.values(mockData[key]);
    });
  };
}
