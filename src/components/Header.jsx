import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Badge, Dropdown, Menu } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { logoutAction } from "../redux/Reducers/UserReducer";

const Header = () => {
  const { userLogin, cart } = useSelector((state) => state.userReducer);
  const cartItemCount = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <NavLink to="/profile">My Profile</NavLink>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  useEffect(() => {
    // Đặt giá trị visible về false khi userLogin thay đổi
    setVisible(false);
  }, [userLogin]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-3 text-white" to="/">
          SNKRS
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
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  visible={visible}
                  onVisibleChange={handleVisibleChange}
                >
                  <NavLink
                    className="nav-link"
                    to={userLogin.email ? "#" : "/login"}
                    onClick={(e) => {
                      if (!userLogin.email) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Hi, {userLogin.email} <DownOutlined />
                  </NavLink>
                </Dropdown>
              ) : (
                <div className="d-flex">
                  <NavLink className="nav-link" to="/login">
                    Account
                  </NavLink>
                  {/* <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink> */}
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
