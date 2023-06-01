import { AppState, initialState } from '../initialState';

export enum DictionariesReducerType {
  'dictionaries/startFetch' = 'dictionaries/startFetch',
  'dictionaries/completedFetch' = 'dictionaries/completedFetch',
  'dictionaries/errorFetch' = 'dictionaries/errorFetch',
}

export type DictionariesAction = {
  type: DictionariesReducerType;
  payload: AppState['dictionariesState'];
};

export function dictionariesReducer(
  // eslint-disable-next-line default-param-last
  state: AppState['dictionariesState'] = initialState.dictionariesState,
  action: DictionariesAction,
): AppState['dictionariesState'] {
  switch (action.type) {
    case DictionariesReducerType['dictionaries/startFetch']:
      return {
        ...state,
        dictionaries: state.dictionaries,
        isLoading: true,
        isError: false,
      };
    case DictionariesReducerType['dictionaries/completedFetch']:
      return {
        ...state,
        dictionaries: action.payload.dictionaries,
        isLoading: false,
        isError: false,
      };
    case DictionariesReducerType['dictionaries/errorFetch']:
      return {
        ...state,
        dictionaries: {},
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
