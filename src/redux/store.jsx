import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducer/UserReducer";
import cartReducer from "./Reducer/cartReducer";

export const store = configureStore({
  reducer: {
    //casc state ung dung
    userReducer: UserReducer,
    cartReducer: cartReducer,
  },
});
