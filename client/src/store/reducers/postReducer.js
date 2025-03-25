import actionTypes from "../actions/actionTypes";
const initState = {
  posts: [],
  msg: "",
  count: 0,
  newPosts: [],
  postOfCurrent: [],
  dataEdit: null,
  outStandingPost: [],
  searchKeyword: "",
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.GET_NEW_POST:
      return {
        ...state,
        msg: action.msg || "",
        newPosts: action.newPosts || [],
      };
    case actionTypes.GET_OUTSTANDING_POST:
      return {
        ...state,
        msg: action.msg || "",
        outStandingPost: action.outStandingPost || [],
      };
    case actionTypes.GET_POSTS_LIMIT_ADMIN:
      return {
        ...state,
        msg: action.msg || "",
        postOfCurrent: action.posts || [],
      };
    case actionTypes.EDIT_DATA:
      return {
        ...state,
        dataEdit: action.dataEdit || null,
      };
    case actionTypes.RESET_DATAEDIT:
      return {
        ...state,
        dataEdit: null,
      };
    // case actionTypes.SET_SEARCH_KEYWORD:
    //   return {
    //     ...state,
    //     searchKeyword: action.keyword || "", // Cập nhật trường searchKeyword
    //   };
    default:
      return state;
  }
};

export default postReducer;
