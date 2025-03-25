import React, { useState } from "react";
import { InputReadOnly, InputFormV2, Button } from "../../components";
import anonAvatar from "../../assets/anonAvt.png";
import { useSelector, useDispatch } from "react-redux";
import { apiUploadImages, apiUpdateUser } from "../../services";
import { fileToBase64, blobToBase64 } from "../../ultils/Common/tobase64";
import { getCurrent } from "../../store/actions";
import Swal from "sweetalert2";

const EditAccount = () => {
  const { currentData } = useSelector((state) => state.user);
  console.log(currentData);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avatar: blobToBase64(currentData?.avatar) || "",
    fbUrl: currentData?.fbUrl || "",
    zalo: currentData?.zalo || "",
  });

  console.log(payload.avatar);
  const handleSubmit = async () => {
    const response = await apiUpdateUser(payload);
    if (response?.data.err === 0) {
      Swal.fire(
        "Done!",
        "Chỉnh sửa thông tin cá nhân thành công",
        "success"
      ).then(() => {
        dispatch(getCurrent());
      });
    } else {
      Swal.fire(
        "Oops!",
        "Chỉnh sửa thông tin cá nhân không thành công",
        "error"
      );
    }
  };

  const handleUploadFile = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setPayload((prev) => ({ ...prev, avatar: imageBase64 }));
  };

  return (
    <div className="px-6 flex flex-col items-center">
      <h1 className="text-4xl w-full text-start font-bold text-green-400 py-4 border-b border-gray-300">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 py-8 flex flex-col gap-6 mb-6">
        <InputReadOnly
          value={
            `#${currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}` || ""
          }
          direction="flex-row"
          label="Mã thành viên"
        ></InputReadOnly>
        <InputReadOnly
          value={currentData?.phone}
          direction="flex-row"
          label="Số điện thoại"
          editPhone
        ></InputReadOnly>
      </div>
      <div className="w-3/5 py-8 flex flex-col gap-6 mb-6">
        <InputFormV2
          name="name"
          setValue={setPayload}
          value={payload.name}
          direction="flex-row"
          label="Tên hiển thị"
        ></InputFormV2>
        <InputFormV2
          name="zalo"
          setValue={setPayload}
          value={payload.zalo}
          direction="flex-row"
          label="Zalo"
        ></InputFormV2>
        <InputFormV2
          name="fbUrl"
          setValue={setPayload}
          value={payload.fbUrl}
          direction="flex-row"
          label="Facebook"
        ></InputFormV2>
      </div>
      <div className="flex w-3/5 py-8 mb-10">
        <label htmlFor="password" className=" font-medium w-48 flex-none">
          Mật khẩu
        </label>
        <small className=" flex-auto text-green-600 italic cursor-pointer">
          Đổi mật khẩu
        </small>
      </div>
      <div className="flex w-3/5 py-8 mb-10 ">
        <label htmlFor="avatar" className=" font-medium w-48 flex-none">
          Ảnh đại diện
        </label>
        <div>
          <img
            src={payload.avatar || anonAvatar}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover"
          ></img>
          <input
            type="file"
            id="avatar"
            className="appearance-none my-4 "
            onChange={handleUploadFile}
          ></input>
        </div>
      </div>
      <div className="w-3/5 flex items-center justify-center">
        <Button
          text={"Cập nhật"}
          textColor="text-white"
          bgColor="bg-green-400"
          bdColor="border-green-400"
          bdWhidth="border-2"
          hover="hover:bg-green-600"
          rounded="rounded-md"
          type="submit"
          fullWidth="w-full"
          onClick={handleSubmit}
        ></Button>
      </div>
    </div>
  );
};

export default EditAccount;
