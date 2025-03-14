import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { contentApi } from '@/shared/api/content';

import challengeSlice from './features/challenges/challengeSlice';
import finishedChallengesSlice from './features/finished_challenges/finishedChallengesSlice';
import errorSlice from './features/errors/errorSlice';
import notificationSlice from './features/notifications/notificationSlice';
import statisticsSlice from './features/statistics/statisticsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      challenge: challengeSlice,
      finished_challenges: finishedChallengesSlice,
      error: errorSlice,
      notification: notificationSlice,
      statistics: statisticsSlice,
      [contentApi.reducerPath]: contentApi.reducer,
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(contentApi.middleware),
  });
};
setupListeners(makeStore);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
