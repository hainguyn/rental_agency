export function base64ToBlob(base64String, mimeType) {
  // Tách phần metadata (chẳng hạn 'data:image/jpg;base64,') và phần nội dung base64
  const base64Data = base64String.split(",")[1];

  // Chuyển đổi Base64 thành chuỗi byte
  const byteCharacters = atob(base64Data);

  // Tạo mảng byte từ chuỗi byte
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset++) {
    byteArrays.push(byteCharacters.charCodeAt(offset));
  }

  // Tạo đối tượng Blob từ mảng byte và kiểu MIME
  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], { type: mimeType });
}
