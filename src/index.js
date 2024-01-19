import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

import Home from "./pages/Home";
//Cau hinh redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createBrowserHistory } from "history";
import DeviceTemplate from "./template/DeviceTemplate";
import HomeMobile from "./pages/HomeMobile.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import HomeTemplate from "./template/HomeTemplate";

//history giúp chuyển hướng trang
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route
            index
            element={
              <DeviceTemplate
                Component={<Home />}
                MobileComponent={<HomeMobile />}
              />
            }
          ></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="cart" element={<Cart />}></Route>

          <Route path="detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="search" element={<Search />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
