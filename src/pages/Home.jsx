import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Button, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Home = () => {
  const [arrProduct, setArrProduct] = useState([]);
  const carouselRef = React.createRef();
  console.log("arrProduct", arrProduct);
  const getAllProductApi = async () => {
    const res = await axios({
      url: "https://shop.cyberlearn.vn/api/Product",
      method: "GET",
    });
    setArrProduct(res.data.content);
  };
  useEffect(() => {
    //gọi api trong useEffect didmount
    getAllProductApi();
  }, []);

  return (
    <div className="container">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {arrProduct.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="row">
                <div className="image-container col-7">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                  />
                </div>
                <div className="info-container col-5 d-flex align-items-center justify-content-center">
                  <div className="">
                    <h1 className="mb-0">{product.name}</h1>
                    <p className="mb-0 text-dark">{product.description}</p>
                    <NavLink
                      className="btn btn-primary"
                      to={`/detail/${product.id}`}
                    >
                      Buy now
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="row product-card">
        {arrProduct.map((prod) => {
          return (
            <div className="col-4 mt-2 product-container" key={prod.id}>
              <NavLink
                style={{ textDecoration: "none" }}
                to={`/detail/${prod.id}`}
                className="card"
              >
                <div className="image-container">
                  <img src={prod.image} alt="123" style={{ width: "100%" }} />
                  <div className="button-container">
                    <NavLink
                      className="btn btn-outline-dark buy-button"
                      to={`/detail/${prod.id}`}
                    >
                      Buy Now
                    </NavLink>
                  </div>
                </div>
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>${prod.price}.00</p>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
