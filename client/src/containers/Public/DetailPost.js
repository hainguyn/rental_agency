import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
import { ImgPostSlider, BoxInfo, RelatedPost, Map } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";

const { SlLocationPin, PiMoneyWavyThin, CiCrop, CiStopwatch, CiHashtag } =
  icons;

const DetailPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [position, setPosition] = useState([21.0285, 105.8542]); // Default: TP.HCM
  const rawAddress = posts[0]?.address;
  const address = rawAddress?.replace(/^Địa chỉ:\s*/, "");

  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);
  console.log(address);

  const handleFilterLabel = () => {
    navigate({
      pathname: `/${path.SEARCH}`,
      search: createSearchParams({
        labelCode: posts[0]?.labelData?.code,
      }).toString(),
    });
  };

  useEffect(() => {
    if (address) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
            console.log(position);
          } else {
            console.error("Không tìm thấy tọa độ cho địa chỉ này.");
          }
        })
        .catch((error) => console.error("Lỗi khi lấy tọa độ:", error));
    }
  }, [address]);

  return (
    <div className="w-full flex gap-4 pt-4 pb-4">
      <div className="w-[70%] h-full rounded-md shadow-lg p-6 bg-stone-100  ">
        <ImgPostSlider
          images={
            posts && posts?.length > 0 && JSON.parse(posts[0]?.images?.image)
          }
        />
        <div className="flex flex-col gap-2 mt-8">
          {/* tieu de */}
          <div>
            <h2 className="text-3xl text-green-700 font-bold">
              {posts[0]?.title}
            </h2>
            <div className="flex items-center gap-2 mt-8">
              <span>Chuyên mục:</span>
              <span
                onClick={handleFilterLabel}
                className=" underline font-medium cursor-pointer hover:text-green-600"
              >
                {posts[0]?.labelData?.value}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <SlLocationPin size={20} /> <span>{posts[0]?.address}</span>
            </div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-1">
                <PiMoneyWavyThin size={20} />
                <span className="font-semibold text-lg text-green-500">
                  {posts[0]?.attributes?.price}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CiCrop size={20} />
                <span>{posts[0]?.attributes?.acreage}</span>
              </div>
              <div className="flex items-center gap-1">
                <CiStopwatch size={20} />
                <span>{posts[0]?.attributes?.published}</span>
              </div>
              <div className="flex items-center gap-1">
                <CiHashtag size={20} />
                <span>{posts[0]?.attributes?.hashtag}</span>
              </div>
            </div>
          </div>

          {/* mo ta */}
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4"> Thông tin mô tả</h3>
            <div className="flex flex-col gap-2">
              {posts[0]?.description &&
                (Array.isArray(JSON.parse(posts[0]?.description)) ? (
                  JSON.parse(posts[0]?.description).map((item, index) => (
                    <span key={index} className="text-justify">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-justify">{posts[0]?.description}</span>
                ))}
            </div>
          </div>

          {/* thong tin bai dang */}
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
            <table className="w-full">
              <tbody>
                <tr className="bg-gray-200">
                  <th className=" text-start p-2 ">Mã tin</th>
                  <td className=" text-start p-2 ">
                    {posts[0]?.overviews?.code}
                  </td>
                </tr>
                <tr>
                  <th className="  text-start p-2">Khu vực</th>
                  <td className="  text-start text-green-500 underline p-2">
                    {posts[0]?.overviews?.area}
                  </td>
                </tr>
                <tr className="bg-gray-200">
                  <th className="  text-start p-2">Loại tin rao</th>
                  <td className="  text-start p-2">
                    {posts[0]?.overviews?.type}
                  </td>
                </tr>
                <tr>
                  <th className="  text-start p-2">Đói tượng </th>
                  <td className="  text-start p-2">
                    {posts[0]?.overviews?.target}
                  </td>
                </tr>
                <tr className="bg-gray-200">
                  <th className="  text-start p-2">Gói tin</th>
                  <td className="  text-start text-red-600 p-2">
                    {posts[0]?.overviews?.bonus}
                  </td>
                </tr>
                <tr>
                  <th className="  text-start p-2">Ngày đăng</th>
                  <td className="  text-start p-2">
                    {posts[0]?.overviews?.created}
                  </td>
                </tr>
                <tr className="bg-gray-200">
                  <th className="  text-start p-2">Ngày hết hạn</th>
                  <td className="  text-start p-2">
                    {posts[0]?.overviews?.expired}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* thong tin lien he */}
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <th className=" text-start p-2 ">Liên hệ:</th>
                  <td className=" text-start p-2 ">{posts[0]?.user?.name}</td>
                </tr>
                <tr className="bg-gray-200">
                  <th className=" text-start p-2 ">Điện thoại</th>
                  <td className=" text-start p-2 ">{posts[0]?.user?.phone}</td>
                </tr>
                <tr>
                  <th className=" text-start p-2 ">Zalo</th>
                  <td className=" text-start p-2 ">{posts[0]?.user?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 pb-4">
            <h3 className="font-semibold text-xl my-4">Bản đồ</h3>
            <p className="text-gray-700">{rawAddress}</p>
            <Map position={position} address={address} />
          </div>
        </div>
      </div>
      <div className="w-[30%] ">
        <div className="flex flex-col gap-6">
          <BoxInfo userData={posts[0]?.user} />
          <RelatedPost />
          <RelatedPost newPost />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
