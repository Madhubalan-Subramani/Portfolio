import React from "react";

const SocialIcon = ({icon,onclick}) => {
  return (
    <div
      onClick={onclick}
      className="cursor-pointer w-[30px] h-[30px] text-xs text-white rounded-full flex justify-center items-center shadow-[0px_2px_3px_0px_#8749f2] shadow-[#8749f2] hover:shadow-[0px_1px_4px_3px_#8749f2] transition-shadow duration-400">
      {icon}
    </div>
  );
};

export default SocialIcon;
