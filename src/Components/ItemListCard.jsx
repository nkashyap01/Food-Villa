import React from "react";
import { IMG_CDN_URL } from "../constants";
import { FaRupeeSign } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteToCart } from "../Utils/ItemSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemListCard = ({ item }) => {
  const dispatch = useDispatch();

  const theme = useSelector((store) => store.item.theme);

  const handleAddClick = (e) => {
    dispatch(addToCart(item));
    toast.success(`${item.card.info.name} added`, {
      position: "top-center",
      theme: "dark",
    });

    e.stopPropagation();
  };

  const handleDeleteClick = (e) => {
    dispatch(deleteToCart(item));
    toast.error(`${item.card.info.name} deleted`, {
      position: "top-center",
      theme: "dark",
    });

    e.stopPropagation();
  };

  if (!item) return;

  return (
    <div
      key={item.card.info.id}
      className={`p-2 my-2 gap-2 hover:scale-[102%]  duration-300 flex min-h-32 w-full ${
        theme
          ? "bg-black bg-dark-mode"
          : "bg-white bg-light-mode-shadow "
      }`}
    >
      {item.card.info.imageId ? (
        <img
          className="h-28  hover:scale-105 duration-200  "
          src={IMG_CDN_URL + item.card.info.imageId}
        />
      ) : (
        <div
          className={`h-28 bg-light-mode-shadow  w-44 ${
            theme ? "bg-[#6c6969]" : "bg-[#E8E6E7]"
          }`}
        ></div>
      )}

      <div className="w-9/12">
        <div className="flex flex-col">
          <span className="font-bold text-orange-400 ">
            {item.card.info.name}
          </span>
          <span className="text-sm text-green-600">
            {" "}
            <FaRupeeSign className="inline text-sm -mt-[2px] " />
            {parseInt(
              item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100
            )}
          </span>
        </div>
        <p
          className={`text-xs mt-1 ${theme ? "text-white" : "text-[#373737]"}`}
        >
          {item.card.info.description &&
            item.card.info.description.substring(0, 200)}
        </p>
        <div className="flex text-white text-sm gap-2 mt-1">
          <button
            onClick={handleAddClick}
            className="bg-green-600 hover:bg-green-700 duration-200  px-2 py-[1px] rounded-sm bg-light-mode-shadow"
          >
            Add <FaPlusSquare className="inline -mt-[2px]" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-600 duration-200 px-2 py-[1px] rounded-sm bg-light-mode-shadow hover:bg-red-700"
          >
            Delete <FaMinusSquare className="inline -mt-[1px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemListCard;
