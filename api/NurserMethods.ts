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

  getNurser = async (id: string): Promise<Nurser | null> => {
    try {
      if (this.useMock) {
        return this.getMock('nurseries', true, id);
      }
      return await DB.getApi<Nurser>(`nurseries/${id}`) || null;
    } catch (error) {
      console.log('getNurser error');
    }

    return null;
  };

  createNurser = async (nurser: Partial<Nurser>, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.postApi<Partial<Nurser>>(`nurseries`, nurser, callback);
    } catch (error) {
      console.log('createNurser error');
    }
  };

  updateNurser = async (nurser: Nurser, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.updateApi<Nurser>(`nurseries`, nurser, callback);
    } catch (error) {
      console.log('updateNurser error');
    }
  };

  deleteNurser = async (id: string, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.deleteApi(`nurseries`, id, callback);
    } catch (error) {
      console.log('deleteNurser error');
    }
  };

  multiDeleteNurser = async (ids: string[], callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.multiDeleteApi(`nurseries`, ids, callback);
    } catch (error) {
      console.log('multiDeleteNurser error');
    }
  };
}

export default new NurserMethods();
