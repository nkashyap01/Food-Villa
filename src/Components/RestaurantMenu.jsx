import { useNavigate, useParams } from "react-router";
import useRestaurantMenu from "../Hooks/useResMenuData";
import RestaurantCategories from "./RestaurantCategories";
import { IMG_CDN_URL } from "../constants";
import { IoMdStar } from "react-icons/io";
import { useSelector } from "react-redux";
import RestaurantMenuShimmer from "./RestaurantMenuShimmer";
import { useEffect } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const theme = useSelector((store) => store.item.theme);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isLogin")) {
      navigate("/");
    }
  }, []);

  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <RestaurantMenuShimmer />;

  console.log(resInfo);

  const { name, cuisines, costForTwoMessage, avgRating, cloudinaryImageId } =
    resInfo.cards[2].card.card.info;

  const categories =
    resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter((c) => {
      return (
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    });

  return (
    <div className={` ${theme ? "bg-black" : "bg-white"}`}>
      <div className="flex flex-col min-h-screen">
        <div
          className={`flex  justify-center items-center text-white ${
            theme ? "border-b-2" : "border-b-2 border-black"
          }`}
        >
          <div className="flex gap-1 items-center ">
            <img
              className="h-48 rounded-sm"
              src={IMG_CDN_URL + cloudinaryImageId}
              alt={name}
            />
            <div className="flex flex-col">
              <h2
                className={`text-2xl font-bold ${
                  theme ? "text-white" : "text-[#373737]"
                }`}
              >
                {name}
              </h2>
              <p className="text-teal-500 font-bold">{cuisines?.join(", ")}</p>
              <div className="flex gap-3 mt-1">
                <div>
                  {avgRating > 4.5 ? (
                    <p className="bg-green-500 text-white px-1 py-[1px] rounded-sm font-bold text-sm">
                      {avgRating}
                      <IoMdStar className="inline -mt-[3px]" />
                    </p>
                  ) : avgRating > 4 ? (
                    <p className="bg-yellow-500 text-white px-1 py-[1px] rounded-sm font-bold text-sm">
                      {avgRating}
                      <IoMdStar className="inline -mt-[3px]" />
                    </p>
                  ) : (
                    <p className="bg-red-500 text-white px-1 py-[1px] rounded-sm font-bold text-sm">
                      {avgRating}
                      <IoMdStar className="inline -mt-[3px]" />
                    </p>
                  )}
                </div>

                <p className="bg-pink-500 text-white px-1 py-[1px] rounded-sm font-bold text-sm">
                  {costForTwoMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {categories.map((category) => {
          return <RestaurantCategories data={category.card.card} />;
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
