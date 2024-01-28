// Trong file OrderHistory.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderHistorySuccess } from "../redux/Reducers/OrderHistoryReducer";
import { getProfileApiAction } from "../redux/Reducers/UserReducer";

const OrderHistory = () => {
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (
      !userProfile ||
      !userProfile.ordersHistory ||
      userProfile.ordersHistory.length === 0
    ) {
      dispatch(getProfileApiAction());
    }
  }, [dispatch, userProfile]);

  if (
    !userProfile ||
    !userProfile.ordersHistory ||
    userProfile.ordersHistory.length === 0
  ) {
    return <div>No order history available.</div>;
  }

  return (
    <div>
      <h3>Order History</h3>
      {userProfile.ordersHistory.map((order) => (
        <div key={order.id}>
          <p>{`+ Orders have been placed on ${new Date(
            order.date
          ).toLocaleDateString()}`}</p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetail.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ maxWidth: "50px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="5" className="text-right">
                  <strong>Total for this order:</strong>
                </td>
                <td>
                  $
                  {order.orderDetail.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
