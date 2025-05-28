// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // defaults to localStorage for web
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
});

// persist config
const persistConfig = {
    key: 'root',     // where in localStorage it will save
    storage,
    version: 1,
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,   // because redux-persist uses non-serializable values inside
        }),
});

// persistor
export const persistor = persistStore(store);
export default store;