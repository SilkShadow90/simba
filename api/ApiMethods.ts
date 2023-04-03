import { devLog, getCapitalise, isProd } from '../utils';
import mockData from './mockData.json';
import { DB } from '../utils/db';
import { IDObject, WithoutID } from './types';
import { ToastService } from '../utils/ToastService';

export abstract class ApiMethods<K extends IDObject> {
  isProd: boolean = isProd();

  isDev = false;

  useMock = this.isProd || this.isDev;

  abstract field: keyof typeof mockData

  abstract apiName?: string

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

  getMockRecord = (key: keyof typeof mockData): any => {
    return Promise.resolve().then(() => {
      return mockData[key];
    });
  };

  getAll = async <T extends K>(field: keyof typeof mockData = this.field): Promise<T[]> => {
    try {
      if (this.useMock) {
        return this.getMock(field);
      }

      const fieldRecord = await DB.getApi<Record<T[keyof IDObject], T>>(field) || {};

      return Object.values<T>(fieldRecord) || [];
    } catch (error) {
      ToastService.show(`${this.apiName} - ошибка получения данных`, 'error');
      devLog(`get${getCapitalise(field)} error`, error);
    }

    return [];
  };

  getAllByKey = async <T extends K>(key: keyof T, value?: any, field: keyof typeof mockData = this.field): Promise<T[]> => {
    try {
      if (this.useMock) {
        return this.getMock(field);
      }

      const fieldRecord = await DB.getApi<Record<T[keyof IDObject], T>>(field) || {};

      if (value) {
        return Object.values<T>(fieldRecord).filter((item) => item[key] === value) || [];
      }
      return Object.values<T>(fieldRecord).filter((item) => !!item[key]) || [];
    } catch (error) {
      ToastService.show(`${this.apiName} - ошибка получения данных`, 'error');
      devLog(`get${getCapitalise(field)} error`);
    }

    return [];
  };

  getById = async <T extends K>(id?: T[keyof IDObject], field: keyof typeof mockData = this.field): Promise<T | null> => {
    try {
      if (this.useMock) {
        return this.getMock(field, true, id);
      }

      if (id) {
        return await DB.getApi<T>(`${field}/${id}`) || null;
      }
      devLog(`${field}: getById - id is undefined`);
    } catch (error) {
      ToastService.show(`${this.apiName} - ошибка получения данных`, 'error');
      devLog(`${field}: getById error`);
    }

    return null;
  };

  getByIds = async <T extends K>(ids?: Array<T[keyof IDObject]>, field: keyof typeof mockData = this.field): Promise<T[] | null> => {
    try {
      if (this.useMock) {
        return this.getMock(field);
      }

      if (ids) {
        const items = await Promise.all(ids.map(id => this.getById(id)));

        return items.filter(v => v) as T[];
      }
      devLog(`${field}: getByIds - ids is undefined`);
    } catch (error) {
      ToastService.show(`${this.apiName} - ошибка получения элемента`, 'error');
      devLog(`${field}: getByIds error`);
    }

    return null;
  };

  create = async <T extends K>(item?: WithoutID<T>, callback?: () => void, errorCallback?: () => void, field: keyof typeof mockData = this.field): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (item) {
        await DB.postApi<WithoutID<T>>(field, item, callback, errorCallback);
        ToastService.show(`${this.apiName} - запись успешно создана`, 'success');
      } else {
        devLog(`${field}: create - item is undefined`);
      }
    } catch (error) {
      ToastService.show(`${this.apiName} - ошибка создания`, 'error');
      devLog(`${field}: create error`);
    }
  };

  update = async <T extends K>(item?: T, callback?: () => void, errorCallback?: () => void, field: keyof typeof mockData = this.field): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (item) {
        await DB.updateApi<T>(field, item, callback, errorCallback);
        ToastService.show(`${this.apiName} - запись успешно изменена`, 'success');
      } else {
        devLog(`${field}: update - item is undefined`);
      }
    } catch (error) {
      ToastService.show(`${this.apiName} - ошибка редактирования`, 'error');
      devLog(`${field}: update error`);
    }
  };

  delete = async (id?: string, callback?: () => void, errorCallback?: () => void, field: keyof typeof mockData = this.field): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (id) {
        await DB.deleteApi(field, id, callback, errorCallback);
        ToastService.show(`${this.apiName} - запись успешно удалена`, 'success');
      } else {
        devLog(`${field}: delete - id is undefined`);
      }
    } catch (error) {
      ToastService.show(`${this.apiName} - ошибка удаления`, 'error');
      devLog(`${field}: delete error`);
    }
  };

  multiDelete = async (ids?: string[], callback?: () => void, errorCallback?: () => void, field: keyof typeof mockData = this.field): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (ids?.length) {
        await DB.multiDeleteApi(field, ids, callback, errorCallback);
      } else {
        ToastService.show(`${this.apiName} - записи успешно удалены`, 'success');
        devLog(`${field}: multiDelete - ids is undefined`);
      }
    } catch (error) {
      ToastService.show(`${this.apiName} - ошибка удаления`, 'error');
      devLog(`${field}: multiDelete error`);
    }
  };

  getRecord = async <T extends IDObject>(field: keyof typeof mockData = this.field): Promise<Record<T[keyof IDObject], T> | null> => {
    try {
      if (this.useMock) {
        return this.getMock(field);
      }

      return await DB.getApi<Record<T[keyof IDObject], T>>(field);
    } catch (error) {
      devLog(`get${getCapitalise(field)} error`);
    }

    return null;
  };
}
