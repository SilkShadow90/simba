import { DictionariesReducerType } from '../reducers/dictionaries';
import { AppThunk } from '../index';
import { delay } from '../../utils';
import DictionaryMethods, { RecordType } from '../../api/DictionaryMethods';
import { BaseDictionary, Club, User } from '../../api/types';
import ClubMethods from '../../api/ClubMethods';
import UserMethods from '../../api/UserMethods';

const actionDictionariesStartFetch = { type: DictionariesReducerType['dictionaries/startFetch'] };
const actionDictionariesCompletedFetch = (dictionaries: Record<string, RecordType<BaseDictionary> | Record<string, Club | User>>) => ({
  type: DictionariesReducerType['dictionaries/completedFetch'],
  payload: { dictionaries },
});

const actionDictionariesErrorFetch = { type: DictionariesReducerType['dictionaries/errorFetch'] };

export const fetchDictionaries =
  (): AppThunk =>
    async (dispatch): Promise<void> => {
      dispatch(actionDictionariesStartFetch);

      try {
        await delay(1000);

        const [statusDictionary, typeDictionary, breedDictionary, titleDictionary, clubDictionary, userDictionary] = await Promise.all([
          DictionaryMethods.getStatusesRecord(),
          DictionaryMethods.getTypeRecord(),
          DictionaryMethods.getBreedRecord(),
          DictionaryMethods.getTitleRecord(),
          ClubMethods.getRecord<Club>(),
          UserMethods.getRecord<User>(),
        ]);

        const dictionaries: Record<string, RecordType<BaseDictionary> | Record<string, Club | User>> = {
          statusDictionary,
          typeDictionary,
          breedDictionary,
          titleDictionary,
          clubDictionary,
          userDictionary,
        };

        if (
          dictionaries.statusDictionary
          && dictionaries.typeDictionary
          && dictionaries.breedDictionary
          && dictionaries.titleDictionary
          && dictionaries.clubDictionary
          && dictionaries.userDictionary
        ) {
          dispatch(actionDictionariesCompletedFetch(dictionaries));
        } else {
          throw new Error('no dictionaries');
        }
      } catch (e) {
        console.error(e);
        dispatch(actionDictionariesErrorFetch);
      }
    };
