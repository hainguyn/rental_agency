import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../Public";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-none h-[60px]">
      <Link
        to={"/"}
        className="flex justify-center items-center font-bold bg-secondary1 text-black w-[256px] flex-none"
      >
        Estate Agency
      </Link>
      <div className=" flex items-center justify-center w-full ">
        <Navigation isAdmin={true} />
      </div>
    </div>
  );
};

export default Header;
