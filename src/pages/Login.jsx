import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { loginApiAction } from "../redux/Reducers/UserReducer";
import { useDispatch } from "react-redux";
import { updateOnOkayAction } from "../redux/Reducers/DrawerReducer";
import { Button, Checkbox, Form, Input } from "antd";
import LoginFacebook from "../components/LoginFacebook";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [containerClass, setContainerClass] = useState("");

  const frmLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (userLogin) => {
      const action = loginApiAction(userLogin);
      dispatch(action);
      navigate("/");
    },
  });

  useEffect(() => {
    const action = updateOnOkayAction(frmLogin.handleSubmit);
    dispatch(action);
  }, []);

  return (
    <div className="pt-5">
      <Form
        onFinish={frmLogin.handleSubmit}
        className="container"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 16,
        // }}
        style={{
          maxWidth: 700,
          padding: "10px 50px 50px 50px",
        }}
      >
        <h3
          style={{
            fontWeight: "bold",
            fontFamily: "Karla",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          LOGIN
        </h3>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            onChange={frmLogin.handleChange}
            placeholder="Email"
            style={{ borderRadius: "0" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            onChange={frmLogin.handleChange}
            placeholder="Password"
            style={{ borderRadius: "0" }}
          />
        </Form.Item>
        <Form.Item
        // wrapperCol={{
        //   offset: 8,
        //   span: 16,
        // }}
        >
          <button
            type="primary"
            htmlType="submit"
            className="btn btn-dark"
            style={{
              borderRadius: "0",
              fontSize: "13px",
              width: "100%",
              fontWeight: "bolder",
              padding: "6px 0",
              fontFamily: "Karla",
            }}
          >
            SIGN IN
          </button>
        </Form.Item>
        <div className="text-center lg-facebook">
          <LoginFacebook />
        </div>
        <div className="text-center mt-4 account-btn">
          <NavLink to="/register">CREATE ACCOUNT ?</NavLink>
        </div>
      </Form>
    </div>
  );
};

export default Login;
