import { ApiMethods } from './ApiMethods';
import { Breed, Exhibition, Title } from './types';
import { DB } from '../utils/db';

class DictionaryMethods extends ApiMethods {
  getExhibitions = async (): Promise<Exhibition[]> => {
    try {
      if (this.useMock) {
        return this.getMock('exhibitions');
      }

      const exhibitionRecord = await DB.getApi<Record<string, Exhibition>>('exhibitions') || {};

      return Object.values(exhibitionRecord) || [];
    } catch (error) {
      console.log('getExhibitions error');
    }

    return [];
  };

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
