import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { number } from "yup";

const Detail = () => {
  const [productDetail, setProductDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  console.log("productDetail", productDetail);
  //lấy giá trị từ thanh url thông qua param trên thẻ route
  const params = useParams();

  const getProductById = async () => {
    const res = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${params.id}`,
      method: "GET",
    });
    setProductDetail(res.data.content);
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
    // Implement your logic to add the product to the cart with the selected quantity
    // This might involve dispatching an action to your Redux store
    console.log(
      `Added ${quantity} item(s) of ${productDetail.name} to the cart`
    );
  };

  useEffect(() => {
    //gọi api
    getProductById();
  }, [params.id]);
  return (
    <div className="container">
      <h3>Detail</h3>
      {/* <p>param:{params.id}</p> */}
      <div className="row">
        <div className="col-5">
          <img src={productDetail.image} alt="...." height={350} />
        </div>
        <div className="col-7">
          <h3>{productDetail.name}</h3>
          <p>{productDetail.description}</p>
          <div className="mt-2">
            {productDetail.size?.map((number) => {
              return (
                <button className="btn btn-outline-dark mx-2">{number}</button>
              );
            })}
          </div>
          <div className="quantity-selector mt-2 d-flex">
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
