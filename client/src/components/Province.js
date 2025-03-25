import React, { memo } from "react";
import { ProvinceButton } from "./index";
import { location } from "../ultils/constant";

const Province = () => {
  return (
    <div className="flex items-center justify-center gap-10 pb-16 ">
      {location.map((item) => {
        return (
          <ProvinceButton
            key={item.id}
            name={item.name}
            image={item.image}
            provinceCode={item.provinceCode}
          />
        );
      })}
    </div>
  );
};

export default Province;
