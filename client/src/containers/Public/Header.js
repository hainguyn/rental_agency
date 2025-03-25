import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo_home.png";
import { Button } from "../../components";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/auth";
import Navigation from "./Navigation";
import menuManage from "../../ultils/menuManage";
import icons from "../../ultils/icons";
import anonAvatar from "../../assets//anonAvt.png";
import { blobToBase64 } from "../../ultils/Common/tobase64";

const { AiOutlineLogout, MdOutlineArrowDropDown } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { currentData } = useSelector((state) => state.user);

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("/")]);

  return (
    <div
      ref={headerRef}
      className=" sticky top-0 left-0 right-0 bg-stone-100 w-full h-[120px]  gap-4  mx-auto px-0 py-0 flex items-center justify-between mx-auto p-4 relative z-50"
    >
      <Link to={"/"}>
        <img
          src={logo}
          alt="logo"
          className="w-[240px] h-[130px] object-contain"
        />
      </Link>
      <div className="flex-2 flex justify-center">
        <Navigation />
      </div>
      <div className="flex items-center gap-2 flex-1 justify-end">
        {!isLoggedIn && (
          <div className="flex items-center gap-2 text-base">
            <Button
              text="Đăng nhập"
              textColor="text-green-400"
              bgColor="bg-white	"
              bdColor={"border-green-400"}
              bdWhidth={"border-2"}
              rounded={"rounded-md"}
              hover={"hover:bg-green-400 hover:text-white"}
              onClick={() => navigate(path.LOGIN)}
            />
            <Button
              text="Đăng ký"
              textColor="text-green-400"
              bgColor="bg-white	"
              bdColor={"border-green-400"}
              bdWhidth={"border-2"}
              hover={"hover:bg-green-400 hover:text-white"}
              rounded={"rounded-md"}
              type="submit" // Đặt type cho nút form
              onClick={() => navigate(path.REGISTER)}
            />
            <Button
              text="Đăng tin"
              textColor="text-white"
              bgColor="bg-red-400	"
              bdColor={"bd-green-400"}
              rounded={"rounded-md"}
              px={"px-3"}
            />
          </div>
        )}
        {isLoggedIn && (
          <div className="flex items-center items-start gap-2 relative">
            {currentData && Object.keys(currentData).length > 0 && (
              <img
                src={blobToBase64(currentData?.avatar) || anonAvatar}
                alt="avatar"
                className="w-[100px] object-cover rounded-full h-[100px] border-2 shadow-md border-white"
              />
            )}
            <div className="flex flex-col items-center gap-2">
              {currentData && Object.keys(currentData).length > 0 && (
                <span className="font-semibold text-2xl ">
                  {currentData?.name}
                </span>
              )}
              <div className="flex items-center gap-2 ">
                {" "}
                <Button
                  text="Hồ sơ"
                  textColor="text-green-400"
                  bgColor="bg-white	"
                  bdColor={"border-green-400"}
                  bdWhidth={"border-2"}
                  hover={"hover:bg-green-400 hover:text-white"}
                  rounded={"rounded-md"}
                  Ic={MdOutlineArrowDropDown}
                  type="submit" // Đặt type cho nút form
                  onClick={() => setIsShowMenu((prev) => !prev)}
                />
                {isShowMenu && (
                  <div className="absolute min-w-200 top-full bg-white   shadow-md rounded-md p-4 right-0 flex flex-col">
                    {menuManage.map((item) => {
                      return (
                        <Link
                          className="hover:text-stone-600 flex items-center gap-2 text-green-400 border-b border-gray-200 py-2"
                          key={item.id}
                          to={item?.path}
                        >
                          {item?.icon}
                          {item.text}
                        </Link>
                      );
                    })}
                    <span
                      className="cursor-pointer hover:text-stone-600 text-green-400 py-2 flex items-center gap-2"
                      onClick={() => {
                        setIsShowMenu(false);
                        dispatch(actions.logout());
                        navigate("/"); // Điều hướng về trang chủ
                        window.location.reload(); // Reload lại trang
                      }}
                    >
                      <AiOutlineLogout />
                      Đăng xuất
                    </span>
                  </div>
                )}
                <Button
                  text="Đăng tin"
                  textColor="text-green-400"
                  bgColor="bg-white	"
                  bdColor={"border-green-400"}
                  bdWhidth={"border-2"}
                  hover={"hover:bg-green-400 hover:text-white"}
                  rounded={"rounded-md"}
                  px={"px-3"}
                  onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
                />
              </div>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
    // </header>
  );
};

export default Header;
