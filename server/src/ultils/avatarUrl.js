// utils/avatarUtils.js

const getMimeType = (extension) => {
  const mimeTypes = {
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
  };
  return mimeTypes[extension.toLowerCase()] || "application/octet-stream"; // Mặc định là binary
};

const convertAvatarToBase64 = (avatar) => {
  const extension = avatar.name.split(".").pop(); // Lấy phần mở rộng của file
  const mimeType = getMimeType(extension);
  return `data:${mimeType};base64,${avatar.toString("base64")}`;
};

module.exports = { convertAvatarToBase64 };
