import React, { useEffect, useState } from "react";
import { Overview, Address, Loading, Button, Map } from "../../components";
import icons from "../../ultils/icons";
import { apiUploadImages } from "../../services";
import { getCodes, getCodesArea } from "../../ultils/Common/getCodes";
import { useSelector, useDispatch } from "react-redux";
import { apiCreatePost, apiUpdatePost } from "../../services";
import Swal from "sweetalert2";
import validate from "../../ultils/Common/validateFields";
import { resetDataEdit } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";

const { FcMultipleCameras, RiDeleteBin6Line } = icons;

const CreatePost = ({ isEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataEdit } = useSelector((state) => state.post);
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber * 1000000 || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images: dataEdit?.images?.image
        ? JSON.parse(dataEdit?.images?.image)
        : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      description: dataEdit?.description
        ? JSON.parse(dataEdit?.description)
        : "",
      target: dataEdit?.overviews?.target || "",
      province: dataEdit?.province || "",
    };
    return initData;
  });

  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { prices, areas, categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const [invalidFields, setInvalidFields] = useState([]);

  const [position, setPosition] = useState([21.0285, 105.8542]);

  const fetchCoordinatesFromAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data && data[0]) {
        setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        setPosition([21.0285, 105.8542]); // Default fallback position if no data found
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    if (payload.address) {
      fetchCoordinatesFromAddress(payload.address);
    }
  }, [payload.address]);

  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image);
      images && setImagesPreview(images);
    }
  }, [dataEdit]);

  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );

      let response = await apiUploadImages(formData);
      if (response.status === 200)
        images = [...images, response.data?.secure_url];
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({
      ...prev,
      images: [...prev.images, ...images],
    }));
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };

  const handleSubmit = async () => {
    let priceCodeArr = getCodes(
      +payload.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );
    let priceCode = priceCodeArr[0]?.code;
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90);
    let areaCode = areaCodeArr[0]?.code;
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userId: currentData?.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      } ${payload?.address?.split(",")[0]}`,
    };
    const result = validate(finalPayload, setInvalidFields);
    if (result === 0) {
      if (dataEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;
        const response = await apiUpdatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công!",
            "Đã chỉnh sửa bài đăng thành công",
            "success"
          ).then(() => {
            resetPayload();
            dispatch(resetDataEdit());
          });
        } else {
          Swal.fire("Oops!", "Đã xảy ra lỗi", "error");
        }
      } else {
        const response = await apiCreatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire("Thành công!", "Đã thêm bài đăng mới", "success").then(
            () => {
              resetPayload();
              navigate(`/he-thong/${path.MANAGE_POST}`); // Điều hướng đến trang quản lý tin đăng
            }
          );
        } else {
          Swal.fire("Oops!", "Đã xảy ra lỗi", "error");
        }
      }
    }
  };

  const resetPayload = () => {
    setPayload({
      categoryCode: "",
      title: "",
      priceNumber: 0,
      areaNumber: 0,
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
    });
  };

  return (
    <div className="bg-white px-6 ">
      <h1 className="text-4xl font-bold text-green-400 py-4 border-b border-gray-300">
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h1>
      <div className="flex">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <Overview
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <div className="w-full">
            <h2 className="font-medium text-2xl py-4"> Hình ảnh </h2>
            <small> Cập nhật hình ảnh rõ ràng </small>
            <div children="w-full">
              <label
                className="w-full flex flex-col gap-2 items-center justify-center border border-gray-500 my-4 h-[200px] border-dashed rounded-lg "
                htmlFor="file"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col  items-center justify-center">
                    <FcMultipleCameras size={100} />
                    Thêm ảnh{" "}
                  </div>
                )}
              </label>
              <input
                onChange={handleFiles}
                hidden
                type="file"
                id="file"
                multiple
              ></input>
              <small className="text-red-600 italic">
                {invalidFields?.some((item) => item.name === "images") &&
                  invalidFields?.find((item) => item.name === "images")
                    ?.message}
              </small>
              <div className=" w-full ">
                <h3 className="font-medium text-lg  py-3">Ảnh đã chọn</h3>
                <div className="flex gap-4 items-center">
                  {imagesPreview?.map((item) => {
                    return (
                      <div key={item} className="relative w-[200px] h-[150px]">
                        <img
                          src={item}
                          alt="preview"
                          className=" w-full h-full object-cover rounded-md"
                        />{" "}
                        <span
                          title="Xóa"
                          onClick={() => handleDeleteImage(item)}
                          className="absolute top-0 right-0 px-2 py-1 cursor-pointer bg-gray-200 hover:bg-gray-400  rounded-full "
                        >
                          <RiDeleteBin6Line />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            text={isEdit ? "Cập nhật tin đăng" : "Đăng tin mới"}
            textColor="text-white"
            bgColor="bg-green-400"
            bdColor="border-green-400"
            bdWhidth="border-2"
            hover="hover:bg-green-600"
            rounded="rounded-md"
            type="submit"
            onClick={handleSubmit}
          ></Button>
        </div>
        <div className="w-full md:w-1/3 flex-none p-4 bg-gray-100 rounded-lg shadow-md h-[330px]">
          <Map address={payload?.address} position={position} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
