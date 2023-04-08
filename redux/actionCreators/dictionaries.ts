import { DictionariesReducerType } from '../reducers/dictionaries';
import { AppThunk } from '../index';
import { delay } from '../../utils';
import DictionaryMethods, { RecordType } from '../../api/DictionaryMethods';
import { BaseDictionary, Cat, Club, Nurser, User } from '../../api/types';
import ClubMethods from '../../api/ClubMethods';
import UserMethods from '../../api/UserMethods';
import CatMethods from '../../api/CatMethods';
import NurserMethods from '../../api/NurserMethods';

const actionDictionariesStartFetch = { type: DictionariesReducerType['dictionaries/startFetch'] };
const actionDictionariesCompletedFetch = (dictionaries: Record<string, RecordType<BaseDictionary> | Record<string, Club | User | Cat | Nurser>>) => ({
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

        const [
          statusDictionary,
          typeDictionary,
          breedDictionary,
          titleDictionary,
          clubDictionary,
          userDictionary,
          catDictionary,
          nurserDictionary,
        ] = await Promise.all([
          DictionaryMethods.getStatusesRecord(),
          DictionaryMethods.getTypeRecord(),
          DictionaryMethods.getBreedRecord(),
          DictionaryMethods.getTitleRecord(),
          ClubMethods.getRecord<Club>(),
          UserMethods.getRecord<User>(),
          CatMethods.getRecord<Cat>(),
          NurserMethods.getRecord<Nurser>(),
        ]);

        const dictionaries: Record<string, RecordType<BaseDictionary> | Record<string, Club | User | Cat | Nurser>> = {
          statusDictionary,
          typeDictionary,
          breedDictionary,
          titleDictionary,
          clubDictionary,
          userDictionary,
          catDictionary,
          nurserDictionary,
        };

        if (
          dictionaries.statusDictionary
          && dictionaries.typeDictionary
          && dictionaries.breedDictionary
          && dictionaries.titleDictionary
          && dictionaries.clubDictionary
          && dictionaries.userDictionary
          && dictionaries.catDictionary
          && dictionaries.nurserDictionary
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
