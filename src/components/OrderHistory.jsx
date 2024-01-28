import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchOrderHistorySuccess } from "../redux/Reducers/OrderHistoryReducer";

const OrderHistory = () => {
  const userLogin = useSelector((state) => state.userReducer.userLogin);
  const [orderHistory, setOrderHistory] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  const getOrderHistoryById = async () => {
    try {
    if (!params.id || !userLogin.accessToken) {
      console.error("Invalid params or accessToken");
      // Xử lý trường hợp params.id hoặc accessToken không tồn tại
      return;
    }
      const response = await axios.post(
        `https://shop.cyberlearn.vn/api/Users/getProfile/${params.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userLogin.accessToken}`,
          },
        }
      );
      dispatch(fetchOrderHistorySuccess(response.data.content.ordersHistory));
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    if (params && params.id) {
      getOrderHistoryById();
    }
  }, [params.id, userLogin.accessToken]);

  return (
    <div>
      {orderHistory.map((order) => (
        <div key={order.id}>
          <p>{`+ Orders have been placed on ${new Date(
            order.date
          ).toLocaleDateString()}`}</p>
          <table>
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
                  <td>${item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
