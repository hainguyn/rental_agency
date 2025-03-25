import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { path } from "../ultils/constant";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import icons from "../ultils/icons";

const { GrStar } = icons;
const TinyItem = ({ title, price, image, createdAt, id, star }) => {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<GrStar className="star-item" color="#4ade80" size={25} />);
    return stars;
  };

  return (
    <div className="w-full flex items-center gap-4 border-b border-gray-300 py-2">
      <Link
        to={`${path.DETAIL_POST}${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
      >
        <img
          src={image[0]}
          alt="anh"
          className="w-[120px] h-[90px] flex-none rounded-md object-cover"
        />
      </Link>
      <div className="flex flex-auto flex-col justify-between gap-4 w-full">
        <h4 className="text-green-400 text-lg">
          {handleStar(+star).length > 0 &&
            handleStar(+star).map((star, number) => {
              return <span key={number}>{star}</span>;
            })}
          {`${title?.slice(0, 60)}...`}
        </h4>
        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-md ">{price}</span>
          <span className="text-gray-300 text-md">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(TinyItem);
