import {configureStore as reduxConfigureStore} from '@reduxjs/toolkit';
import weddingReducer from './slices/wedding';

export default function configureStore() {
  return reduxConfigureStore({
    reducer: {
      wedding: weddingReducer,
    },
  });
}

export type AppStore = ReturnType<typeof configureStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
