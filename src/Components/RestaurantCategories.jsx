import React, { useState } from "react";
import ItemList from "./ItemList";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { useSelector } from "react-redux";

const RestaurantCategories = ({ data }) => {
  const [showItems, setShowItems] = useState(false);
  const [isDown, setIsDown] = useState(true);

  const theme = useSelector((store) => store.item.theme);

  const handleClick = () => {
    setShowItems((prev) => !prev);
    setIsDown((prev) => !prev);
  };

  return (
    <div className="w-7/12 flex flex-col mx-auto" onClick={() => handleClick()}>
      <div
        className={` mx-auto  my-2 w-full  p-4 flex justify-between ${
          theme
            ? "bg-black bg-dark-mode"
            : "bg-white bg-light-mode-shadow"
        }`}
      >
        <span
          className={`font-bold ${theme ? "text-white" : "text-[#373737]"}`}
        >
          {data.title}
          <span className="text-[#B22126] "> {data.itemCards.length}</span>{" "}
          Items
        </span>
        <span
          className={`font-bold ${theme ? "text-white" : "text-[#373737]"}`}
        >
          {isDown ? (
            <BiSolidDownArrow className="inline" />
          ) : (
            <BiSolidUpArrow />
          )}
        </span>
      </div>
      <div>{showItems && <ItemList items={data.itemCards} />}</div>
    </div>
  );
};

export default RestaurantCategories;
