import { devLog, getCapitalise, isProd } from '../utils';
import mockData from './mockData.json';
import { DB } from '../utils/db';

export abstract class ApiNoCRUDMethods<K> {
  isProd: boolean = isProd();

  isDev = false;

  useMock = this.isProd || this.isDev;

  abstract field: keyof typeof mockData

  abstract apiName?: string

  getMockRecord = (key: keyof typeof mockData): any => {
    return Promise.resolve().then(() => {
      return mockData[key];
    });
  };

  getData = async <T extends K>(field: keyof typeof mockData = this.field): Promise<T | null> => {
    try {
      if (this.useMock) {
        return this.getMockRecord(field);
      }

      return await DB.getApi<T>(field);
    } catch (error) {
      devLog(`get${getCapitalise(field)} error`);
    }

    return null;
  };
}
