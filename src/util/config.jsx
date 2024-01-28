import axios from "axios";
import { history } from "../index";

export const USER_LOGIN = "userLogin";
export const TOKEN = "accessToken";

//Sử dụng axios interceptor (Cấu hình chung cho tất cả request và response của các api)

export const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api", //Domain
  timeout: 30000, //thời gian tối đa của 1 request có thể đợi
});

//cấu hình cho tất cả request(dữ liệu gửi đi)
http.interceptors.request.use(
  (config) => {
    //Xử lý config: object request gửi đi
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      acb: "abc",
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);


//cấu hình cho tất cả response(dữ liệu nhận về từ backend)
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // console.log({err})
    //Xử lý khi lỗi
    if (err.response?.status === 404) {
    } else if (err.response?.status === 400) {
    } else if (err.response?.status === 401) {
      alert("Đăng nhập để vào trang này!");
      // window.location.href = '/login';
      history.push("/login");
      // return Promise.reject(err);
    } else if (err.response?.status === 403) {
    }

    return Promise.reject(err);
  }
);
