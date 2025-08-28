import { configureStore } from '@reduxjs/toolkit';

import { backendAPI } from './api';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendAPI.middleware),
});

// Infer the `StateSchema` and `AppDispatch` types from the store itself
export type StateSchema = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
