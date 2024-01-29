import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginApiAction } from "../redux/Reducers/UserReducer";
import { useDispatch } from "react-redux";
import { updateOnOkayAction } from "../redux/Reducers/DrawerReducer";
import { Button, Checkbox, Form, Input } from "antd";
import LoginFacebook from "../components/LoginFacebook";

const LoginMobile = () => {
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
      navigate("/");
    },
  });

  useEffect(() => {
    const action = updateOnOkayAction(frmLogin.handleSubmit);
    dispatch(action);
  }, []);

  return (
    <div className="" style={{ marginTop: "90px" }}>
      <Form
        onFinish={frmLogin.handleSubmit}
        className="container"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 700,
          background: "#ececec",
          padding: "10px 50px 50px 50px",
        }}
      >
        <h3 style={{ fontWeight: "bold", fontFamily: "Libre Bodoni, serif" }}>
          Login
        </h3>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input onChange={frmLogin.handleChange} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password onChange={frmLogin.handleChange} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="btn btn-dark mx-2"
            style={{ fontSize: "12px" }}
          >
            SIGN IN
          </Button>
        </Form.Item>

        <LoginFacebook />
      </Form>
    </div>
  );
};

export default LoginMobile;
