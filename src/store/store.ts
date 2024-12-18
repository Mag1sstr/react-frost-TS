import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import filterSlice from "./filterSlice"
import newOrderSlice from "./newOrderSlice"

export const store = configureStore({
   reducer: {
      auth: authSlice,
      filter: filterSlice,
      newOrder: newOrderSlice,
   },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
