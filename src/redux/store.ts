import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import headerSlice from "./slices/headerSlice";
import farmSlice from "./slices/farmSlice";
import businessSlice from "./slices/businessSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "farm", "business"], // persist edilecek slice'ları belirtin
};

const rootReducer = combineReducers({
  auth: authReducer,
  farm: farmSlice,
  business: businessSlice,
  header: headerSlice, // persist edilmeyecek slice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
