import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, REGISTER, REHYDRATE } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// @ts-ignore
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger';
import { tokenizationEngineApi } from '@/api/tokenization-engine';
import { appReducer } from './slices';
import { PersistState } from 'redux-persist/es/types';
import { AppState } from './slices/app/app.initialstate';

const persistAppsConfig = {
  key: 'app',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const store = configureStore({
  reducer: {
    // @ts-ignore
    app: persistReducer(persistAppsConfig, appReducer),
    [tokenizationEngineApi.reducerPath]: tokenizationEngineApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    })
      .concat(rtkQueryErrorLogger)
      .concat(tokenizationEngineApi.middleware),
});

const persistor = persistStore(store);

// @ts-ignore
window.store = store;

export type RootState = {
  app: AppState & PersistState;
  [tokenizationEngineApi.reducerPath]: ReturnType<typeof tokenizationEngineApi.reducer>;
};

export { store, persistor };
