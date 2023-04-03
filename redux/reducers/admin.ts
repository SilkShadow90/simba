import { initialState } from '../initialState';

export enum AdminReducerType {
  'admin/main' = 'admin/main',
  'admin/docs' = 'admin/docs',
}

export type AdminAction = {
  type: AdminReducerType | string;
  payload: any;
};

export function adminReducer(
  // eslint-disable-next-line default-param-last
  state = initialState.adminState,
  action: AdminAction,
) {
  switch (action.type) {
    default:
      return state;
  }
}


