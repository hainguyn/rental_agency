import React, { useState, useEffect, memo } from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";

const BannerSlider = () => {
  const images = [banner1, banner2, banner3, banner4, banner5]; // Các ảnh của bạn
  const [currentIndex, setCurrentIndex] = useState(0); // Theo dõi ảnh hiện tại

  // Tự động chuyển ảnh mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => {
      clearInterval(interval); // Dọn dẹp khi component bị unmount
    };
  }, [images.length]);

  // Hàm điều khiển chuyển ảnh khi click nút
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="flex flex-col justify-center items-center h-full text-white bg-opacity-50 bg-black">
              <h1 className="text-5xl font-bold mb-4 text-white">
                CHÀO MỪNG BẠN ĐÃ ĐẾN
              </h1>
              <h1 className="text-5xl font-bold mb-4 text-white">
                ESTATE AGENCY
              </h1>
              <p className="text-lg mb-8 text-white">
                Phòng trọ tốt bạn muốn tìm kiếm
              </p>
              <button className="text-white border-2 border-green-400 rounded-md hover:bg-green-400 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out px-4 py-2">
                NGAY ĐÂY!
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className=" absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
      >
        ›
      </button>
    </div>
  );
};

export default memo(BannerSlider);
