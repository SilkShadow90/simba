export * from './AxiosService';
export * from './common';

export type ApiResponse<T> = {
  name: string
  url: string
  data?: T
}
