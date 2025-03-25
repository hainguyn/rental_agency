import React, { memo, useState, useEffect } from "react";
import icons from "../ultils/icons";
import { getNumbersPrice, getNumbersArea } from "../ultils/Common/getNumbers";
import { getCodes, getCodesArea } from "../ultils/Common/getCodes";

const { GrLinkPrevious } = icons;
const Modal = ({
  setIsShowModal,
  content,
  name,
  handleSubmit,
  queries,
  arrMinMax,
  defaultText,
}) => {
  const [persent1, setPersent1] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[0]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[0]
      : 0
  );
  const [persent2, setPersent2] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[1]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[1]
      : 100
  );
  const [activedE, setActivedE] = useState("null");

  useEffect(() => {
    const activedTrackEl = document.getElementById("track-active");
    if (activedTrackEl) {
      if (persent2 <= persent1) {
        activedTrackEl.style.left = `${persent2}%`;
        activedTrackEl.style.right = `${100 - persent1}%`;
      } else {
        activedTrackEl.style.left = `${persent1}%`;
        activedTrackEl.style.right = `${100 - persent2}%`;
      }
    }
  }, [persent1, persent2]);

  const handleClickTrack = (e, value) => {
    const trackE1 = document.getElementById("track");
    const trackRect = trackE1.getBoundingClientRect();
    let percent = value
      ? value
      : Math.round(((e.clientX - trackRect.left) * 100) / trackRect.width, 0);
    if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
      setPersent1(percent);
    } else {
      setPersent2(percent);
    }
  };

  const convert100toTarget = (percent) => {
    return name === "price"
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === "area"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
  };

  const convertto100 = (percent) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };

  const handleActive = (code, value) => {
    setActivedE(code);
    let arrMaxMin =
      name === "price" ? getNumbersPrice(value) : getNumbersArea(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setPersent1(0);
        setPersent2(convertto100(1));
      }
      if (arrMaxMin[0] === 20) {
        setPersent1(0);
        setPersent2(convertto100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setPersent1(100);
        setPersent2(100);
      }
    }
    if (arrMaxMin.length === 2) {
      setPersent1(convertto100(arrMaxMin[0]));
      setPersent2(convertto100(arrMaxMin[1]));
    }
  };

  const handleBeforeSubmit = (e) => {
    let min = persent1 <= persent2 ? persent1 : persent2;
    let max = persent1 <= persent2 ? persent2 : persent1;
    let arrMinMax =
      persent1 === persent2 && persent1 === 100
        ? [convert100toTarget(min), 9999]
        : [convert100toTarget(min), convert100toTarget(max)];
    handleSubmit(
      e,
      {
        [`${name}Number`]: arrMinMax,
        [name]: `Từ ${convert100toTarget(min)} ${
          persent1 === persent2 && persent1 === 100
            ? ""
            : ` - ${convert100toTarget(max)}`
        } ${name === "price" ? "triệu" : "m2"} ${
          persent1 === persent2 && persent1 === 100 ? "trở lên" : ""
        }`,
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };

  return (
    <div
      onClick={(e) => {
        setIsShowModal(false);
      }}
      className=" flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-[700px] h-[500px] bg-slate-100 rounded-lg relative"
      >
        <div className=" h-[50px] flex items-center px-4 border-b border-gray-300">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
            className="cursor-pointer"
          >
            <GrLinkPrevious size={30} />
          </span>
        </div>
        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col h-[390px] overflow-y-auto">
            <span className="py-2 flex gap-2 items-center border-b border-gray-300">
              <input
                type="radio"
                id="default"
                name={name}
                value={defaultText || ""}
                checked={!queries[`${name}Code`] ? true : false}
                onChange={(e) =>
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code`]: null,
                  })
                }
              />
              <label htmlFor="default">{defaultText}</label>
            </span>
            {content?.map((item) => {
              return (
                <span
                  key={item.code}
                  className="py-2 flex gap-2 items-center border-b border-gray-300"
                >
                  <input
                    type="radio"
                    id={item.code}
                    name={name}
                    value={item.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    onChange={(e) =>
                      handleSubmit(e, {
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      })
                    }
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
          </div>
        )}
        {(name === "price" || name === "area") && (
          <div className="p-12">
            <div className="flex flex-col items-center justify-center relative">
              <div className="z-30 absolute top-[-48px] font-bold text-lg text-green-400">
                {persent1 === 100 && persent2 === 100
                  ? `Trên ${convert100toTarget(persent1)} ${
                      name === "price" ? "triệu" : "m2"
                    } + `
                  : `Từ ${
                      persent1 <= persent2
                        ? convert100toTarget(persent1)
                        : convert100toTarget(persent2)
                    } - ${
                      persent2 >= persent1
                        ? convert100toTarget(persent2)
                        : convert100toTarget(persent1)
                    } ${name === "price" ? "triệu" : "m2"}`}
              </div>
              <div
                onClick={handleClickTrack}
                id="track"
                className="slider-track h-1 bg-gray-300 rounded-full absolute top-0 bottom-0 w-full"
              ></div>
              <div
                onClick={handleClickTrack}
                id="track-active"
                className="slider-track-active h-[5px] bg-green-400 rounded-full absolute top-0 bottom-0 "
              ></div>
              <input
                type="range"
                max="100"
                min="0"
                step="1"
                value={persent1}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => {
                  setPersent1(+e.target.value);
                  activedE && setActivedE("");
                }}
              />
              <input
                type="range"
                max="100"
                min="0"
                step="1"
                value={persent2}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => {
                  setPersent2(+e.target.value);
                  activedE && setActivedE("");
                }}
              />
              <div className="absolute top-6 left-0 right-0 z-30 flex items-center justify-between">
                <span
                  className="cursor-pointer "
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 0);
                  }}
                >
                  0
                </span>
                <span
                  className="mr-[-12px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 100);
                  }}
                >
                  {name === "price"
                    ? "15 triệu +"
                    : name === "area"
                    ? "Trên 90m2"
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center flex-wrap w-full mt-20">
              {content?.map((item) => {
                return (
                  <button
                    key={item.code}
                    onClick={() => handleActive(item.code, item.value)}
                    className={`px-4 bg-gray-300 cursor-pointer rounded-md ${
                      item.code === activedE ? "bg-green-400 text-white" : ""
                    }`}
                  >
                    {item.value}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {(name === "price" || name === "area") && (
          <button
            type="button"
            className="w-full absolute bottom-0 bg-green-400 text-white py-2 font-medium rounded-b-md "
            onClick={handleBeforeSubmit}
          >
            ÁP DỤNG
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);
