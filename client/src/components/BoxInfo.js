import React, { memo } from "react";
import { useSelector } from "react-redux"; // Kết nối Redux
import anonAvatar from "../assets/anonAvt.png";
import icons from "../ultils/icons";
import { Button } from "./";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../ultils/constant";
import { blobToBase64 } from "../ultils/Common/tobase64";

const { BsDot, FiPhoneCall, SiZalo } = icons;

const BoxInfo = ({ userData }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const onlineUser = useSelector((state) => state.auth.onlineUser);
  // console.log(onlineUser);
  const isOnline = onlineUser?.includes(userData?.id);
  const navigate = useNavigate();

  const handleChat = () => {
    navigate({
      pathname: `/${path.CHAT}`,
      search: createSearchParams({ userId: userData?.id }).toString(),
    });
  };

  return (
    <div className=" py-4 w-full bg-stone-100 rounded-md flex flex-col items-center justify-center p-4 gap-4 shadow-lg">
      <img
        src={blobToBase64(userData?.avatar) || anonAvatar}
        alt="avt"
        className="w-24 h-24 object-cover rounded-full"
      ></img>
      <h3 className="font-semibold text-2xl">{userData?.name}</h3>
      <span className="flex items-center">
        {isOnline ? (
          <BsDot color="green" size={28} />
        ) : (
          <BsDot color="gray" size={28} />
        )}
        <span>{isOnline ? "Đang hoạt động" : "Không hoạt động "}</span>
      </span>
      <a
        href="/"
        className=" hover:bg-green-600 bg-green-400 text-white font-bold text-xl px-6 py-2 gap-2 flex items-center justify-center rounded-md w-full"
      >
        <FiPhoneCall />
        {userData?.phone}
      </a>
      <a
        href={`https://zalo.me/${userData?.zalo}`}
        target="_blank"
        className="  hover:bg-blue-400 bg-white text-black font-bold text-xl px-6 py-2 gap-2 flex items-center justify-center rounded-md w-full"
      >
        <SiZalo color="blue" size={35} />
      </a>
      {isLoggedIn && (
        <a
          onClick={handleChat}
          className="hover:bg-blue-400 bg-white text-black font-bold text-xl px-6 py-2 gap-2 flex items-center justify-center rounded-md w-full cursor-pointer"
        >
          Nhắn tin
        </a>
      )}
    </div>
  );
};

export default memo(BoxInfo);
