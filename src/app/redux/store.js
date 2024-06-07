import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import storage from './customStorage'
import RootSlice from './Slices/RootSlice'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, RootSlice)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      /* The line `// logger,` is commented out, which means it is not currently being executed. */
      // logger
    ]),
})

export const persistor = persistStore(store)
