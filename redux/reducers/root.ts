import { combineReducers } from 'redux';
import { userReducer } from './user';
import { usersReducer } from './users';
import { adminReducer } from './admin';

export const rootReducer = combineReducers({
  usersState: usersReducer,
  userState: userReducer,
  adminState: adminReducer,
});
