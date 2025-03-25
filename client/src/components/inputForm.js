import React, { memo } from "react";

const InputForm = ({
  label,
  value,
  setPayload,
  type,
  invalidFields = [],
  setInvalidFields,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={type} className="text-xs mb-1">
        {label}
      </label>
      <input
        type={type === "password" ? "password" : "text"} // Đặt loại input cho mật khẩu
        id={type}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value}
        onChange={(e) =>
          setPayload((prev) => ({ ...prev, [type]: e.target.value }))
        } // Sử dụng setPayload
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((i) => i.name === type) && (
        <small className="text-red-600 italic ">
          {" "}
          {invalidFields.find((i) => i.name === type)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
