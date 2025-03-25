import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { useLocation } from "react-router-dom"; // Sử dụng để theo dõi sự thay đổi route

const { FaArrowUp } = icons;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation(); // Lấy pathname hiện tại

  // Hiển thị nút khi người dùng cuộn xuống
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hàm scroll lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Tự động cuộn lên đầu khi người dùng chuyển sang route khác
  useEffect(() => {
    scrollToTop(); // Cuộn lên đầu mỗi khi pathname thay đổi
  }, [pathname]); // Chạy lại khi đường dẫn thay đổi

  // Lắng nghe sự kiện scroll để hiển thị hoặc ẩn nút cuộn lên
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed flex items-center justify-center bottom-24 right-10 p-2 text-white bg-green-400 object-cover rounded-full w-[55px] h-[55px] cursor-pointer"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default memo(ScrollToTopButton);
