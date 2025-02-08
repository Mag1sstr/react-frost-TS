import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./store";
import { IBasketPageData } from "../interfaces/interfaces";

interface IState {
  basketPageData: IBasketPageData[] | null;
  sum: number;
}

const initialState: IState = {
  basketPageData: null,
  sum: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketPageData(state, action) {
      state.basketPageData = action.payload;
    },
    setSum(state, action) {
      state.sum = action.payload;
    },
  },
});

export function getBasketPageData() {
  return function (dispatch: AppDispatch) {
    axios.get("https://frost.runtime.kz/api/cart").then((resp) => {
      dispatch(setBasketPageData(resp.data.items));
      let sumPrice = 0;
      for (const el of resp.data.items) {
        sumPrice += el.product.price * el.count;
      }
      dispatch(setSum(sumPrice));
    });
  };
}

export const { setBasketPageData, setSum } = basketSlice.actions;

export default basketSlice.reducer;
