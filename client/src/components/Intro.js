import React, { memo } from "react";
import { text } from "../ultils/dataIntro";
import icons from "../ultils/icons";
import { Button } from "../components/";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";

const { GrStar } = icons;
const star = [1, 2, 3, 4, 5];
const Intro = () => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className=" w-full p-4  border-b rounded-lg bg-stone-100 gap-4 shadow-md flex flex-col items-center justify-center  ">
      <h3 className="font-bold text-lg">{text.title}</h3>
      <p className="text-center my-4">
        {`${text.description} ${text.description2}`}
        <span className="text-link">
          {categories?.length > 0 &&
            categories.map((item) => {
              return (
                <Link
                  to={`${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="text-green-400 font-medium hover:text-green-600"
                >
                  {`${item.value.toLowerCase()}, `}
                </Link>
              );
            })}
        </span>
      </p>
      <div className="flex items-center justify-around w-full">
        {text.statistical.map((item, index) => {
          return (
            <div
              key={index}
              className="flex-col flex  items-center justify-center "
            >
              <h4 className="font-bold text-lg ">{item.value}</h4>
              <p className="text-gray-500">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-bold text-lg py-3">{text.price}</h3>
      <div className="flex  items-center justify-center gap-3">
        {star.map((item) => {
          return (
            <span key={item}>
              <GrStar color="yellow" size={24} />
            </span>
          );
        })}
      </div>
      <p className="text-center text-gray-500 italic">{text.command}</p>
      <span className=" text-gray-500">{text.author}</span>
      <h3 className="font-bold text-lg py-3">{text.question}</h3>
      <p className="text-center text-gray-500 italic">{text.answer}</p>
      <Button
        text="Đăng tin ngay"
        textColor="text-white"
        bgColor="bg-green-400	"
        bdColor={"bg-green-400"}
        rounded={"rounded-md"}
      />
    </div>
  );
};

export default memo(Intro);
