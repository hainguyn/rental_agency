import React, { useEffect, useRef } from "react";
import { List, Pagination, Search } from "./index";
import { ItemSidebar, RelatedPost, Province } from "../../components";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchDetail = () => {
  const listRef = useRef();
  const [searchParams] = useSearchParams();
  const { prices, areas, categories } = useSelector((state) => state.app);

  useEffect(() => {
    if (searchParams.get("page")) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [searchParams.get("page")]);

  return (
    <div className="pt-16 gap-10">
      <div className="flex flex-col items-center justify-between ">
        {/* <Search /> */}
        <Province />
      </div>
      <div ref={listRef} className=" w-full flex gap-4 ">
        <div className="flex flex-col w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col justify-start items-center gap-4  ">
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

export default SearchDetail;
