import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { AppDispatch } from "./store"

interface newOrderState {
   orderNumber: number | null
}

const initialState: newOrderState = {
   orderNumber: null,
}

export const newOrderSlice = createSlice({
   name: "newOrderSlice",
   initialState,
   reducers: {
      setOrderNumber(state, action) {
         state.orderNumber = action.payload
      },
   },
})

export function getOrderInfo(
   phone: string,
   area: string,
   city: string,
   street: string,
   house: string,
   apartment: string
) {
   return function (dispatch: AppDispatch) {
      axios
         .post("https://frost.runtime.kz/api/orders", {
            phone,
            area,
            city,
            street,
            house,
            apartment,
         })
         .then((resp) => {
            console.log(resp)
            dispatch(setOrderNumber(resp.data))
         })
   }
}

export const { setOrderNumber } = newOrderSlice.actions

export default newOrderSlice.reducer
