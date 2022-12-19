import useSWR from 'swr';
import { ApiResponse, fetcher, getBackEndUrl, isProd } from "./index";

import breedsList from '../pages/api/breedsList.json';
import titulsList from '../pages/api/titulsList.json';
import usersList from '../pages/api/usersList.json';
import nurseriesList from '../pages/api/nurseriesList.json';

type dataType = 'breeds' | 'tituls' | 'users' | 'user' | 'nurseries' | 'nurser' | 'referees' | 'exhibitionReferees' | 'exhibitionsWinner'

export const useFetchService = <T>(apiName: dataType, reqData?: { id: string }): ApiResponse<T> | undefined => {
  const url = `${getBackEndUrl()}/api/${apiName}${reqData?.id ? `/${reqData?.id}` : ''}`;
  const { data } = useSWR<ApiResponse<T>>(url, fetcher);

  if (isProd()) {
    switch (apiName) {
      case 'breeds':
        return { data: breedsList as never as T, url, name: 'breeds' };
      case 'tituls':
        return { data: titulsList as never as T, url, name: 'tituls' };
      case 'users':
      case 'referees':
      case 'exhibitionsWinner':
      case 'exhibitionReferees':
        return { data: usersList as never as T, url, name: 'referees' };
      case 'user':
        return { data: usersList[0] as never as T, url, name: 'users' };
      case 'nurseries':
        return { data: nurseriesList as never as T, url, name: 'nurseries' };
      case 'nurser':
        return { data: nurseriesList[0] as never as T, url, name: 'nurser' };
      default:
        return data;
    }
  }

  return data;
};
