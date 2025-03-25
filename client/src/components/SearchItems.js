import React, { memo } from "react";

const SearchItems = ({
  FirstIcon,
  SecondIcon,
  text,
  fontWeight,
  defaultText,
}) => {
  return (
    <div className="bg-white py-2 px-4 w-full rounded-md text-stone-600 text-sm flex items-center justify-between">
      <div className="flex items-center gap-1 w-full">
        {FirstIcon}
        <span
          className={`${
            fontWeight && "font-medium text-black"
          } w-[100px] overflow-hidden text-ellipsis whitespace-nowrap
          ${text ? "font-medium text-black" : ""}`}
        >
          {text || defaultText}
        </span>
      </div>
      {SecondIcon}
    </div>
  );
};

export default memo(SearchItems);
