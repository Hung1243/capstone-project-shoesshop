import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN, USER_LOGIN, http } from "../../util/config";
import { history } from "../../index";
import { fetchOrderHistorySuccess } from "./OrderHistoryReducer";

//Xử lý load giá trị ban đầu cho state từ storage(localstorage)
let userLoginDefault = {
  email: "",
  accessToken: "",
};
if (localStorage.getItem(USER_LOGIN)) {
  userLoginDefault = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userProfile: {},
  userLogin: userLoginDefault,
};
export const logoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_LOGIN);
    const action = logoutSuccess();
    dispatch(action);
    history.push("/login");
  };
};

const UserReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
    logoutSuccess: (state) => {
      state.userProfile = {};
      state.userLogin = { email: "", accessToken: "" };
    },
  },
});

export const { loginAction, getProfileAction, logoutSuccess } =
  UserReducer.actions;

export default UserReducer.reducer;

//-------------------action thunk-------------------
export const loginApiAction = (userLogin) => {
  return async (dispatch) => {
    try {
      //call api
      const res = await http.post("/Users/signin", userLogin);
      //Sau khi lấy được token thì lưu vào local storage
      localStorage.setItem(TOKEN, res.data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.content));
      //Gửi dữ liệu sau khi thành công vào reducer
      const action = loginAction(res.data.content);
      dispatch(action);
    } catch (err) {
      history.push("/login");
      // console.log({err})
      // console.log(err.response?.data)
      // console.log(err.request)
      // console.log(err.response?.statusCode)
      // if(err.response?.data?.statusCode == 404) {
      alert("Tài khoản mật khẩu không đúng!");
      //     window.location.href = '/';
      // }
      // Promise.reject(err);
    }
  };
};
export const getProfileApiAction = () => {
  return async (dispatch) => {
    try {
      const res = await http.post("/Users/getProfile");

      // Thêm dispatch cho fetchOrderHistorySuccess để lưu lịch sử đơn hàng vào Redux store
      dispatch(fetchOrderHistorySuccess(res.data.content.ordersHistory));

      // Thay đổi để lưu thông tin người dùng vào Redux store
      const action = getProfileAction(res.data.content);
      dispatch(action);
    } catch (err) {}
  };
};
