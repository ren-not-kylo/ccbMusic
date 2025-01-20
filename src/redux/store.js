import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { shazamCoreApi } from './services/shazamCore';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  //all of this is necessary in redux code, boilerplate can be found in documentation
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
