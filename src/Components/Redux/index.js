import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./user-slice"; 

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,

  blacklist: ["omitedPart"],
};

const reducer = combineReducers({
  user: userSliceReducer, 
});

const persistedReducer = persistReducer(persistConfig, reducer);

const redux = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default redux;
