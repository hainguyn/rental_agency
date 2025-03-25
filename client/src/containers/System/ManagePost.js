import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";

const ManagePost = () => {
  const dispatch = useDispatch();
  const { postOfCurrent, dataEdit } = useSelector((state) => state.post);
  const [isEdit, setIsEdit] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [statusPosts, setStatusPosts] = useState([]);
  const [status, setStatus] = useState("0");

  useEffect(() => {
    !dataEdit && dispatch(actions.getPostsLimitAdmin());
  }, [dataEdit, updateData]);

  useEffect(() => {
    setStatusPosts(postOfCurrent);
  }, [postOfCurrent]);

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);

  const checkStatus = (datestring) =>
    moment(datestring, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );

  const handleDeletePost = async (postId) => {
    const response = await apiDeletePost(postId);
    if (response?.data.err === 0) {
      setUpdateData((prev) => !prev);
    } else {
      Swal.fire("Opps!", "Xóa tin đăng thất bại", "error");
    }
  };
  useEffect(() => {
    if (status === 1) {
      const activePost = postOfCurrent?.filter((item) =>
        checkStatus(item?.overviews?.expired.split(" ")[3])
      );
      setStatusPosts(activePost);
    } else if (status === 2) {
      const inactivePost = postOfCurrent?.filter(
        (item) => !checkStatus(item?.overviews?.expired.split(" ")[3])
      );
      setStatusPosts(inactivePost);
    } else if (!status) {
      setStatusPosts(postOfCurrent);
    }
  }, [status]);

  return (
    <div className="px-6 h-[1000px]">
      <div className="flex flex-col gap-6 ">
        <div className=" flex justify-between border-b border-gray-300 items-center mb-4  ">
          <h1 className="text-4xl font-bold text-green-400 py-4 ">
            Quản lý tin đăng
          </h1>
          <select
            onChange={(e) => setStatus(+e.target.value)}
            value={status}
            className=" outline-none border border-gray-700 py-2 px-4 rounded-lg"
          >
            <option value="0">Lọc trạng thái</option>
            <option value="1">Đang hoạt động</option>
            <option value="2">Đã hết hạn</option>
          </select>
        </div>
        <table className="w-full table-auto ">
          <thead>
            <tr className=" bg-stone-100">
              <th className="border border-gray-700 p-2">Mã tin</th>
              <th className="border border-gray-700 p-2">Ảnh đại diện</th>
              <th className="border border-gray-700 p-2">Tiêu đề</th>
              <th className="border border-gray-700 p-2">Giá</th>
              <th className="border border-gray-700 p-2">Ngày bắt đầu</th>
              <th className="border border-gray-700 p-2">Ngày hết hạn</th>
              <th className="border border-gray-700 p-2">Trạng thái</th>
              <th className="border border-gray-700 p-2">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {!statusPosts ? (
              <tr>
                <td>helu</td>
              </tr>
            ) : (
              statusPosts?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className=" text-center border p-2 border-gray-700">
                      {item?.overviews?.code}
                    </td>
                    <td className="border border-gray-700 p-2">
                      <img
                        src={JSON.parse(item?.images?.image)[0]}
                        alt="Avatar-post "
                        className="w-10 h-10 object-cover rounded-md"
                      ></img>
                    </td>
                    <td className="text-center border border-gray-700 p-2">
                      {`${item?.title.slice(0, 40)}...`}
                    </td>
                    <td className="text-center border border-gray-700 p-2">
                      {item?.attributes?.price}
                    </td>
                    <td className="text-center border border-gray-700 p-2">
                      {item?.overviews?.created}
                    </td>
                    <td className="text-center border border-gray-700 p-2">
                      {item?.overviews?.expired}
                    </td>
                    <td className="text-center border border-gray-700 p-2">
                      {checkStatus(item?.overviews?.expired.split(" ")[3])
                        ? "Đang hoạt động"
                        : "Đã hết hạn"}
                    </td>
                    <td className="flex items-center justify-center gap-2 border-b border-r border-gray-700 p-2">
                      <Button
                        text="Chỉnh sửa"
                        textColor="text-white"
                        bgColor="bg-green-400"
                        bdColor={"border-green-400"}
                        bdWhidth={"border-2"}
                        rounded={"rounded-md"}
                        hover={"hover:bg-green-600 "}
                        onClick={() => {
                          dispatch(actions.editData(item));
                          setIsEdit(true);
                        }}
                      ></Button>
                      <Button
                        text="Xóa"
                        textColor="text-white"
                        bgColor="bg-red-400"
                        bdColor={"border-red-400"}
                        bdWhidth={"border-2"}
                        rounded={"rounded-md"}
                        hover={"hover:bg-red-600 "}
                        onClick={() => handleDeletePost(item.id)}
                      ></Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
      </div>
    </div>
  );
};

export default ManagePost;
