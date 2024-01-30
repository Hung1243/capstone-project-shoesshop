import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Pagination } from "antd";
import TickerAnimation from "../components/TickerAnimation";
import SnkrsTicker from "../components/SnkrsTicker";

const itemsPerPage = 6;

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

  const [currentPage, setCurrentPage] = useState(1);

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedProducts = arrProduct.slice(startIndex, endIndex);

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

      <TickerAnimation />
      {/* <SnkrsTicker /> */}

      <div className="row product-card">
        <p className="featured-title text-center">FEATURED COLLECTIONS</p>
        {displayedProducts.map((prod) => {
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

      <Pagination
        defaultCurrent={1}
        total={arrProduct.length}
        pageSize={itemsPerPage}
        onChange={onChangePage}
        style={{ textAlign: "center" }}
      />

      {/* <TickerAnimation /> */}
    </div>
  );
};

export default Home;
