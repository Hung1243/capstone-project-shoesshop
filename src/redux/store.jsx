import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "./Reducers/UserReducer";
import cartReducer from "./Reducers/cartReducer";


export const store = configureStore({
  reducer: {
    //casc state ung dung
    userReducer: UserReducer,
    cart: cartReducer,
  },
});
