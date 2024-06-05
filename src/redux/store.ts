import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from './auth/authApi';
import { authReducer } from './auth/authSlice';

import { productsApi } from './products/productsApi';
import { customersApi } from './dashboard/customersApi';
import { ordersApi } from './dashboard/ordersApi';
import { incomeExpensesApi } from './dashboard/incomeExpensesApi';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [incomeExpensesApi.reducerPath]: incomeExpensesApi.reducer,

    auth: persistedAuthReducer,
  },
  middleware: gDM =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      productsApi.middleware,
      customersApi.middleware,
      ordersApi.middleware,
      incomeExpensesApi.middleware,
      authApi.middleware
    ),
});

export type TypeDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
