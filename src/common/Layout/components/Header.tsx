import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Header = () => {
  const header = useSelector((state: RootState) => state.header.header);

  return (
    <div className="h-[70px] flex items-center px-4">
      <h1 className="text-dark font-[500] text-xl">{header}</h1>
    </div>
  );
};

export default Header;
