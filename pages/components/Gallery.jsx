import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Image from "next/image";

export default function Gallery(props) {
  console.log(props.props);
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const data = props.data;

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
          className=" w-5/6 h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide bg-orange-100"
        >
          {data.map((item) => (
            <Image
              className="w-[300px] inline-block p-8 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-[35%]"
              width="300"
              height="300"
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
