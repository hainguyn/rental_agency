import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { path } from "../../ultils/constant";
import { Chat } from "../../components";

const notActie = "relative text-black font-bold group";
const active = "relative text-black font-bold group group-hover:bg-green-400";
const Navigation = () => {
  // const [categories, setCategories] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);
  return (
    <div className="w-full flex justify-center items-center text-black">
      <div className=" flex gap-4 flex items-center text-lg">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? active : notActie)}
        >
          Trang chủ
          <span className="absolute left-0 bottom-[-4px] h-[2px] w-full bg-green-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
        </NavLink>
        {categories.length > 0 &&
          categories.map((item) => {
            return (
              <NavLink
                key={item.code}
                to={`${formatVietnameseToString(item.value)}`}
                className={({ isActive }) => (isActive ? active : notActie)}
              >
                {item.value}
                <span className="absolute left-0 bottom-[-4px] h-[2px] w-full bg-green-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </NavLink>
            );
          })}
        {isLoggedIn && (
          <>
            <NavLink
              to={path.CHAT}
              className={({ isActive }) => (isActive ? active : notActie)}
            >
              Nhắn tin
              <span className=" pr-4 absolute left-0 bottom-[-4px] h-[2px] w-full bg-green-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </NavLink>
            {/* <NavLink
              to={path.CHAT_ALL}
              className={({ isActive }) => (isActive ? active : notActie)}
            >
              Diễn đàn
              <span className="absolute left-0 bottom-[-4px] h-[2px] w-full bg-green-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </NavLink> */}
          </>
        )}
        <NavLink
          to={path.CONTACT}
          className={({ isActive }) => (isActive ? active : notActie)}
        >
          Liên hệ
          <span className="absolute left-0 bottom-[-4px] h-[2px] w-full bg-green-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
