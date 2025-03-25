import React, { memo } from "react";
import { text } from "../ultils/dataContact";
import { path } from "../ultils/constant";
import { NavLink } from "react-router-dom";
import thumbnais from "../assets/thumbnais-removebg-preview.png";

const Contact = () => {
  return (
    <div className="py-4">
      <div className=" w-full p-4 border-b rounded-lg bg-stone-100 gap-4 shadow-md flex flex-col items-center justify-center ">
        <img
          src={thumbnais}
          alt="thumbnais"
          className="w-full object-contain "
        />
        <p>{text.content}</p>
        <div className="flex w-full items-center justify-around">
          {text.contact.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <span className="font-semibold">{item.text}</span>
                <span className="text-green-600 text-[25px] font-semibold">
                  {item.phone}
                </span>
                <span className="text-green-600 text-[25px] font-semibold">
                  {item.zalo}
                </span>
              </div>
            );
          })}
        </div>
        <NavLink to={path.CONTACT}>
          <span className=" w-full bg-green-400 bd-green-400 text-white rounded-md px-6 py-2 text-lg ">
            Gửi liên hệ
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default memo(Contact);
