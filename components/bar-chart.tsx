import React from "react";

const BarChart = () => {
  return (
    <div className="w-full mx-auto px-6 py-8 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Student</h2>
      <div className="relative w-full h-80">
        <div className="absolute left-0 right-0 h-full flex flex-col justify-between">
          {[400, 300, 200, 100, 0].map((val, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between text-sm text-gray-400"
            >
              <span>{val}</span>
              <div className="w-full h-px bg-gray-300 ml-4"></div>
            </div>
          ))}
        </div>
        <div className="relative flex lg:justify-start ml-10 md:ml-20 lg:ml-40 lg:gap-10 items-end h-full pt-4">
          <div className="flex flex-col items-center">
            <div className="relative w-12 h-[185px] bg-brand rounded-t-sm transition-all duration-300">
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded">
                289
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></span>
              </div>
            </div>
            <span className="mt-2 text-sm text-[#64748B] line-clamp-1 -mb-[18px]">
              Back End
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-12 h-[115px] bg-brand rounded-t-sm transition-all duration-300">
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded">
                180
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></span>
              </div>
            </div>
            <span className="mt-2 text-sm text-[#64748B] line-clamp-1 -mb-[18px]">
              Front End
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-12 h-[240px] bg-brand rounded-t-sm transition-all duration-300">
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded">
                320
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></span>
              </div>
            </div>
            <span className="mt-2 text-[#64748B] text-sm -mb-[18px] line-clamp-1">
              Quality Assurance
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-12 h-[90px] bg-brand rounded-t-sm transition-all duration-300">
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded">
                120
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></span>
              </div>
            </div>
            <span className="mt-2 text-sm text-[#64748B] line-clamp-1 -mb-[18px]">
              UI/UX
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
