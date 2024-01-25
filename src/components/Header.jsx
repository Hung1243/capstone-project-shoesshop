import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { history } from "../index";

const Header = () => {
  // const [searchParam, setSearchParam] = useSearchParams();
  const { userLogin } = useSelector((state) => state.userReducer);
  console.log(userLogin);

  const frm = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: ({ keyword }) => {
      history.push(`/search?keyword=${keyword}`);
      // //đưa keyword lên url
      // setSearchParam({
      //   keyword,
      // });
    },
  });
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark"
      style={{
        background: "#202020",
        boxShadow: "#202020 -1px 5px 20px 20px",
        color: "white",
      }}
    >
      <NavLink
        className="navbar-brand"
        to="/"
        style={{ fontWeight: "700", fontStyle: "italic" }}
      >
        SNKRS
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/" aria-current="page">
              Home <span className="visually-hidden">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            {(() => {
              if (userLogin.email != "") {
                return (
                  <NavLink className="nav-link" to="/profile">
                    Hello {userLogin.email}
                  </NavLink>
                );
              }
              return (
                <NavLink className="nav-link" to="login">
                  Login
                </NavLink>
              );
            })()}
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="search">
              Search
            </NavLink>
          </li>
        </ul>
        <form onSubmit={frm.handleSubmit} className="d-flex my-2 my-lg-0">
          <input
            name="keyword"
            onChange={frm.handleChange}
            className="form-control me-sm-2"
            type="text"
            placeholder="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
