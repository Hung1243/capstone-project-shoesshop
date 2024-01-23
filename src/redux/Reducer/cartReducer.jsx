// cartReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    // Thêm các reducers khác tùy thuộc vào các action khác
  },
});

export const { addToCart } = cartReducer.actions;

export default cartReducer;
