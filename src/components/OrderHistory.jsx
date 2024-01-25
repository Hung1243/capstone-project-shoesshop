import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderHistory = () => {
  const [order, setOrderDetail] = useState({});
  console.log("order", order);
  //Lấy giá trị từ thanh url thông qua param trên thẻ route
  const params = useParams();
  const getOrderById = async () => {
    const res = await axios({
      url: `https://shop.cyberlearn.vn/api/Users/getProfile`,
      method: "GET",
    });
    setOrderDetail(res.data.content);
  };
  useEffect(() => {
    //Gọi api
    getOrderById();
  }, [params.id]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.date}</td>
            <td>{order.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
