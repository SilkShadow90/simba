import { RecordType } from '../api/DictionaryMethods';
import { BaseDictionary, Club, RecordCRUD, User } from '../api/types';

export type AppState = {
  dictionariesState: {
    isLoading: boolean,
    isError: boolean,
    dictionaries: Record<string, RecordType<BaseDictionary> | Record<string, Club | User>>,
  },
  tablesState: {
    isLoading: boolean,
    isError: boolean,
    tables: RecordCRUD,
  },
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
};
