export const path = {
  HOME: "/*",
  LOGIN: "login",
  REGISTER: "register",
  HOME__PAGE: ":page",
  CHO_THUE_CAN_HO: "cho-thue-can-ho",
  CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
  NHA_CHO_THUE: "nha-cho-thue",
  CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
  DETAIL_POST__TITLE__POSTID: "chi-tiet/:title/:postId",
  SEARCH: "tim-kiem",
  SYSTEM: "/he-thong/*",
  CREATE_POST: "tao-moi-bai-dang",
  MANAGE_POST: "quan-ly-bai-dang",
  EDIT_ACCOUNT: "sua-thong-tin-ca-nhan",
  CONTACT: "lien-he",
  DETAIL_POST: "/chi-tiet/",
  DETAIL_ALL: "chi-tiet/*",
  CHAT: "nhan-tin",
  CHAT_ALL: "dien-dan",
};

export const location = [
  {
    id: "hcm",
    name: "Phòng trọ Hồ Chí Minh",
    image: "https://images.pexels.com/photos/1018478/pexels-photo-1018478.jpeg",
    provinceCode: "CUID",
  },
  {
    id: "hn",
    name: "Phòng trọ Hà Nội",
    image:
      "https://images.pexels.com/photos/19892915/pexels-photo-19892915/free-photo-of-thanh-ph-m-c-toa-nha-h.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    provinceCode: "NDOE",
  },
  {
    id: "dn",
    name: "Phòng trọ Đà nẵng",
    image:
      "https://images.pexels.com/photos/2162442/pexels-photo-2162442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    provinceCode: "NNAE",
  },
];
