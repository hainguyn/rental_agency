import React, { memo, useEffect, useState } from "react";
import { Select, InputReadOnly } from "../components";
import { useSelector } from "react-redux";
import {
  apiGetPublicProvinces,
  apiGetPublicDistrict,
  apiGetPublicWard,
} from "../services";

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {
  const { dataEdit } = useSelector((state) => state.post);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [houseNumber, setHouseNumber] = useState(""); // Thêm state cho số nhà
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundProvince =
        provinces?.length > 0 &&
        provinces.find(
          (item) =>
            item.province_name === addressArr[addressArr.length - 1]?.trim()
        );
      setProvince(foundProvince ? foundProvince.province_id : "");
    }
  }, [provinces, dataEdit]);

  useEffect(() => {
    if (dataEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundDistrict =
        districts?.length > 0 &&
        districts.find(
          (item) =>
            item.district_name === addressArr[addressArr.length - 2]?.trim()
        );
      setDistrict(foundDistrict ? foundDistrict.district_id : "");
    }
  }, [districts, dataEdit]);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    setDistrict("");

    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    setWard("");
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWard(district);
      if (response.status === 200) {
        setWards(response.data.results);
      }
    };
    district && fetchPublicWard();
    !district ? setReset(true) : setReset(false);
    !district && setWards([]);
  }, [district]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${houseNumber ? `${houseNumber}, ` : ""}${
        ward
          ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
          : ""
      }${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            }, `
          : ""
      }${
        province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
      province: province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : "",
    }));
  }, [province, district, ward, houseNumber]); // Thêm houseNumber vào danh sách dependencies

  return (
    <div>
      <h2 className="font-medium text-2xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        {/* Sử dụng CSS Grid để bố trí các Select */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            type="province"
            value={province}
            setValue={setProvince}
            options={provinces}
            label={"Tỉnh/Thành Phố"}
          />
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            reset={reset}
            type="district"
            value={district}
            setValue={setDistrict}
            options={districts}
            label={"Quận/Huyện"}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {/* Thêm trường nhập số nhà */}
          <input
            type="text"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            className="border p-2"
            placeholder="Số nhà"
          />
        </div>
        <InputReadOnly
          label={"Địa chỉ chính xác"}
          value={`${houseNumber ? `${houseNumber},` : ""}${
            ward
              ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
              : ""
          } ${
            district
              ? `${
                  districts?.find((item) => item.district_id === district)
                    ?.district_name
                },`
              : ""
          } ${
            province
              ? provinces?.find((item) => item.province_id === province)
                  ?.province_name
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default memo(Address);
