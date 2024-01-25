// Cart.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Reducers/cartReducer";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Lấy dữ liệu giỏ hàng từ localStorage khi component được tạo
  useEffect(() => {
    const storedCartData = localStorage.getItem("cart");
    if (storedCartData) {
      const parsedCartData = JSON.parse(storedCartData);
      // Dispatch action để cập nhật giỏ hàng từ dữ liệu trong localStorage
      parsedCartData.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ maxWidth: "50px" }}
                />
              </td>
              <td>{item.size}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.total}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Submit Order</button>
    </div>
  );
};

export default Cart;
