import icons from "./icons";

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin, MdOutlineContactMail } =
  icons;

const menuManage = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <ImPencil2 />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 4,
    text: "Thông tin tài khoản",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <BiUserPin />,
  },
  {
    id: 5,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <MdOutlineContactMail />,
  },
];

export default menuManage;
