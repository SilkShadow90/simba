import { ApiMethods } from './ApiMethods';
import { Breed, Title } from './types';
import { DB } from '../utils/db';

class DictionaryMethods extends ApiMethods {
  getTitles = async (): Promise<Title[]> => {
    try {
      if (this.useMock) {
        return this.getMock('titles');
      }

      const titleRecord = await DB.getApi<Record<string, Title>>('titles') || {};

      return Object.values(titleRecord) || [];
    } catch (error) {
      console.log('getTitles error');
    }

    return [];
  };

  getBreeds = async (): Promise<Breed[]> => {
    try {
      if (this.useMock) {
        return this.getMock('breeds');
      }

      const breedRecord = await DB.getApi<Record<string, Breed>>('breeds') || {};


      return Object.values(breedRecord) || [];
    } catch (error) {
      console.log('getBreeds error');
    }

    return [];
  };
}

export default new DictionaryMethods();
