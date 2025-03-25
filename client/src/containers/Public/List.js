import React, { useEffect, useRef, useState } from "react";
import { Button, Item } from "../../components";
import { getPosts, getPostsLimit } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const List = ({ categoryCode }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);
  const [sort, setSort] = useState(0);

  //  const [searchParams] = useSearchParams();
  const listRef = useRef();
  useEffect(() => {
    if (searchParams.get("page")) {
      if (listRef.current) {
        listRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        console.error("listRef.current is undefined");
      }
    }
  }, [searchParams]);

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    if (categoryCode) searchParamsObject.categoryCode = categoryCode;
    if (sort === 1) searchParamsObject.order = ["createdAt", "DESC"];
    dispatch(getPostsLimit(searchParamsObject));
  }, [searchParams, categoryCode, sort]);

  return (
    <div
      ref={listRef}
      className="w-full border-b rounded-lg bg-stone-100 shadow-md"
    >
      <div className="flex  items-center justify-between mb-5">
        <h4 className="text-3xl font-semibold pt-5 ">Danh SÁCH TIN ĐĂNG</h4>
        {/* <span>Cập nhật: 12-05 23/08/2024</span> */}
      </div>
      <div className="flex items-center gap-0 ">
        <span>Sắp xếp:</span>
        <div className="hover:scale-105 transition-all duration-300 ease-in-out px-4 py-2">
          <Button
            text={"Mặc Định"}
            textColor="text-black"
            bgColor="bg-gray-300"
            bdWhidth="border-2"
            hover="hover:bg-stone-300"
            rounded="rounded-md"
            type="submit"
            onClick={() => setSort(0)}
          />
        </div>
        <div className="hover:scale-105 transition-all duration-300 ease-in-out px-4 py-2">
          <Button
            text={"Mới Nhất"}
            textColor="text-black"
            bgColor="bg-gray-300"
            bdWhidth="border-2"
            hover="hover:bg-stone-300"
            rounded="rounded-md"
            type="submit"
            onClick={() => setSort(1)}
          />
        </div>
      </div>
      <div className="item">
        {posts.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                images={JSON.parse(item?.images?.image)}
                star={item?.star}
                title={item?.title}
                user={item?.user}
                id={item.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
