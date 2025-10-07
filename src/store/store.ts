import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slices/bookSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      books: bookReducer,
    },
  });
};

// Types TypeScript pour le store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
