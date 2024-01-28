// cartReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const findCartItemIndex = (cartItems, newItem) => {
  return cartItems.findIndex(
    (item) => item.id === newItem.id && item.size === newItem.size
  );
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = { ...action.payload, timestamp: Date.now() };
      const existingIndex = findCartItemIndex(state.items, newItem);

      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    updateCartItem: (state, action) => {
      const updatedItem = action.payload;
      const existingIndex = findCartItemIndex(state.items, updatedItem);

      if (existingIndex !== -1) {
        state.items[existingIndex] = updatedItem;
      }
    },
    removeCartItem: (state, action) => {
      const removedItemId = action.payload;
      state.items = state.items.filter((item) => item.id !== removedItemId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCartItem, removeCartItem, clearCart } =
  cartReducer.actions;

export default cartReducer.reducer;
