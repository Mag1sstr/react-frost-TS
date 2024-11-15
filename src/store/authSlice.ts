import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const initialState = {
  user: null,
  tokenInfo: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getTokenInfo(state, action) {
      state.tokenInfo = action.payload;
      // console.log(state.tokenInfo);
    },
    setUser(state, action) {
      if (state.tokenInfo) {
        state.user = action.payload;
      }
    },
    deleteUser(state, action) {
      state.user = action.payload;
    },
  },
});

export function signIn(username, password) {
  return function (dispatch) {
    // dispatch(setTokenInfo())

    axios
      .post("https://frost.runtime.kz/api/auth/token", {
        username: username,
        password: password,
      })
      .then((resp) => {
        dispatch(getTokenInfo(resp.data.access_token));
        localStorage.setItem("token", resp.data.access_token);
      })
      .catch(() => {
        throw new Error("token error");
      });
  };
}
export function getUser() {
  return function (dispatch) {
    const token = useSelector((state) => state.auth.tokenInfo);
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        .post("https://frost.runtime.kz/api/auth/user", {}, {})
        .then((resp) => {
          dispatch(setUser(resp.data));
        });
    }
  };
}

// Action creators are generated for each case reducer function
export const { getTokenInfo, setUser, deleteUser } = authSlice.actions;

export default authSlice.reducer;
