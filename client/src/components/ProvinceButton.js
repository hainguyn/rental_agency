import React, { memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { path } from "../ultils/constant";

const ProvinceButton = ({ name, image, provinceCode }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate({
      pathname: path.SEARCH,
      search: createSearchParams({ provinceCode }).toString(),
    });
  };

  return (
    <div
      onClick={handleOnClick}
      className=" bg-stone-100 border-b shadow-md rounded-bl-lg rounded-br-lg text-stone-600 cursor-pointer hover:text-green-400 transform transition-transform duration-300 hover:-translate-y-4"
    >
      <img
        src={image}
        className="w-[380px] h-[220px] object-cover rounded-tl-lg rounded-tr-lg "
        alt={name}
      />
      <div className="p-2  text-lg flex items-center justify-center">
        {name}
      </div>
    </div>
  );
};

export default memo(ProvinceButton);
