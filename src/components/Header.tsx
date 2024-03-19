import React from "react";

const Header = ({ User }) => {
  return (
    <div>
      <div className="conatiner flex items-center justify-between pt-[20px]">
        <p className="text-[#535353] text-[40px]">Overview</p>

        <div className="flex items-center justify-end gap-3">
          <p className="font-bold">{User}</p>
          <img src="menu.svg" alt="" />
          <img src="44.svg" alt="" />
          <img src="men.svg" alt="" className="w-[50px]" />
        </div>
      </div>
    </div>
  );
};

export default Header;
