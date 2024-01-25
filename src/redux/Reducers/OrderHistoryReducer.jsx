import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
};

const OrderHistoryReducer = createSlice({
  name: "OrderHistoryReducer",
  initialState,
  reducers: {
    fetchOrderHistorySuccess: (state, action) => {
      state.orderHistory = action.payload;
    },
  },
});

export const { fetchOrderHistorySuccess } = OrderHistoryReducer.actions;

export default OrderHistoryReducer.reducer;
