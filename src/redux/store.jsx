// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './CartReducer';
import wishlistReducer from './wishlistReducer';
import userReducer from './userSlice';
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

// Configuration for persisting the cart reducer
const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
};
// Configuration for persisting the wishlist reducer
const wishlistPersistConfig = {
  key: 'wishlist',
  version: 1,
  storage,
};

const userPersistConfig = {
  key: 'wishlist',
  version: 1,
  storage,
};

// Create persisted reducers
const persistedCartReducer = persistReducer(cartPersistConfig, CartReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Configure the store with persisted reducers
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    user: persistedUserReducer, // Add the user reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export let persistor = persistStore(store);
