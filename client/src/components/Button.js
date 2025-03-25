import React, { memo } from "react";

const Button = ({
  text,
  textColor,
  bgColor,
  bdColor,
  bdWhidth,
  rounded,
  hover,
  onClick,
  fullWidth,
  px,
  Ic,
  IcBefore,
}) => {
  return (
    <button
      type="button"
      className={`py-2 text-lg ${
        px ? px : "px-2"
      } ${textColor} ${bgColor} ${bdColor} ${bdWhidth} ${rounded} ${hover}  ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      {IcBefore && (
        <span>
          <IcBefore />
        </span>
      )}
      <span>{text}</span>
      {Ic && (
        <span>
          <Ic />
        </span>
      )}
    </button>
  );
};

export default memo(Button);
