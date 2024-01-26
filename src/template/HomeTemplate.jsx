import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import DeviceTemplate from "./DeviceTemplate";
import BottomTab from "../components/BottomTab";
import Footer from "../components/Footer";

const HomeTemplate = () => {
  return (
    <div>
      <Header />
      <div className="content" style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>

      <DeviceTemplate
        Component={
          <footer
            className="p-5 text-center"
            style={{
              background: "#202020",
            }}
          >
            <Footer />
          </footer>
        }
        MobileComponent={<BottomTab />}
      />
    </div>
  );
};

export default HomeTemplate;
