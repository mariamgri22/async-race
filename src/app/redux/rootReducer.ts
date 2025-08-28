import { combineReducers } from '@reduxjs/toolkit';

import { carReducer } from '@/etities/Car';
import { winnerReducer } from '@/etities/Winner';

import { backendAPI } from './api';

export const rootReducer = combineReducers({
  car: carReducer,
  winner: winnerReducer,
  [backendAPI.reducerPath]: backendAPI.reducer,
});
