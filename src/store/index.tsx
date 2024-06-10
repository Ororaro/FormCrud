import { combineReducers, configureStore } from "@reduxjs/toolkit";
import listSlice from "./list-slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persisConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  counter: listSlice,
});

const persistedReducer = persistReducer(persisConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
