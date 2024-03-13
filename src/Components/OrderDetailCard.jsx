import { IMG_CDN_URL } from "../constants";
import { FaRupeeSign } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import { useSelector } from "react-redux";

const OrderDetailCard = ({ item }) => {
  const theme = useSelector((store) => store.item.theme);

  return (
    <div className="flex items-center justify-between pr-3 bg-light-mode-shadow m-4 p-2 min-h-32">
      {item.card.info.imageId ? (
        <img
          className="h-28 bg-light-mode-shadow"
          src={IMG_CDN_URL + item.card.info.imageId}
        />
      ) : (
        <div
          className={`h-28  w-44 ${theme ? "bg-[#6c6969]" : "bg-[#E8E6E7]"}`}
        ></div>
      )}
      <p className="font-bold text-orange-400  ">{item.card.info.name}</p>
      <div className=" text-green-600 text-xl">
        {" "}
        <FaRupeeSign className="inline text-xl -mt-[3px] " />
        {parseInt(
          item.card.info.price
            ? item.card.info.price / 100
            : item.card.info.defaultPrice / 100
        )}
      </div>
      <div className="flex gap-2 items-center">
        <p>Order placed</p>
        <FcOk className="inline -mt-[2px] -ml-[2px]" />
      </div>
    </div>
  );
};

export default OrderDetailCard;
