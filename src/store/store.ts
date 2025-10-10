import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slices/booksSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      books: bookReducer,
    },
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
              serializableCheck: false,
          }),
  });
};

// Types TypeScript pour le store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
