import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useQuery = () => {
  const router = useRouter();

  return router.query as never as Record<string, string>;
};
