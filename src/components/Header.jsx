import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { userLogin, cart } = useSelector((state) => state.userReducer);
  const cartItemCount = cart ? cart.length : 0;

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
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
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            {userLogin.email ? (
              <NavLink className="nav-link" to="/profile">
                Hi, {userLogin.email}
              </NavLink>
            ) : (
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/search">
              Search
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              <i className="fa fa-shopping-cart"></i>{" "}
              {cartItemCount > 0 && (
                <span className="badge">{cartItemCount}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
