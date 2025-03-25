import React from "react";
import { Select, InputReadOnly, InputFormV2 } from ".";
import { useSelector } from "react-redux";

const targets = [
  { code: "Nam", value: "Nam" },
  { code: "Nữ", value: "Nữ" },
  { code: "Tất cả", value: "Tất cả" },
];

const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);
  return (
    <div>
      <h2 className="font-medium text-2xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-4 ">
        <div className="w-1/2 flex flex-col gap-4 ">
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.categoryCode}
            setValue={setPayload}
            name="categoryCode"
            options={categories}
            label=" Loại chuyên mục"
          ></Select>
        </div>
        <InputFormV2
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          value={payload.title}
          setValue={setPayload}
          name="title"
          label="Tiêu đề"
        ></InputFormV2>
        <div className="flex flex-col gap-2">
          <label htmlFor="desc" className="font-medium">
            {" "}
            Nội dung mô tả{" "}
          </label>
          <textarea
            value={payload.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e.target.value }))
            }
            id="desc"
            cols="30"
            rows="30"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
            onFocus={() => setInvalidFields([])}
          ></textarea>
          <small className="text-red-600 italic">
            {invalidFields?.some((item) => item.name === "description") &&
              invalidFields?.find((item) => item.name === "description")
                ?.message}
          </small>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <InputReadOnly
            label="Thông tin liên hệ"
            value={currentData?.name || currentData?.user}
          />
          <InputReadOnly label="Số điện thoại" value={currentData?.phone} />
          <InputFormV2
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
            label="Giá cho thuê"
            unit="Đồng"
            value={payload.priceNumber}
            setValue={setPayload}
            name="priceNumber"
          ></InputFormV2>
          <InputFormV2
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label="Diện tích"
            unit="m2"
            value={payload.areaNumber}
            setValue={setPayload}
            name="areaNumber"
          ></InputFormV2>
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.target}
            setValue={setPayload}
            name="target"
            options={targets}
            label="Đối tượng cho thuê"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
