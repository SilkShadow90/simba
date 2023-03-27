import { ApiMethods } from './ApiMethods';
import { Nurser } from './types';
import { DB } from '../utils/db';

class NurserMethods extends ApiMethods {
  getNurseries = async (): Promise<Nurser[]> => {
    try {
      if (this.useMock) {
        return this.getMock('nurseries');
      }

      const nurserRecord = await DB.getApi<Record<string, Nurser>>('nurseries') || {};

      return Object.values(nurserRecord) || [];
    } catch (error) {
      console.log('getNursers error');
    }

    return [];
  };

  getNurser = async (id?: string): Promise<Nurser | null> => {
    try {
      if (this.useMock) {
        return this.getMock('nurseries', true, id);
      }

      if (id) {
        return await DB.getApi<Nurser>(`nurseries/${id}`) || null;
      }
      console.log('getNurser id is undefined');
    } catch (error) {
      console.log('getNurser error');
    }

    return null;
  };

  createNurser = async (nurser?: Partial<Nurser>, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (nurser) {
        await DB.postApi<Partial<Nurser>>(`nurseries`, nurser, callback, errorCallback);
      } else {
        console.log('createNurser nurser is undefined');
      }
    } catch (error) {
      console.log('createNurser error');
    }
  };

  updateNurser = async (nurser?: Nurser, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (nurser) {
        await DB.updateApi<Nurser>(`nurseries`, nurser, callback, errorCallback);
      } else {
        console.log('updateNurser nurser is undefined');
      }
    } catch (error) {
      console.log('updateNurser error');
    }
  };

  deleteNurser = async (id?: string, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (id) {
        await DB.deleteApi(`nurseries`, id, callback, errorCallback);
      } else {
        console.log('deleteNurser id is undefined');
      }
    } catch (error) {
      console.log('deleteNurser error');
    }
  };

  multiDeleteNurser = async (ids?: string[], callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (ids?.length) {
        await DB.multiDeleteApi(`nurseries`, ids, callback, errorCallback);
      } else {
        console.log('multiDeleteNurser id is undefined');
      }
    } catch (error) {
      console.log('multiDeleteNurser error');
    }
  };
}

export default new NurserMethods();
