import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../redux/Reducers/cartReducer";
import axios from "axios";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartData = localStorage.getItem("cart");
    if (storedCartData) {
      const parsedCartData = JSON.parse(storedCartData);
      if (parsedCartData.length > 0 && cartItems.length === 0) {
        parsedCartData.forEach((item) => {
          dispatch(addToCart(item));
        });
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cart") || "[]");
    if (JSON.stringify(storedCartData) !== JSON.stringify(cartItems)) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleEdit = (item) => {
    setIsEditing(item.id);
  };

  const handleSave = (item) => {
    const newQuantity = item.quantity;
    const updatedItem = {
      ...item,
      quantity: newQuantity > 0 ? newQuantity : item.quantity,
      total: item.price * (newQuantity > 0 ? newQuantity : item.quantity),
    };
    dispatch(updateCartItem(updatedItem));
    setIsEditing(null);
  };

  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      dispatch(removeCartItem(item.id));
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(
        updateCartItem({
          ...item,
          quantity: newQuantity,
          total: item.price * newQuantity,
        })
      );
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    cartItems.forEach((item) => dispatch(removeCartItem(item.id)));
    localStorage.removeItem("cart");
    // Chuyển hướng về trang home sau khi nhấn nút "OK" trên modal
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) {
      // Hiển thị thông báo cho người dùng rằng giỏ hàng đang trống
      alert(
        "Your cart is empty. Add items to your cart before submitting an order."
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://shop.cyberlearn.vn/api/Users/order",
        {
          items: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          email: "",
        }
      );
      console.log("Order placement response:", response.data);
      showModal(); // Hiển thị modal sau khi đặt hàng thành công

      cartItems.forEach((item) => dispatch(removeCartItem(item.id)));
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
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
                  style={{ maxWidth: "100px" }}
                />
              </td>
              <td>{item.size}</td>
              <td>${item.price}</td>
              <td>
                {isEditing === item.id ? (
                  <div className="quantity-editor d-flex">
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      style={{
                        width: "50px",
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                      className="form-control text-center"
                      onChange={(e) =>
                        handleQuantityChange(item, parseInt(e.target.value, 10))
                      }
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleQuantityChange(item, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                ) : (
                  item.quantity
                )}
              </td>
              <td>${item.total}</td>
              <td>
                {isEditing === item.id ? (
                  <button
                    className="btn btn-success m-2"
                    onClick={() => handleSave(item)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-dark m-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={handleSubmitOrder}>
        Submit Order
      </button>
      <Modal
        title="Order Placed Successfully"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Your order has been placed successfully!</p>
      </Modal>
    </div>
  );
};

export default Cart;
