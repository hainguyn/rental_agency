import React, { useEffect, useRef, useState } from "react";
import { apiUploadImages } from "../services";
import { FaPaperPlane } from "react-icons/fa";
import { BoxInfo } from "./";
import { useSelector } from "react-redux";
import anonAvatar from "../assets//anonAvt.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import icons from "../ultils/icons";
import { text } from "../ultils/dataIntro";
import Loading from "./Loading";
import backgroundImg from "../assets/wallapaper.jpeg";
import { IoSend } from "react-icons/io5";
import { blobToBase64 } from "../ultils/Common/tobase64";
import moment from "moment";
import { path } from "../ultils/constant";

const { HiDotsVertical, FaPlus, FaImage, FaVideo, IoClose, IoMdSend } = icons;

const ChatButton = () => {
  const navigate = useNavigate();
  const { currentData } = useSelector((state) => state.user);
  // console.log(blobToBase64(currentData?.avatar));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user_Id = queryParams.get("userId");
  const socketConnection = useSelector(
    (state) => state?.auth?.socketConnection
  );

  const [dataUser, setDataUser] = useState({
    name: "",
    phonne: "",
    avatar: "",
    online: false,
    id: "",
  });

  const [openImageVidepUpload, setOpenImageVidepUpload] = useState(false);

  const [messages, setMessages] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const currentMessage = useRef();

  useEffect(() => {
    if (!user_Id) {
      // Nếu chưa chọn người nhận tin nhắn, chuyển hướng về trang danh sách người dùng hoặc một trang khác.
      navigate("/nhan-tin"); // Hoặc bạn có thể chuyển hướng đến trang chính hoặc bất kỳ trang nào bạn muốn.
    }
  }, [user_Id, navigate]);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessage]);
  const handleUploadImageVideo = () => {
    setOpenImageVidepUpload((pre) => !pre);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);
    try {
      const uploadImage = await apiUploadImages(formData);
      setLoading(false);
      setOpenImageVidepUpload(false);
      if (uploadImage.status === 200) {
        setMessages((prev) => ({
          ...prev,
          imageUrl: uploadImage.data?.secure_url,
        }));
      } else {
        console.error("Upload failed:", uploadImage);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleClearUploadImage = () => {
    setMessages((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  useEffect(() => {
    if (socketConnection) {
      // console.log(socketConnection);
      socketConnection.emit("message-page", user_Id);

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });

      socketConnection.on("message", (data) => {
        // console.log(data);
        setAllMessage(data);
      });

      socketConnection.emit("sidebar", currentData?.id);
      socketConnection.on("conversations", (data) => {
        const conversationUserData = data.map((conversationUser, index) => {
          console.log(conversationUser);
          if (conversationUser?.sender?.id === conversationUser?.receiver?.id) {
            return {
              ...conversationUser,
              userDetail: conversationUser.sender,
            };
          } else if (conversationUser?.receiver?.id !== currentData?.id) {
            return {
              ...conversationUser,
              userDetail: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetail: conversationUser.sender,
            };
          }
        });
        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user_Id, currentData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMessages((prev) => ({
      ...prev,
      text: value,
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messages.text || messages.imageUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: currentData?.id,
          receiver: user_Id,
          text: messages.text,
          imageUrl: messages.imageUrl,
          videoUrl: messages.videoUrl,
          msgByUserId: currentData?.id,
        });
        setMessages({ text: "", imageUrl: "", videoUrl: "" });
      }
    }
  };

  return (
    <div className="w-full h-[630px] flex bg-stone-100 gap-4  ">
      {/* Sidebar: Danh sách người dùng */}

      <div
        // style={{ backgroundImage: `url(${backgroundImg})` }}
        className="w-1/4 shadow-md sticky overflow-y-auto rounded-lg flex flex-col items-center bg-white"
      >
        <div className=" w-full h-[92px] rounded-lg shadow-md flex items-center justify-center mb-4 bg-white">
          <h3 className="font-bold mb-4 text-xl ">Danh sách người dùng</h3>
        </div>
        {allUser?.map((conv, index) => {
          const key = conv?.id || index;
          return (
            <NavLink
              to={"/nhan-tin?userId=" + conv?.userDetail?.id}
              className="flex items-center justify-between w-full rounded-lg  p-2 hover:border-green-400 hover:shadow-lg hover:bg-slate-100 cursor-pointer"
              key={key}
            >
              <div className="flex items-center gap-4">
                <div>
                  <img
                    src={blobToBase64(conv?.userDetail?.avatar) || anonAvatar}
                    alt="avatar"
                    className="w-[60px] object-cover rounded-full h-[60px] border-2 shadow-md border-white"
                  />
                </div>
                <div>
                  <h3 className="text-ellipsis line-clamp-1">
                    {conv?.userDetail?.name}
                  </h3>
                  <div className="text-slate-500 text-sm flex items-center ">
                    <div className="flex items-center gap-2">
                      {conv?.lastMsg?.imageUrl && (
                        <div className="flex items-center gap-2">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg.text && <span>Image</span>}
                        </div>
                      )}
                    </div>
                    <p className="text-ellipsis line-clamp-1">
                      {conv?.lastMsg?.text}
                    </p>
                  </div>
                </div>
              </div>
              {/* seenMsg here */}
              {/* <div className="flex items-center justify-center">
                <p className="text-xs w-6 h-6 flex items-center justify-center p-2 bg-green-400 rounded-full font-semibold">
                  {conv?.unseenMsg}
                </p>
              </div> */}
            </NavLink>
          );
        })}
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col shadow-md">
        <div
          style={{ backgroundImage: `url(${backgroundImg})` }}
          className="bg-no-repeat bg-cover"
        >
          {/* {location.pathname !== `/${path.CHAT}` && ( */}
          <header className=" rounded-lg sticky top-0 flex justify-between items-center p-4 bg-white shadow-md">
            <div className="flex items-center gap-4">
              <div>
                <img
                  src={blobToBase64(dataUser?.avatar) || anonAvatar}
                  alt="avatar"
                  className="w-[60px] object-cover rounded-full h-[60px] border-2 shadow-md border-white"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg my-0">{dataUser?.name}</h3>
                <p className="-my-2 text-sm pt-1">
                  {dataUser?.online ? (
                    <>
                      <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                      <span className="text-primary">Đang hoạt động</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-slate-400 rounded-full inline-block mr-2"></span>
                      <span className="text-slate-400">Không hoạt động</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div>
              <button className="cursor-pointer hover:text-green-400 ">
                <HiDotsVertical />
              </button>
            </div>
          </header>
          {/* )} */}
          {/* show all message here */}
          <section className="h-[calc(630px-156px)] bg-white bg-opacity-40 overflow-y-scroll overflow-x-hidden relative rounded-lg">
            <div className="flex flex-col gap-2 py-4 px-2">
              {allMessage?.map((msg, index) => {
                return (
                  <div
                    key={index}
                    ref={currentMessage}
                    className={` w-fit shadow-md rounded-md p-1 py-1  max-w-[280px] md:max-w-sm lg:max-w-md  ${
                      currentData?.id === msg.msgByUserId
                        ? "ml-auto bg-green-300 "
                        : "mr-auto bg-white"
                    } `}
                  >
                    <div className="w-full relative">
                      {msg.imageUrl && (
                        <img
                          src={msg?.imageUrl}
                          className="w-full h-full object-scale-down"
                        ></img>
                      )}
                    </div>
                    <p className="px-2">{msg.text}</p>
                    <p className="text-xs ml-auto w-fit">
                      {moment(msg.createdAt).format("HH:mm")}
                    </p>
                  </div>
                );
              })}
            </div>
            {messages?.imageUrl && (
              <div className="w-full h-full sticky bottom-0 bg-slate-700  bg-opacity-30 flex items-center justify-center">
                <div
                  onClick={handleClearUploadImage}
                  className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
                >
                  <IoClose size={30}></IoClose>
                </div>
                <div className="bg-white shadow-md rounded-lg p-3 overflow-hidden">
                  <img
                    src={messages.imageUrl}
                    alt="uploadImage"
                    className="w-80 h-80 object-scale-down"
                  ></img>
                </div>
              </div>
            )}
            {loading && (
              <div className="w-full h-full flex items-center justify-center">
                <Loading />
              </div>
            )}
          </section>
          {/* send message */}
          <section className="h-16 bg-white rounded-lg flex items-center px-4">
            <div className=" relative">
              <button
                onClick={handleUploadImageVideo}
                className=" flex justify-center items-center h-12 w-12 rounded-full hover:bg-green-400 "
              >
                <FaPlus size={20} />
              </button>
              {/* video and image */}

              {openImageVidepUpload && (
                <div className="bg-white shadow-md rounded-lg absolute bottom-14 w-36 p-2">
                  <form>
                    <label
                      htmlFor="uploadImage"
                      className="flex items-center gap-3 p-2 px-2 hover:bg-slate-200 cursor-pointer"
                    >
                      <div className="text-green-400">
                        <FaImage size={18} />
                      </div>
                      <p>Image</p>
                    </label>
                    <label
                      htmlFor="uploadVideo"
                      className="flex items-center gap-3 p-2 px-2 hover:bg-slate-200 cursor-pointer"
                    >
                      <div className="text-purple-400">
                        <FaVideo size={18} />
                      </div>
                      <p>Video</p>
                    </label>

                    <input
                      type="file"
                      id="uploadImage"
                      onChange={handleUploadImage}
                      className="hidden"
                    ></input>
                    <input
                      type="file"
                      id="uploadVideo"
                      // onChange={handleUploadVideo}
                      className="hidden"
                    ></input>
                  </form>
                </div>
              )}
            </div>

            {/* input box */}
            <form
              onSubmit={handleSendMessage}
              className="w-full h-full flex gap-4"
            >
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={messages?.text}
                onChange={handleOnChange}
                className="w-full h-full px-4 py-1 border focus:outline-none "
              ></input>
              <button className="cursor-pointer text-green-400 hover:text-green-600">
                <IoMdSend size={28} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChatButton;
