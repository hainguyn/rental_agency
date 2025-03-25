import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Rental,
  Homepage,
  DetailPost,
  SearchDetail,
  Contact,
} from "./containers/Public";
import {
  System,
  CreatePost,
  ManagePost,
  EditAccount,
} from "./containers/System";
import { ScrollToTopButton, ChatButton, Chat } from "./components";
import * as actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { path } from "./ultils/constant";
import { Navigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, []);

  return (
    <div className="bg-primary">
      <Routes>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Login isRegister />} />
        <Route path={path.HOME} element={<Home />}>
          <Route path={"*"} element={<Homepage />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />}></Route>
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />}></Route>
          <Route path={path.NHA_CHO_THUE} element={<Rental />}></Route>
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />}></Route>
          <Route path={path.SEARCH} element={<SearchDetail />}></Route>
          <Route
            path={path.DETAIL_POST__TITLE__POSTID}
            element={<DetailPost />}
          ></Route>
          <Route path={path.CONTACT} element={<Contact />}></Route>
          <Route path={path.CHAT_ALL} element={<Chat />}></Route>
          <Route path={path.CHAT} element={<ChatButton />}></Route>
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
      {/* <div className=" p-4"> */}
      <ScrollToTopButton />
      {/* <ChatButton /> */}
      {/* </div> */}
    </div>
  );
}

export default App;
