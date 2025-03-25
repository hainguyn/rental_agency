import React, { useEffect, useState } from "react";
import logo from "../../assets/logo_login.png";
import { Button } from "../../components";
import InputForm from "../../components/inputForm";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import validate from "../../ultils/Common/validateFields";
import Swal from "sweetalert2";

const Login = ({ isRegister = false }) => {
  // const [isRegister] = useState(isRegister);
  const dispatch = useDispatch();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Điều hướng đến trang chủ
      setTimeout(() => {
        window.location.reload(); // Reload lại trang sau khi trạng thái được ghi nhận
      }, 500); //
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    msg && Swal.fire("Opps !", msg, "error");
  }, [msg, update]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload, setInvalidFields);
    if (invalids === 0) {
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload)); // Truyền payload với useDispatch
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 flex items-center justify-center p-[60px]">
        <div className="bg-white w-[500px] p-[80px] rounded-md shadow-sm">
          <h3 className="font-semibold text-2xl mb-3">
            {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
          </h3>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            {isRegister && (
              <InputForm
                label={"Họ tên"}
                value={payload.name}
                setPayload={setPayload} // Truyền setPayload vào đây
                type="name"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            )}
            <InputForm
              label={"Số điện thoại"}
              value={payload.phone}
              setPayload={setPayload} // Truyền setPayload vào đây
              type="phone"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <InputForm
              label={"Mật khẩu"}
              value={payload.password}
              setPayload={setPayload} // Truyền setPayload vào đây
              type="password"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <Button
              text={isRegister ? "Đăng ký" : "Đăng nhập"}
              textColor="text-white"
              bgColor="bg-emerald-400"
              bdColor="border-emerald-400"
              bdWhidth="border-2"
              hover="hover:bg-emerald-600"
              rounded="rounded-md"
              type="button"
              onClick={handleSubmit}
            />
          </form>
          <div className="mt-7 flex items-center justify-between">
            {isRegister ? (
              <small>
                Bạn đã có tài khoản?
                <span
                  onClick={() => {
                    navigate("/login");
                    setPayload({
                      phone: "",
                      password: "",
                      name: "",
                    });
                  }}
                  className="text-emerald-400 hover:underline cursor-pointer"
                >
                  {" "}
                  Đăng nhập ngay
                </span>
              </small>
            ) : (
              <>
                <small className="text-emerald-400 hover:underline">
                  Bạn quên mật khẩu
                </small>
                <small
                  onClick={() => {
                    navigate("/register");
                    setPayload({
                      phone: "",
                      password: "",
                      name: "",
                    });
                  }}
                  className="text-emerald-400 hover:underline cursor-pointer"
                >
                  Tạo tài khoản mới
                </small>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full bg-cover bg-center">
        <img src={logo} alt="Login" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default Login;
