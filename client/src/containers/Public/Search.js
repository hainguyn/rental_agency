import React, { useCallback, useEffect, useState } from "react";
import { SearchItems, Modal, VoiceSearch } from "../../components";
import icons from "../../ultils/icons";
import { useSelector } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { path } from "../../ultils/constant";

const {
  BsChevronRight,
  HiOutlineLocationMarker,
  BiMoneyWithdraw,
  RiCrop2Line,
  FaWarehouse,
  IoIosSearch,
} = icons;

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const { provinces, areas, prices, categories } = useSelector(
    (state) => state.app
  );
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});
  const [defaultText, setDefaultText] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!location?.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);

  const handleShowModal = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setDefaultText(defaultText);
    setIsShowModal(true);
  };
  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsShowModal(false);
      arrMaxMin && setArrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
    },
    [isShowModal, queries]
  );

  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((item) => item[1]);

    let queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    if (keyword) {
      queryCodesObj["keyword"] = keyword;
    }

    console.log(queryCodesObj);
    navigate({
      pathname: path.SEARCH,
      search: createSearchParams(queryCodesObj).toString(),
    });
  };

  return (
    <div className="mt-16  justify-center">
      <div className="relative flex items-center gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Nhập từ khóa tìm kiếm..."
          className="w-[900px] p-[10px] rounded-tl-md rounded-tr-md bg-white border border-gray-300 placeholder-gray-400 focus:outline-none"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <VoiceSearch onVoiceInput={(value) => setKeyword(value)} />
        </div>
      </div>

      <>
        <div className=" w-[900px] p-[10px] bg-gray-500 rounded-bl-md rounded-br-md  flex-col lg:flex-row flex items-center justify-center gap-2 ">
          <span
            onClick={() =>
              handleShowModal(categories, "category", "Tìm tất cả")
            }
            className=" cursor-pointer flex-1"
          >
            <SearchItems
              FirstIcon={<FaWarehouse />}
              fontWeight={true}
              SecondIcon={<BsChevronRight />}
              text={queries.category}
              defaultText={"Tìm tất cả"}
            />
          </span>
          <span
            onClick={() => handleShowModal(provinces, "province", "Toàn Quốc")}
            className=" cursor-pointer flex-1"
          >
            <SearchItems
              FirstIcon={<HiOutlineLocationMarker />}
              SecondIcon={<BsChevronRight />}
              text={queries.province}
              defaultText={"Toàn Quốc"}
            />
          </span>
          <span
            onClick={() => handleShowModal(prices, "price", "Chọn giá")}
            className=" cursor-pointer flex-1"
          >
            <SearchItems
              FirstIcon={<BiMoneyWithdraw />}
              SecondIcon={<BsChevronRight />}
              text={queries.price}
              defaultText={"Chọn Giá"}
            />
          </span>
          <span
            onClick={() => handleShowModal(areas, "area", "Chọn Diện Tích")}
            className=" cursor-pointer flex-1"
          >
            <SearchItems
              FirstIcon={<RiCrop2Line />}
              SecondIcon={<BsChevronRight />}
              text={queries.area}
              defaultText={"Chọn Diện Tích"}
            />
          </span>

          <button
            type="button"
            onClick={handleSearch}
            className=" flex-1 bg-green-400 py-2 px-4 w-[400px] rounded-md text-white hover:bg-white hover:text-green-400 text-[12px] font-semibold flex items-center justify-center gap-1"
          >
            <IoIosSearch />
            Tìm Kiếm
          </button>
        </div>
        {isShowModal && (
          <Modal
            handleSubmit={handleSubmit}
            queries={queries}
            arrMinMax={arrMinMax}
            content={content}
            name={name}
            setIsShowModal={setIsShowModal}
            defaultText={defaultText}
          />
        )}
      </>
    </div>
  );
};

export default Search;
