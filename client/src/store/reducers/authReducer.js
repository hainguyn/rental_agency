import actionTypes from "../actions/actionTypes";

const initState = {
  isLoggedIn: false,
  token: null,
  msg: "",
  update: false,
  onlineUser: [],
  socketConnection: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        msg: "",
      };
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        msg: action.data || "Đã xảy ra lỗi. Vui lòng thử lại!",
        token: null,
        update: !state.update,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        msg: "",
        onlineUser: [],
        socketConnection: null,
      };
    // Xử lý danh sách người dùng online
    case actionTypes.SET_ONLINE_USER:
      return {
        ...state,
        onlineUser: action.data,
      };
    case actionTypes.CLEAR_ONLINE_USER:
      return {
        ...state,
        onlineUser: [],
      };
    case actionTypes.SET_SOCKET_CONNECTION: // Thêm action này để lưu socket connection
      return {
        ...state,
        socketConnection: action.data, // Lưu socket connection vào state
      };
    default:
      return state;
  }
};

export default authReducer;
