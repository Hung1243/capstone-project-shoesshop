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
      const newItem = action.payload;
      const existingIndex = findCartItemIndex(state.items, newItem);

      if (existingIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, chỉ tăng số lượng
        state.items[existingIndex].quantity += newItem.quantity;
      } else {
        // Ngược lại, thêm một hàng mới vào giỏ hàng
        state.items.push(newItem);
      }
    },
  },
});

export const { addToCart } = cartReducer.actions;

export default cartReducer.reducer;
