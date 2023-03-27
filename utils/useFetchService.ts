import { useCallback, useEffect, useMemo, useState } from 'react';
import { MethodFunc } from '../api/types';

export type FetchService<T, U> = {
  data?: T | null,
  fetchData(data?: U): Promise<void>
  loading: boolean
  error: boolean
}

type FetchServicePropsObj<T, U = undefined> = {
  methodFunc: MethodFunc<T, U>
  successCallback?(): void,
  errorCallback?(): void
  reqData?: U
  pending?: boolean
}

export type FetchServiceProps<T, U = undefined> = FetchServicePropsObj<T, U> | MethodFunc<T, U>

export const useFetchService = <T, U = undefined>(props: FetchServiceProps<T, U>, req?: U, pendingProps?: boolean): FetchService<T, Partial<U>> => {
  const { methodFunc, reqData, successCallback, errorCallback, pending = false } = useMemo(() => {
    if (typeof props === 'function') {
      return { methodFunc: props, reqData: req, pending: pendingProps };
    }

    return props;
  }, [pendingProps, props, req]);

  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState<boolean>(!pending);
  const [error, setError] = useState<boolean>(false);

  const errorFunc = useCallback(() => {
    setError(true);
    errorCallback?.();
  }, [errorCallback]);

  const fetchData = useCallback(async (newReqData?: U) => {
    setLoading(true);
    const fetched: T | void | null = await methodFunc(newReqData || reqData, successCallback, errorFunc);
    setLoading(false);
    if (fetched !== undefined) {
      setData(fetched);
    }

  }, [errorCallback, methodFunc, reqData, successCallback]);

  useEffect(() => {
    if (!pending) {
      fetchData();
    }
  }, [fetchData, pending]);

  return { data, fetchData, loading, error };
};
