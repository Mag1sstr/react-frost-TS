import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import filterSlice from "./filterSlice";
import newOrderSlice from "./newOrderSlice";
import basketSlice from "./basketSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    filter: filterSlice,
    newOrder: newOrderSlice,
    basket: basketSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
