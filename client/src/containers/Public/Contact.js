import React from "react";
import { InputForm, Button } from "../../components";
import { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });
  const handleSubmit = async () => {
    Swal.fire(
      `Cảm ơn ${payload.name ? payload.name : ""}!`,
      "Phản hồi của bạn đã được chúng tôi ghi nhận.",
      "success"
    ).then(() => {
      setPayload({
        name: "",
        phone: "",
        content: "",
      });
    });
  };
  return (
    <div className="w-full">
      <h1 className="text-4xl w-full text-start font-bold text-green-400 py-4 border-b border-gray-300 mb-6 px-10">
        Liên hệ với chúng tôi
      </h1>
      <div className="flex gap-6 items-center px-10">
        <div className="flex flex-col flex-1 gap-4 bg-green-400 p-4 rounded-lg text-white bg-gradient-to-br from-green-700 to-green-400">
          <h4 className="font-medium text-lg">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn chúng tôi
          </span>
          <span>Điện thoại: 0917 686 101</span>
          <span>Email: hai0213866@huce.edu.vn</span>
          <span>Zalo: 0917 686 101</span>
          <span>Viber: 0917 686 101</span>
          <span>
            Địa chỉ: Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí
            Thọ, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt
            Nam.
          </span>
        </div>
        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md  ">
          <h4 className="font-medium text-lg mb-4">Liên hệ trực tuyến</h4>
          <div>
            <div>
              <InputForm
                type="name"
                setPayload={setPayload}
                value={payload.name}
                label={"Số điện thoại"}
              />
              <InputForm
                type="phone"
                setPayload={setPayload}
                value={payload.phone}
                label={"Họ và tên của bạn"}
              />

              <div>
                <label htmlFor="desc" className="font-medium">
                  Nội dung mô tả
                </label>
                <textarea
                  name="content"
                  onChange={(e) =>
                    setPayload((prev) => ({ ...prev, content: e.target.value }))
                  }
                  value={payload.content}
                  className=" w-full outline-none bg-gray-200 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  id="desc"
                  cols="30"
                  rows="9"
                ></textarea>
              </div>
              <Button
                textColor={"text-white"}
                text={"Gửi liên hệ"}
                bgColor={"bg-green-400"}
                fullWidth={true}
                onClick={handleSubmit}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
