import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginApiAction } from "../redux/Reducers/UserReducer";
import { useDispatch } from "react-redux";
import { updateOnOkayAction } from "../redux/Reducers/DrawerReducer";
import { Button, Checkbox, Form, Input } from "antd";
import LoginFacebook from "../components/LoginFacebook";

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
    <div>
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
          maxWidth: 600,
        }}
      >
        <h3>Login</h3>
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
            className="btn btn-dark mt-2"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <LoginFacebook />
    </div>
  );
};

export default Login;
