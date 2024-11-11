import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from './global';
import userReducer from './user';

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
