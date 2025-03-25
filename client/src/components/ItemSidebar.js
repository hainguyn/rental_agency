import React, { memo } from "react";
import icons from "../ultils/icons";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate, useLocation } from "react-router-dom";

const { GrFormNext } = icons;
const ItemSidebar = ({ content, title, isDouble, type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const formatContent = () => {
    const oddEl = content?.filter((item, index) => index % 2 !== 0);
    const evenEl = content?.filter((item, index) => index % 2 === 0);
    const formatContent = oddEl?.map((item, index) => {
      return {
        left: evenEl?.find((item2, index2) => index2 === index),
        right: item,
      };
    });

    return formatContent;
  };

  const handleFilterPost = (code) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };

  return (
    <div className="p-4 bg-stone-100 rounded-lg shadow w-full">
      <h3 className="text-xl font-semibold mb-5">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <Link
                  to={`/${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className=" text-lg flex items-center gap-2 cursor-pointer text-gray-500 hover:text-green-400 border-b border-dashed border-gray-300 py-1  "
                >
                  <GrFormNext color="#6b7280" />
                  <p className="">{item.value}</p>
                </Link>
              );
            })}
        </div>
      )}

      {isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            formatContent(content).map((item, index) => {
              return (
                <div key={index} className=" ">
                  <div className="flex items-center justify-around text-lg">
                    <div
                      onClick={() => handleFilterPost(item.left.code)}
                      className="flex flex-1 items-center gap-2 cursor-pointer text-gray-500 hover:text-green-400 border-b border-dashed border-gray-300 py-1 "
                    >
                      <GrFormNext color="#6b7280" />
                      <p className="">{item.left.value}</p>
                    </div>
                    <div
                      className="flex flex-1 items-center gap-2 cursor-pointer text-gray-500 hover:text-green-400 border-b border-dashed border-gray-300 py-1 "
                      onClick={() => handleFilterPost(item.right.code)}
                    >
                      <GrFormNext color="#6b7280" />
                      <p className="">{item.right.value}</p>
                    </div>{" "}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
