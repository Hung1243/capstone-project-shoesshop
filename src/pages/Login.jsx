import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginApiAction } from "../redux/Reducers/UserReducer";
import { useDispatch } from "react-redux";
import { updateOnOkayAction } from "../redux/Reducers/DrawerReducer";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const frmLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (userLogin) => {
      const action = loginApiAction(userLogin);
      dispatch(action);
    },
  });

  useEffect(() => {
    const action = updateOnOkayAction(frmLogin.handleSubmit);
    dispatch(action);
  }, []);

  return (
    <form onSubmit={frmLogin.handleSubmit} className="container">
      <h3>Login</h3>
      <div className="form-group">
        <p>email</p>
        <input
          className="form-control"
          id="email"
          name="email"
          onChange={frmLogin.handleChange}
        />
      </div>
      <div className="form-group">
        <p>password</p>
        <input
          className="form-control"
          id="password"
          name="password"
          onChange={frmLogin.handleChange}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-success mt-2">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
