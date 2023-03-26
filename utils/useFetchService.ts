import { useCallback, useEffect, useState } from 'react';
import CatMethods from '../api/CatMethods';
import ExhibitionMethods from '../api/ExhibitionMethods';
import DictionaryMethods from '../api/DictionaryMethods';
import NurserMethods from '../api/NurserMethods';
import UserMethods from '../api/UserMethods';

type dataType = 'breeds' | 'titles' | 'users' | 'users/id' | 'nurseries' | 'nurseries/id' | 'referees' | 'exhibitionReferees' |
    'exhibitionsWinner' | "nearexhibition" | "lastexhibition"| "cats" | "cats/id" | "exhibitions/id" | "allExhibition"

export type FetchService<T> = {
  data?: T | null,
  fetchData?(): void
} | undefined

export const useFetchService = <T>(apiName: dataType, reqData?: { id?: string }): FetchService<T> => {
  const [data, setData] = useState<T | null>();

  const fetchData = useCallback(async () => {
    let fetched: T;

    switch (apiName) {
      case 'titles':
        fetched = await DictionaryMethods.getTitles() as never as T;
        break;
      case 'breeds':
        fetched = await DictionaryMethods.getBreeds() as never as T;
        break;
      case 'users':
        fetched = await UserMethods.getUsers() as never as T;
        break;
      case 'users/id':
        fetched = await UserMethods.getUser(reqData?.id || '') as never as T;
        break;
      case 'cats':
        fetched = await CatMethods.getCats() as never as T;
        break;
      case 'cats/id':
        fetched = await CatMethods.getCat(reqData?.id || '') as never as T;
        break;
      case 'referees':
        fetched = await UserMethods.getReferees() as never as T;
        break;
      case 'exhibitionsWinner':
        fetched = await UserMethods.getExhibitionWinners(reqData?.id || '') as never as T;
        break;
      case 'exhibitionReferees':
        fetched = await UserMethods.getExhibitionReferees(reqData?.id || '') as never as T;
        break;
      case 'nearexhibition':
        fetched = await ExhibitionMethods.getNearestExhibitions() as never as T;
        break;
      case 'lastexhibition':
        fetched = await ExhibitionMethods.getLatestExhibitions() as never as T;
        break;
      case 'allExhibition':
        fetched = await ExhibitionMethods.getExhibitions() as never as T;
        break;
      case 'exhibitions/id':
        fetched = await ExhibitionMethods.getExhibition(reqData?.id || '') as never as T;
        break;
      case 'nurseries':
        fetched = await NurserMethods.getNurseries() as never as T;
        break;
      case 'nurseries/id':
        fetched = await NurserMethods.getNurser(reqData?.id || '') as never as T;
        break;
      default:
        fetched = {} as never as T;
    }

    setData(fetched);
  }, [apiName, reqData?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};
