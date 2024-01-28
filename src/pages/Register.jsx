import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOnOkayAction } from "../redux/Reducers/DrawerReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
    <form className="container" onSubmit={frmRegis.handleSubmit}>
      <h3>Register</h3>
      <div className="form-group">
        <p>Email</p>
        <input
          className="form-control"
          id="email"
          name="email"
          onChange={frmRegis.handleChange}
        />
      </div>
      <div className="form-group">
        <p>Password</p>
        <input
          className="form-control"
          id="password"
          name="password"
          onChange={frmRegis.handleChange}
        />
      </div>
      <div className="form-group">
        <p>Name</p>
        <input
          className="form-control"
          id="name"
          name="name"
          onChange={frmRegis.handleChange}
        />
      </div>
      <div className="form-group">
        <p>Phone</p>
        <input
          className="form-control"
          id="phone"
          name="phone"
          onChange={frmRegis.handleChange}
        />
      </div>
      <div>
        <div className="form-check">
          <p>Gender</p>
          <input
            value={true}
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Male
          </label>
        </div>
        <div className="form-check">
          <input
            value={false}
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Female
          </label>
        </div>
      </div>

      {/* <div className="form-group">
        <select className="form-control" id="gender" name="gender">
          <option value={true}>Male</option>
          <option value={false}>Female</option>
        </select>
      </div> */}

      <div className="form-group">
        <button type="submit" className="btn btn-success mt-2">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
