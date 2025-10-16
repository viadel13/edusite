import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slices/booksSlice";
import cartReducer from "./slices/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      books: bookReducer,
      cart: cartReducer,
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
