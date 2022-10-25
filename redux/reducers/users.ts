import { initialState } from '../initialState';

export enum UsersReducerType {
  'users/startFetch' = 'users/startFetch',
  'users/completedFetch' = 'users/completedFetch',
  'users/errorFetch' = 'users/errorFetch',
}

export type UsersAction = {
  type: UsersReducerType;
  payload: any;
};

export function usersReducer(
  state = initialState.usersState,
  action: UsersAction,
) {
  switch (action.type) {
    case UsersReducerType['users/startFetch']:
      return {
        ...state,
        pagination: undefined,
        users: state.users,
        isLoading: true,
        isError: false,
      };
    case UsersReducerType['users/completedFetch']:
      return {
        ...state,
        pagination: action.payload.pagination,
        users: action.payload.users,
        isLoading: false,
        isError: false,
      };
    case UsersReducerType['users/errorFetch']:
      return {
        ...state,
        pagination: undefined,
        users: [],
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
