import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Province,
  ItemSidebar,
  RelatedPost,
  BannerSlider,
} from "../../components";
import { List, Pagination, Search } from "./index";

const Homepage = () => {
  const { categories, prices, areas } = useSelector((state) => state.app);

  // const [searchParams] = useSearchParams();
  // const listRef = useRef();
  // useEffect(() => {
  //   if (searchParams.get("page")) {
  //     if (listRef.current) {
  //       listRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     } else {
  //       console.error("listRef.current is undefined");
  //     }
  //   }
  // }, [searchParams]);

  return (
    <div>
      <div className="flex justify-center pt-16 ">
        {/* <BannerSlider /> */}
        {/* <Search /> */}
        <Province />
      </div>
      <div className=" w-full flex gap-4 ">
        <div className="flex flex-col w-[70%]">
          <div>
            <List />
          </div>
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col justify-start items-center gap-4  ">
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
          <ItemSidebar
            isDouble={true}
            type={"priceCode"}
            content={prices}
            title="Xem theo giá"
          />
          <ItemSidebar
            isDouble={true}
            type={"areaCode"}
            content={areas}
            title="Xem theo diện tích"
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
