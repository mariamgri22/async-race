import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { StateSchema, AppDispatch } from './store';

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<StateSchema> = selectorHook;
