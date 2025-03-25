import React from "react";

const InputReadOnly = ({ label, value, direction, editPhone }) => {
  return (
    <div className={`gap-2 flex ${direction ? direction : "flex-col"}`}>
      <label htmlFor="exactly-address" className="font-medium w-48 flex-none">
        {label}
      </label>
      <div className=" flex-auto">
        <input
          value={value || ""}
          className="w-full bg-gray-200 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
          id="exactly-address"
          type="text"
          readOnly
        ></input>
        {editPhone && (
          <small className="text-green-400 italic cursor-pointer">
            Đổi số điện thoại
          </small>
        )}
      </div>
    </div>
  );
};

export default InputReadOnly;
