import useSWR from 'swr';
import { ApiResponse, fetcher, getBackEndUrl, isProd } from ".";

import breedsList from '../pages/api/breedsList.json';
import titulsList from '../pages/api/titulsList.json';

export const useFetchService = <T>(apiName: 'breeds' | 'tituls'): ApiResponse<T> | undefined => {
  const url = `${getBackEndUrl()}/api/${apiName}`;
  const { data } = useSWR<ApiResponse<T>>(url, fetcher);

  if (isProd()) {
    switch (apiName) {
      case 'breeds':
        return { data: breedsList as never as T, url, name: 'breeds' };
      case 'tituls':
        return { data: titulsList as never as T, url, name: 'tituls' };
      default:
        return data;
    }
  }

  return data;
};
