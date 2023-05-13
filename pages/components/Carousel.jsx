import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Carousel({ children: users }) {
  console.log(users);
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? users.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === users.length - 1 ? 0 : curr + 1));

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500 "
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {users}
      </div>
      <div className="absolute inset-0 flex items-center justify-between">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white opacity-80 text-gray-800 hover:bg-white "
        >
          <MdChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white opacity-80 text-gray-800 hover:bg-white"
        >
          <MdChevronRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {users.map((_, i) => (
            <div
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                curr === i ? "p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
