import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { number } from "yup";

import {
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../redux/Reducers/cartReducer";

const Detail = () => {
  const [productDetail, setProductDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const isLoggedIn = useSelector((state) => state.userReducer.userLogin.email);

  const getProductById = async () => {
    try {
      const response = await axios.get(
        `https://shop.cyberlearn.vn/api/Product/getbyid?id=${params.id}`
      );
      setProductDetail(response.data.content);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, hiển thị cảnh báo
      alert("Please log in to add items to your cart.");
      // Chuyển hướng đến trang đăng nhập
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }

    const productToAdd = {
      id: productDetail.id,
      name: productDetail.name,
      image: productDetail.image,
      price: productDetail.price,
      size: selectedSize,
      quantity: quantity,
      total: productDetail.price * quantity,
    };

    // Thêm sản phẩm vào giỏ hàng và cập nhật số lượng hiển thị
    dispatch(addToCart(productToAdd));
    setQuantity(1); // Reset số lượng về 1
  };

  useEffect(() => {
    // Gọi api
    getProductById();
  }, [params.id]);
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-5">
          <img src={productDetail.image} alt="...." height={350} />
        </div>
        <div className="col-7">
          <h3>{productDetail.name}</h3>
          <p>{productDetail.description}</p>
          <div className="mt-2">
            {productDetail.size?.map((size) => (
              <button
                key={size}
                className={`btn btn-outline-dark mx-2 ${
                  selectedSize === size ? "active" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="quantity-selector mt-3 d-flex">
            <button
              className="btn btn-outline-dark"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={handleInputChange}
              className="form-control text-center"
              style={{ width: "50px", marginLeft: "5px", marginRight: "5px" }}
            />
            <button
              className="btn btn-outline-dark"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <p className="mt-3">{productDetail.price}$</p>
          <button
            className="btn btn-outline-dark ml-2"
            onClick={handleAddToCart}
          >
            Add to Cart <i className="fa fa-cart-plus"></i>
          </button>
        </div>
      </div>
      <h3 className="mt-2">Related Products</h3>
      <div className="row">
        {productDetail.relatedProducts?.map((prod) => {
          return (
            <div className="col-md-4">
              <div className="card">
                <img src={prod.image} alt="..." />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.price}$</p>
                  <NavLink
                    className={"btn btn-outline-dark"}
                    to={`/detail/${prod.id}`}
                  >
                    View Detail
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
