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
    <div className="">
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
    // <form className="container card w-50 mt-5">
    //   {/* Email input */}
    //   <h3>Login</h3>
    //   <div className="form-outline mb-4">
    //     <input type="email" id="form2Example1" className="form-control" />
    //     <label className="form-label" htmlFor="form2Example1">
    //       Email address
    //     </label>
    //   </div>
    //   {/* Password input */}
    //   <div className="form-outline mb-4">
    //     <input type="password" id="form2Example2" className="form-control" />
    //     <label className="form-label" htmlFor="form2Example2">
    //       Password
    //     </label>
    //   </div>
    //   {/* 2 column grid layout for inline styling */}
    //   <div className="row mb-4">
    //     <div className="col d-flex justify-content-center">
    //       {/* Checkbox */}
    //       <div className="form-check">
    //         <input
    //           className="form-check-input"
    //           type="checkbox"
    //           defaultValue
    //           id="form2Example31"
    //           defaultChecked
    //         />
    //         <label className="form-check-label" htmlFor="form2Example31">
    //           {" "}
    //           Remember me{" "}
    //         </label>
    //       </div>
    //     </div>
    //     <div className="col">
    //       {/* Simple link */}
    //       <a href="#!">Forgot password?</a>
    //     </div>
    //   </div>
    //   {/* Submit button */}
    //   <button type="button" className="btn btn-primary btn-block mb-4">
    //     Sign in
    //   </button>
    //   {/* Register buttons */}
    //   <div className="text-center">
    //     <p>
    //       Not a member? <a href="#!">Register</a>
    //     </p>
    //     <p>or sign up with:</p>
    //     <button type="button" className="btn btn-link btn-floating mx-1">
    //       <i className="fab fa-facebook-f" />
    //     </button>
    //     <button type="button" className="btn btn-link btn-floating mx-1">
    //       <i className="fab fa-google" />
    //     </button>
    //     <button type="button" className="btn btn-link btn-floating mx-1">
    //       <i className="fab fa-twitter" />
    //     </button>
    //     <button type="button" className="btn btn-link btn-floating mx-1">
    //       <i className="fab fa-github" />
    //     </button>
    //   </div>
    // </form>
  );
};

export default Login;
