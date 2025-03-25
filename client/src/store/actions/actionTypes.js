const actionTypes = {
  LOGIN: "LOGIN",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",

  GET_POSTS: "GET_POSTS",
  GET_POSTS_LIMIT: "GET_POSTS_LIMIT",
  GET_POSTS_LIMIT_ADMIN: "GET_POSTS_LIMIT_ADMIN",
  GET_NEW_POST: "GET_NEW_POST",
  GET_OUTSTANDING_POST: "GET_OUTSTANDING_POST",
  EDIT_DATA: "EDIT_DATA",
  RESET_DATAEDIT: "RESET_DATAEDIT",

  GET_CATEGORIES: "GET_CATEGORIES",
  GET_PRICES: "GET_PRICES",
  GET_AREAS: "GET_AREAS",
  GET_PROVINCES: "GET_PROVINCES",

  SEARCH_POSTS: "SEARCH_POSTS",

  // USER
  GET_CURRENT: "GET_CURRENT",
  SET_ONLINE_USER: "SET_ONLINE_USER", // Thêm loại mới
  CLEAR_ONLINE_USER: "CLEAR_ONLINE_USER", // Nếu cần xóa danh sách

  SET_SOCKET_CONNECTION: "SET_SOCKET_CONNECTION",
};

export default actionTypes;
