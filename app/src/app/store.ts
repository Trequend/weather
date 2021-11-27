import { configureStore } from '@reduxjs/toolkit';
import { searchReducer, SEARCH_SLICE_NAME } from '../features/search/slice';

export const store = configureStore({
  reducer: {
    [SEARCH_SLICE_NAME]: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
