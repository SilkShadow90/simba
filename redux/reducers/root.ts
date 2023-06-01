import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { dictionariesReducer } from './dictionaries';
import { tablesReducer } from './tables';

export const rootReducer = combineReducers({
  dictionariesState: dictionariesReducer,
  tablesState: tablesReducer,
  form: formReducer,
});
