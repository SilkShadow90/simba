import { ApiMethods } from './ApiMethods';
import { Cat, Exhibition, ID } from './types';
import { devLog, earlyDate } from '../utils';
import CatMethods from './CatMethods';

class ExhibitionMethods extends ApiMethods<Exhibition> {
  readonly field = 'exhibitions';

  readonly apiName = 'Выставка';

  getLatestExhibitions = async (): Promise<Exhibition[]> => {
    try {
      const exhibitions = await this.getAll();

      return exhibitions.sort((a: Exhibition, b: Exhibition) =>
        Number(new Date(a.dateStart)) - Number(new Date(b.dateStart)))
        .filter((exhibition: Exhibition) => earlyDate(exhibition.dateStart));
    } catch (error) {
      devLog('getLatestExhibitions error');
    }

    return [];
  };

  getNearestExhibitions = async (): Promise<Exhibition[]> => {
    try {
      const exhibitions = await this.getAll<Exhibition>();

      return exhibitions.sort((a: Exhibition, b: Exhibition) =>
        Number(new Date(a.dateStart)) - Number(new Date(b.dateStart)))
        .filter((exhibition: Exhibition) => !earlyDate(exhibition.dateStart));

    } catch (error) {
      devLog('getNearestExhibitions error');
    }

    return [];
  };

  getExhibitionWinners = async (id?: ID): Promise<Cat[]> => {
    try {
      if (this.useMock) {
        return this.getMock('cats');
      }

      const exhibition = await this.getById(id);

      const catWinnerIds = exhibition?.catWinnerIds;

      let cats: Array<Cat | null> = [];

      if (catWinnerIds?.length) {
        cats = await Promise.all(catWinnerIds?.map((winnerId) => CatMethods.getById(winnerId)));
      }

      console.warn('cats', cats);

      return cats.filter(v => v !== null) as Cat[];
    } catch (error) {
      devLog('getUserWinners error');
    }

    return [];
  };
}

export default new ExhibitionMethods();
