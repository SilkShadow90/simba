import { AppState, initialState } from '../initialState';

export enum TablesReducerType {
  'tables/startFetch' = 'tables/startFetch',
  'tables/completedFetch' = 'tables/completedFetch',
  'tables/errorFetch' = 'tables/errorFetch',
}

export type TablesAction = {
  type: TablesReducerType;
  payload: AppState['tablesState'];
};

export function tablesReducer(
  // eslint-disable-next-line default-param-last
  state: AppState['tablesState'] = initialState.tablesState,
  action: TablesAction,
): AppState['tablesState'] {
  switch (action.type) {
    case TablesReducerType['tables/startFetch']:
      return {
        ...state,
        tables: state.tables,
        isLoading: true,
        isError: false,
      };
    case TablesReducerType['tables/completedFetch']:
      return {
        ...state,
        tables: action.payload.tables,
        isLoading: false,
        isError: false,
      };
    case TablesReducerType['tables/errorFetch']:
      return {
        ...state,
        tables: {},
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
