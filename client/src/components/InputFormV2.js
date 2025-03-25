import React from "react";

const InputFormV2 = ({
  label,
  unit,
  value,
  setValue,
  name,
  small,
  invalidFields,
  setInvalidFields,
  direction,
}) => {
  return (
    <div className={`gap-2 flex ${direction ? direction : "flex-col"}`}>
      <label htmlFor="title" className="font-medium w-48 flex-none">
        {label}
      </label>
      <div className="flex flex-auto flex-col items-center">
        <div className="flex w-full items-center">
          <input
            onFocus={() => setInvalidFields && setInvalidFields([])}
            value={value}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, [name]: e.target.value }))
            }
            type="text"
            id="title"
            className={` ${
              unit ? "rounded-tl-lg rounded-bl-lg" : "rounded-lg"
            } flex-auto px-4 py-2 border border-gray-300 focus:outline-none`}
          ></input>
          {unit && (
            <span className="p-2 border border-gray-300 flex-none w-15 flex items-center justify-center rounded-tr-lg rounded-br-lg bg-gray-200">
              {unit}
            </span>
          )}
        </div>
        {invalidFields?.some((item) => item.name === name) && (
          <small className="text-red-600 block w-full italic">
            {invalidFields?.find((item) => item.name === name)?.message}
          </small>
        )}
      </div>
      {small && <small className="opacity-70">{small}</small>}
    </div>
  );
};

export default InputFormV2;
