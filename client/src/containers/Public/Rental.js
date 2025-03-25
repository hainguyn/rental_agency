import React, { useEffect, useRef, useState } from "react";
import { List, Pagination, Search } from "./index";
import { ItemSidebar, RelatedPost, Province } from "../../components";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";

const Rental = () => {
  const listRef = useRef();
  const [searchParams] = useSearchParams();
  const { prices, areas, categories } = useSelector((state) => state.app);
  const [categoryCode, setCategoryCode] = useState("none");
  const location = useLocation();

  useEffect(() => {
    const category = categories?.find(
      (item) => `/${formatVietnameseToString(item.value)}` === location.pathname
    );
    if (category) {
      setCategoryCode(category.code);
    }
  }, [location]);

  useEffect(() => {
    if (searchParams.get("page")) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [searchParams.get("page")]);

  return (
    <div>
      <div className="flex flex-col items-center justify-between mt-16">
        {/* <Search /> */}
        <Province />
      </div>
      <div ref={listRef} className=" w-full flex gap-4 ">
        <div className="flex flex-col w-[70%]">
          <List categoryCode={categoryCode} />
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

export default Rental;
