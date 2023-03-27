import { ApiMethods } from './ApiMethods';
import { Exhibition } from './types';
import { DB } from '../utils/db';
import { earlyDate } from '../utils';

class ExhibitionMethods extends ApiMethods {
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

  getExhibition = async (id: string): Promise<Exhibition | null> => {
    try {
      if (this.useMock) {
        return this.getMock('exhibitions', true, id);
      }
      return await DB.getApi<Exhibition>(`exhibitions/${id}`) || null;
    } catch (error) {
      console.log('getExhibition error');
    }

    return null;
  };

  getLatestExhibitions = async (): Promise<Exhibition[]> => {
    try {
      const exhibitions = await this.getExhibitions();

      return exhibitions.sort((a: Exhibition, b: Exhibition) =>
        Number(new Date(a.dateStart)) - Number(new Date(b.dateStart)))
        .filter((exhibition: Exhibition) => earlyDate(exhibition.dateStart));

    } catch (error) {
      console.log('getLatestExhibitions error');
    }

    return [];
  };

  getNearestExhibitions = async (): Promise<Exhibition[]> => {
    try {
      const exhibitions = await this.getExhibitions();

      return exhibitions.sort((a: Exhibition, b: Exhibition) => Number(new Date(a.dateStart)) - Number(new Date(b.dateStart)))
        .filter((exhibition: Exhibition) => !earlyDate(exhibition.dateStart));

    } catch (error) {
      console.log('getNearestExhibitions error');
    }

    return [];
  };

  createExhibition = async (exhibition: Partial<Exhibition>, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.postApi<Partial<Exhibition>>(`exhibitions`, exhibition, callback);
    } catch (error) {
      console.log('createExhibition error');
    }
  };

  updateExhibition = async (exhibition: Exhibition, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.updateApi<Exhibition>(`exhibitions`, exhibition, callback);
    } catch (error) {
      console.log('updateExhibition error');
    }
  };

  deleteExhibition = async (id: string, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.deleteApi(`exhibitions`, id, callback);
    } catch (error) {
      console.log('deleteExhibition error');
    }
  };

  multiDeleteExhibition = async (ids: string[], callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.multiDeleteApi(`exhibitions`, ids, callback);
    } catch (error) {
      console.log('multiDeleteExhibition error');
    }
  };
}

export default new ExhibitionMethods();
