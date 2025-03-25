import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Search } from "./index";
import { Intro, Contact, BannerSlider } from "../../components";
import { path } from "../../ultils/constant";
import io from "socket.io-client";
import * as actions from "../../store/actions/auth";
import backgroundImg from "../../assets/bg1.jpg";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  // console.log(user);

  useEffect(() => {
    const token =
      window.localStorage.getItem("persist:auth") &&
      JSON.parse(window.localStorage.getItem("persist:auth"))?.token?.slice(
        1,
        -1
      );
    const socket = io(process.env.REACT_APP_SERVER_URL, {
      auth: {
        token: token,
      },
    });

    socket.on("onlineUser", (data) => {
      // console.log("Online users data:", data);
      dispatch(actions.setOnlineUser(data));
    });

    dispatch(actions.setSocketConnection(socket));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    //fixed top-0 left-0 right-0 bottom-0
    <div
      style={{ backgroundImage: `url(${backgroundImg})` }}
      className=" w-full flex flex-col items-center justify-center h-full shadow-lg "
    >
      <Header />
      {(location.pathname === "/" || location.pathname === path.HOME) && (
        <BannerSlider />
      )}
      {isLoggedIn &&
        location.pathname !== `/${path.CONTACT}` &&
        location.pathname !== `/${path.CHAT_ALL}` &&
        location.pathname !== `/${path.CHAT}` &&
        !location.pathname?.includes(path.DETAIL_POST) && <Search />}
      <div className="w-full ">
        <Outlet />
      </div>
      <div className="  w-[75%]">
        {location.pathname !== `/${path.CHAT_ALL}` &&
          location.pathname !== `/${path.CONTACT}` &&
          location.pathname !== `/${path.CHAT}` && (
            <>
              {" "}
              <Intro />
              <Contact />
            </>
          )}
      </div>
    </div>
  );
};
export default Home;
