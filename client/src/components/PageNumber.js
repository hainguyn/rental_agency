import React, { memo } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

const notActive =
  " border-b shadow flex items-center justify-center w-[40px] h-[45px] bg-stone-100 hover:bg-gray-300  rounded-md";
const active =
  " border-b shadow flex items-center justify-center w-[40px] h-[45px] bg-green-400 hover:opacity-80 rounded-md";

const PageNumber = ({ text, currentPage, icon, setCurrentPage, type }) => {
  const navigate = useNavigate();
  const [paramsSearch] = useSearchParams();
  const entries = paramsSearch.entries();
  const location = useLocation();

  const append = (entries) => {
    let params = [];
    paramsSearch.append("page", +text);
    for (let entry of entries) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (
        Object.keys(searchParamsObject)?.some(
          (item) => item === i[0] && item !== "page"
        )
      ) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    return searchParamsObject;
  };

  const handleChangePage = () => {
    if (!(text === "...")) {
      setCurrentPage(+text);
      navigate({
        pathname: location.pathname,
        search: createSearchParams(append(entries)).toString(),
      });
    }
  };
  return (
    <div
      className={
        +text === +currentPage
          ? active
          : `${notActive} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
      }
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
};

export default memo(PageNumber);
