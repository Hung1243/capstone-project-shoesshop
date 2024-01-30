import React from "react";
import { NavLink } from "react-router-dom";
import AccordionForBottomTab from "./AccordionForBottomTab";

const BottomTab = () => {
  return (
    <div className="mt-5" style={{ background: "#040404" }}>
      <img
        src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2024%2F01%2FFirst-Look-at-the-Air-Jordan-5-SE-Sail-2.jpg?cbr=1&q=90"
        alt="snkrs"
        style={{ width: "100%", height: "200px" }}
      />
      <div
        className="text-start py-5 container"
        style={{ fontFamily: "Karla" }}
      >
        <p className="mb-2 text-white"> NEWSLETTER</p>
        <p className="mb-2 text-white">Sign up for a one-time 10% discount</p>
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
            borderTop: "none",
            borderLeft: "none",
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
        <img
          src="./Liceria (2).png"
          alt="..."
          width={200}
          style={{ mixBlendMode: "hard-light", marginTop: "30px" }}
        />
      </div>

      <AccordionForBottomTab />
      <div class="mt-4">
        <p className="mb-0 text-white text-center">
          ©️ 2020 SNKRS, Inc. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default BottomTab;
