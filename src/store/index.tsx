import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persisConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  counter: cartSlice,
});

const persistedReducer = persistReducer(persisConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
