import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div class="container footer__wrapper text-light">
      <div className="row">
        <div class="row footer__top col-8">
          <div className=" text-start">
            <img
              src="https://i.ibb.co/ZG5VkBZ/Liceria-2.png"
              alt="..."
              width={200}
            />
          </div>
          <div class="col-6 footer__item text-start">
            <h3 style={{ fontSize: "16px", fontWeight: "smaller" }}>
              Quick Links
            </h3>
            <ul className=" list-unstyled" style={{ textDecoration: "none" }}>
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
            style={{ fontSize: "16px" }}
          >
            <h3>OUR PROMISE</h3>
            <p>
              The last shoes you will ever need. Highly adjustable, with soft
              insoles, carefully crafted for your distinguished taste. Purchase
              our shoes and unleash an experience that is as smooth on your
              stride as it is on your feet. Let yourself shine in a new light.
            </p>
          </div>
        </div>
        <div className="col-4">
          <img
            src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2024%2F01%2FFirst-Look-at-the-Air-Jordan-5-SE-Sail-2.jpg?cbr=1&q=90"
            alt=""
            srcset=""
            width={500}
            height={300}
          />
        </div>
      </div>
      <div class="footer__bottom mt-5">
        <p>©️ 2020 SNKRS. All right reserved | Designed by Cybersoft Team</p>
      </div>
    </div>
  );
};

export default Footer;
