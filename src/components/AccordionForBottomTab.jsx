import React from "react";
import { NavLink } from "react-router-dom";

const AccordionForBottomTab = () => {
  return (
    <div class="accordion container" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            QUICK LINKS
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul
              className=" list-unstyled"
              style={{ textDecoration: "none", lineHeight: "30px" }}
            >
              <li>
                <NavLink to="/">Home</NavLink>
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
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            ABOUT US
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            We champion continual progress for athletes and sport by taking
            action to help athletes reach their potential. Every job at SNKRS,
            Inc. is grounded in a team-first mindset, cultivating a culture of
            innovation and a shared purpose to leave an enduring impact.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionForBottomTab;
