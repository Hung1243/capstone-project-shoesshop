import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Header = () => {
  const { userLogin, cart } = useSelector((state) => state.userReducer);
  const cartItemCount = useSelector((state) => state.cart.items.length);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-3 text-white" to="/">
          Shoes Shop
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              {userLogin.email ? (
                <NavLink className="nav-link" to="/profile">
                  Hi, {userLogin.email}
                </NavLink>
              ) : (
                <div className="d-flex">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </div>
              )}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                <Badge count={cartItemCount} showZero>
                  <ShoppingCartOutlined
                    style={{ fontSize: "40px", color: "white" }}
                  />
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
