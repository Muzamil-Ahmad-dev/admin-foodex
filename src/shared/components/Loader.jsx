 import React from "react";

const Loader = ({ fullScreen }) => {
  return (
    <div
      className={`flex items-center justify-center bg-[#2D1B0E] text-amber-400 ${
        fullScreen ? "fixed inset-0" : "w-full h-full"
      }`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-400 border-solid border-t-transparent"></div>
    </div>
  );
};

export default Loader;
