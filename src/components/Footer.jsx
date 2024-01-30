import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div class="footer__wrapper text-light px-5">
      <div className="row">
        <div class="footer__top col-8 mt-3">
          <div className=" text-start mb-5">
            <img
              src="./Liceria (2).png"
              alt="..."
              width={200}
              style={{ mixBlendMode: "hard-light" }}
            />
          </div>
          <div className="row">
            <div class="col-6 footer__item text-start">
              <h3 style={{ fontSize: "16px", fontWeight: "smaller" }}>
                QUICK LINKS
              </h3>
              <ul
                className=" list-unstyled"
                style={{ textDecoration: "none", lineHeight: "30px" }}
              >
                <li>
                  <NavLink to="#">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/search">Search</NavLink>
                </li>
                <li>
                  <NavLink to="/cart">Cart</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Account</NavLink>
                </li>
              </ul>
            </div>
            <div
              class="col-6 footer__item text-start"
              style={{ fontSize: "16px", width: "390px" }}
            >
              <h3>ABOUT US</h3>
              <p>
                We champion continual progress for athletes and sport by taking
                action to help athletes reach their potential. Every job at
                SNKRS, Inc. is grounded in a team-first mindset, cultivating a
                culture of innovation and a shared purpose to leave an enduring
                impact.
              </p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <img
            src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2024%2F01%2FFirst-Look-at-the-Air-Jordan-5-SE-Sail-2.jpg?cbr=1&q=90"
            alt=""
            srcset=""
            // width={500}
            height={300}
          />
          <div className="text-start py-5">
            <p className="mb-2"> NEWSLETTER</p>
            <p className="mb-2">Sign up for a one-time 10% discount</p>
            <input
              type="email"
              name=""
              id=""
              placeholder="your-email@example.com"
              style={{
                background: "transparent",
                width: "87%",
                borderRight: "none",
                color: "grey",
                outline: "none",
              }}
            />
            <span>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "grey",
                }}
              >
                {" "}
                <i class="fa fa-arrow-right" aria-hidden="true"></i>{" "}
              </button>
            </span>
          </div>
        </div>
      </div>
      <div class="footer__bottom text-start">
        <p>©️ 2020 SNKRS, Inc. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
