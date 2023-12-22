import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { encryptTransform } from "redux-persist-transform-encrypt";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // You can specify which reducers to persist here
  transforms: [
    encryptTransform({
      secretKey: "secretOfTheUniverse",
      onError: function (error) {
        // Handle the error.
        console.log(error)
      },
    }),
  ]
};

const rootReducer = combineReducers({
  auth: authReducer,
  // (other reducers)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: true,
    }),
});
const persistor = persistStore(store);

export { store, persistor };
