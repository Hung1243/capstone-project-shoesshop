import React from "react";

const Footer = () => {
  return (
    <div class="container footer__wrapper text-light">
      <div className="row">
        <div class="row footer__top col-8">
          <div>
            <img
              src="https://i.ibb.co/r76PHYs/Liceria.png"
              alt=""
              srcset=""
              width={150}
            />
          </div>
          <div class="col-6 footer__item">
            <h3>Contact Us</h3>
            <p>
              <i class="fa fa-map-marker-alt"></i> Estate Business, #32841
              block, #221DRS Real estate building, UK.
            </p>

            <p>
              <i class="fa fa-phone"></i> +123345678
            </p>

            <p>
              <i class="fa fa-envelope-open"></i> corporate-mail@support.com
            </p>
          </div>
          <div class="col-6 footer__item">
            <h3>Featured Links</h3>
            <ul>
              <li>Graduation</li>
              <li>Admissions</li>
              <li>Bookstores</li>
              <li>International</li>
              <li>Courses</li>
            </ul>
          </div>
        </div>
        <div className="col-4">
          <img
            src="https://i.ibb.co/r76PHYs/Liceria.png"
            alt=""
            srcset=""
            width={50}
          />
        </div>
      </div>
      <div class="footer__bottom">
        <p>©️ 2020 Mastery. All right reserved | Designed by W3layouts</p>
      </div>
    </div>
  );
};

export default Footer;
