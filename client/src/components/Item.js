import React, { memo } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import { path } from "../ultils/constant";
import { blobToBase64 } from "../ultils/Common/tobase64";
import anonAvatar from "../assets//anonAvt.png";

const { GrStar, BsBookmarkStarFill } = icons;
const Item = ({
  images,
  user,
  title,
  star,
  description,
  attributes,
  address,
  id,
}) => {
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<GrStar className="star-item" color="#4ade80" size={25} />);
    return stars;
  };

  return (
    <div className="w-full flex gap-2 border-t-4 border-green-300 py-4  px-1  ">
      <Link
        to={`${path.DETAIL_POST}${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
        className="w-2/5 flex flex-wrap gap-1 items-center relative"
      >
        {images.length > 4
          ? images
              .filter((_, index) => index < 4) // Lọc các hình ảnh có chỉ số nhỏ hơn 4
              .map((i, index) => (
                <div
                  key={index}
                  className="w-[47%] h-[180px] border-2 border-gray-300 overflow-hidden"
                >
                  <img
                    src={i}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
          : images.map((i, index) => (
              <div
                key={index}
                className="w-[200px] h-[180px] border-2 border-gray-300 overflow-hidden"
              >
                <img
                  src={i}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        <span className="absolute top-0 right-5 bg-gray-200 text-black px-2 rounded-md">
          {`+${images.length} ảnh`}
        </span>
      </Link>
      <div className="w-3/5  mt-7">
        <div className="flex justify-between  w-full">
          <Link
            to={`${path.DETAIL_POST}${formatVietnameseToString(
              title?.replaceAll("/", "")
            )}/${id}`}
            className="text-xl ml-2 mb-2 "
          >
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
            {title}
          </Link>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill color="#10b981" size={25} />
          </div>
        </div>
        <div className="flex items-center justify-between mb-10 text-lg gap-3">
          <span className="font-bold flex-3 whites whitespace-nowrap overflow-hidden text-ellipsis ">
            {attributes?.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="flex-3   whitespace-nowrap overflow-hidden text-ellipsis">{`${
            address.split(",")[address.split(",").length - 2]
          }${address.split(",")[address.split(",").length - 1]}`}</span>
        </div>
        <p className="text-gray-500  text-lg w-full h-[90px]  overflow-hidden text-ellipsis">
          {description}
        </p>
        <div className="flex items-center justify-between my-5 text-lg">
          <div className="flex items-center gap-2">
            <img
              src={blobToBase64(user?.avatar) || anonAvatar}
              alt="logo"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              className="bg-green-500 hover:bg-green-700  text-white font-bold py-1 px-2 rounded hover:scale-105 transition-all duration-300 ease-in-out px-4 py-2"
              href="/"
              target="_blank"
            >
              {`Gọi ${user?.phone}`}
            </a>
            <a
              className="border border-green-500 hover:bg-green-700 hover:text-white font-bold py-1 px-2 rounded hover:scale-105 transition-all duration-300 ease-in-out px-4 py-2"
              href={`https://zalo.me/${user?.zalo}`}
              target="_blank"
            >
              Nhắn zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
