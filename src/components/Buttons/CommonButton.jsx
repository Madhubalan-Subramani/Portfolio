import React from "react";

const CommonButton = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#7c3aed] hover:bg-[#5015b4] text-white px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors shadow-sm cursor-pointer hover:scale-[105%] transform w-max"
    >
      {name}
    </button>
  );
};

export default CommonButton;
