import { ApiMethods } from './ApiMethods';
import { Cat } from './types';
import { DB } from '../utils/db';

class CatMethods extends ApiMethods {
  getCats = async (): Promise<Cat[]> => {
    try {
      if (this.useMock) {
        return this.getMock('cats');
      }

      const catsRecord = await DB.getApi<Record<string, Cat>>('cats') || {};

      return Object.values(catsRecord) || [];
    } catch (error) {
      console.log('getCats error');
    }

    return [];
  };

  getCat = async (id: string): Promise<Cat | null> => {
    try {
      if (this.useMock) {
        return this.getMock('cats', true, id);
      }
      return await DB.getApi<Cat>(`cats/${id}`) || null;
    } catch (error) {
      console.log('getCat error');
    }

    return null;
  };

  createCat = async (cat: Cat, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.postApi<Cat>(`cats`, cat, callback);
    } catch (error) {
      console.log('createCat error');
    }
  };

  updateCat = async (cat: Cat, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.updateApi<Cat>(`cats`, cat, callback);
    } catch (error) {
      console.log('updateCat error');
    }
  };

  deleteCat = async (id: string, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.deleteApi(`cats`, id, callback);
    } catch (error) {
      console.log('deleteCat error');
    }
  };

  multiDeleteCat = async (ids: string[], callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.multiDeleteApi(`cats`, ids, callback);
    } catch (error) {
      console.log('multiDeleteCat error');
    }
  };
}

export default new CatMethods();
