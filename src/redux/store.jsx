import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducer/UserReducer";

export const store = configureStore({
  reducer: {
    //casc state ung dung
    userReducer: UserReducer,
  },
});
