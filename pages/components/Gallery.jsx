import React from "react";
import { data } from "./mockData";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Gallery() {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="relative flex items-center justify-center bg-orange-100 px-100">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className=" w-3/4 h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide bg-orange-100"
        >
          {data.map((item) => (
            <img
              className="w-[300px] inline-block p-7 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-full"
              src={item.img}
              alt="/"
              key={item.id}
            />
          ))}
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </>
  );
}
