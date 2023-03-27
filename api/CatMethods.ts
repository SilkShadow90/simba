import { ApiMethods } from './ApiMethods';
import { Cat, MethodFunc } from './types';
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

  getCat = async (id?: string): Promise<Cat | null> => {
    try {
      if (this.useMock) {
        return this.getMock('cats', true, id);
      }

      if (id) {
        return await DB.getApi<Cat>(`cats/${id}`) || null;
      }
      console.log('getCat id is undefined');
    } catch (error) {
      console.log('getCat error');
    }

    return null;
  };

  createCat = async (cat?: Partial<Cat>, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (cat) {
        await DB.postApi<Partial<Cat>>(`cats`, cat, callback, errorCallback);
      } else {
        console.log('createCat cat is undefined');
      }
    } catch (error) {
      console.log('createCat error');
    }
  };

  updateCat = async (cat?: Cat, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (cat) {
        await DB.updateApi<Cat>(`cats`, cat, callback, errorCallback);
      } else {
        console.log('updateCat cat is undefined');
      }
    } catch (error) {
      console.log('updateCat error');
    }
  };

  deleteCat = async (id?: string, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (id) {
        await DB.deleteApi(`cats`, id, callback, errorCallback);
      } else {
        console.log('deleteCat id is undefined');
      }
    } catch (error) {
      console.log('deleteCat error');
    }
  };

  multiDeleteCat = async (ids?: string[], callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (ids?.length) {
        await DB.multiDeleteApi(`cats`, ids, callback, errorCallback);
      } else {
        console.log('multiDeleteCat ids is undefined');
      }
    } catch (error) {
      console.log('multiDeleteCat error');
    }
  };
}

export default new CatMethods();
