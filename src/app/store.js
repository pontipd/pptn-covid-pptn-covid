import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';

import rootReducer from './rootReducer';

const persistConfig = {
  //type: _constants.REGISTER,
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
}

const _persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;