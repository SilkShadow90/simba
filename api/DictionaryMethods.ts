import { ApiMethods } from './ApiMethods';
import { BaseDictionary, Breed, ExhibitionType, IDObject, Status, Title } from './types';

type RecordType<T extends BaseDictionary> = Record<T[keyof IDObject], T> | null

class DictionaryMethods extends ApiMethods<BaseDictionary> {
  readonly field = 'titles' || 'breeds' || 'statuses';

  readonly apiName = 'titles' || 'breeds' || 'statuses';

  getTitles = async (): Promise<Title[]> => {
    return this.getAll('titles');
  };

  getTitleRecord = async (): Promise<RecordType<Title>> => {
    return this.getRecord('titles');
  };

  getTypes = async (): Promise<ExhibitionType[]> => {
    return this.getAll('titles');
  };

  getTypeRecord = async (): Promise<RecordType<ExhibitionType>> => {
    return this.getRecord('types');
  };

  getBreeds = async (): Promise<Breed[]> => {
    return this.getAll('breeds');
  };

  getBreedRecord = async (): Promise<RecordType<Breed>> => {
    return this.getRecord('breeds');
  };

  getStatuses = async (): Promise<Status[]> => {
    return this.getAll('statuses');
  };

  getStatusesRecord = async (): Promise<RecordType<Status>> => {
    return this.getRecord('statuses');
  };
}

export default new DictionaryMethods();
