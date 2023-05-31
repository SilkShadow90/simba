import { RecordType } from '../api/DictionaryMethods';
import { BaseDictionary, Cat, Club, Nurser, RecordCRUD, User } from '../api/types';

export type AppState = {
  dictionariesState: {
    isLoading: boolean,
    isError: boolean,
    dictionaries: Record<string, RecordType<BaseDictionary> | Record<string, Club | User | Cat | Nurser>>,
  },
  tablesState: {
    isLoading: boolean,
    isError: boolean,
    tables: RecordCRUD,
  },
  form:any
}

export const initialState = {
  dictionariesState: {
    isLoading: false,
    isError: false,
    dictionaries: {},
  },
  tablesState: {
    isLoading: false,
    isError: false,
    tables: {},
  },
  form:{}
};
