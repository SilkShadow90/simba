import { combineReducers } from 'redux';
import { dictionariesReducer } from './dictionaries';
import { tablesReducer } from './tables';

export const rootReducer = combineReducers({
  dictionariesState: dictionariesReducer,
  tablesState: tablesReducer,
});
