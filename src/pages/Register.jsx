import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOnOkayAction } from "../redux/Reducers/DrawerReducer";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Sử dụng useNavigate thay vì useHistory

  const frmRegis = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: true,
      phone: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://shop.cyberlearn.vn/api/Users/signup",
          values
        );

        console.log("Registration successful:", res.data);

        const action = updateOnOkayAction();
        dispatch(action);

        // Hiển thị thông báo và chuyển hướng đến trang đăng nhập
        alert("Bạn đã đăng ký thành công!");
        navigate("/login");
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
  });

  useEffect(() => {}, []);

  return (
    <div style={{ background: "#202020", padding: "70px 0" }}>
      <form
        className="container register-form text-white"
        onSubmit={frmRegis.handleSubmit}
        style={{
          maxWidth: "780px",
          background: "#151515",
          color: "white",
          padding: "36px 61px",
        }}
      >
        <h3 className="text-center register-title">CREATE ACCOUNT</h3>
        <div className="form-group">
          <input
            placeholder="Email"
            className="form-control"
            id="email"
            name="email"
            onChange={frmRegis.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            className="form-control"
            id="password"
            name="password"
            onChange={frmRegis.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Name"
            className="form-control"
            id="name"
            name="name"
            onChange={frmRegis.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Phone"
            className="form-control"
            id="phone"
            name="phone"
            onChange={frmRegis.handleChange}
          />
        </div>

        <div className="form-group">
          <select
            className="form-control bg-transparent text-white-50"
            id="gender"
            name="gender"
            style={{ borderRadius: 0 }}
          >
            <option value="" disabled selected>
              Gender
            </option>
            <option value={true}>Male</option>
            <option value={false}>Female</option>
          </select>
        </div>

        <div className="form-group my-3">
          <button
            type="submit"
            className="btn btn-dark mt-2"
            style={{
              width: "100%",
              borderRadius: "0",
              fontFamily: "Karla",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
