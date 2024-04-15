import { configureStore } from "@reduxjs/toolkit";
import { policeReducer } from "./modules/common/police/slice";
import { violenceReducer } from "./modules/common/violence/slice";

export const store = configureStore({
  reducer: {
    police: policeReducer,
    violence: violenceReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type GetState = typeof store.getState;
export type AppState = ReturnType<GetState>;
export type AppStore = typeof store;
