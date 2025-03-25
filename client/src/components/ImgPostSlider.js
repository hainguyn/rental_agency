import React, { memo } from "react";
import Slider from "react-slick";

const ImgPostSlider = ({ images }) => {
  const settings = {
    dots: false,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        {images?.length > 0 &&
          images?.map((items, index) => {
            return (
              <div
                key={index}
                className=" bg-black flex justify-center h-[500px]"
              >
                <img
                  className=" h-full object-contain m-auto"
                  alt="slider"
                  src={items}
                ></img>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default memo(ImgPostSlider);
