import actionTypes from "./actionTypes";
import { apiRegister, apiLogin } from "../../services/auth";

export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};
export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.err === 0) {
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data:
          response.data.msg ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: "Lỗi kết nối. Vui lòng thử lại.",
    });
  }
};

export const logout = () => {
  localStorage.removeItem("token"); // Xóa token khỏi localStorage
  return {
    type: actionTypes.LOGOUT,
  };
};

// userOnline
export const setOnlineUser = (users) => ({
  type: actionTypes.SET_ONLINE_USER,
  data: users,
});

export const clearOnlineUser = () => ({
  type: actionTypes.CLEAR_ONLINE_USER,
});

export const setSocketConnection = (socket) => ({
  type: actionTypes.SET_SOCKET_CONNECTION,
  data: socket, // Gửi đối tượng socket vào Redux state
});
