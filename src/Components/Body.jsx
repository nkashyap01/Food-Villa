import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { swiggy_api_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { filterData } from "../Utils/Helper";
import useResData from "../Hooks/useResData";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import restaurantImage from "../Images/restaurant.jpg";
import { FaHandsPraying } from "react-icons/fa6";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [allRestaurants, FilterRes] = useResData(swiggy_api_URL);
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((store) => store.item.theme);

  const options = [
    { value: "4", label: "Above 4 star" },
    { value: "4.5", label: "Above 4.5 star" },
    { value: "true", label: "Only veg" },
    { value: "undefined", label: "Only non-veg" },
    { value: "3.0 km", label: "Under 3.0 km" },
    { value: "₹200 for two", label: "₹200 for two" },
    { value: "reset", label: "Reset Filter" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    console.log(selectedOption);

    const filteredData = allRestaurants.filter((res) => {

      console.log(res.info);

      switch (selectedOption.label) {
        case "Only veg":
        case "Only non-veg":
          return String(res.info.veg) === selectedOption.value;
        case "Above 4 star":
        case "Above 4.5 star":
          return res.info.avgRating > selectedOption.value;
        case "Under 3.0 km":
          return res.info.sla.lastMileTravelString < selectedOption.value;
        case "₹200 for two":
          return res.info.costForTwo === selectedOption.value;
        case "FLAT DEAL":
          return (
            res.info.aggregatedDiscountInfoV3.discountTag &&
            res.info.aggregatedDiscountInfoV3.discountTag
          );
      }
    });

    if (selectedOption.value == "reset") {
      setFilteredRestaurants(allRestaurants);
      setSelectedOption("");
      return;
    }

    setFilteredRestaurants(filteredData);
  };

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage(false);
      if (filteredData?.length === 0) {
        setErrorMessage(true);
      }
    } else {
      setErrorMessage(false);
      setFilteredRestaurants(restaurants);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("isLogin")) {
      navigate("/");
    }
  }, []);

  if (!allRestaurants) return <Shimmer />;

  return (
    <div
      className={`min-h-screen  ${
        theme
          ? "bg-black bg-light-mode-shadow"
          : "bg-white bg-light-mode-shadow"
      }`}
    >
      <div className="flex items-center justify-center absolute w-full z-10 top-4 -left-20">
        <input
          type="text"
          className="border-y-2 border-l-2 font-bold border-[#B22126] px-2 py-1 rounded-l-sm w-[20vw] focus:outline-none"
          placeholder={`Hii👋 ${
            sessionStorage.getItem("user") ||
            localStorage.getItem(localStorage.getItem("userinfo"))
          } search here...`}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              searchData(searchText, allRestaurants);
            }
          }}
        />
        <div className="flex gap-1 items-center text-base bg-[#B22126] rounded-sm text-white py-[5.5px] px-1 rounded-r-sm font-bold">
          <button
            onClick={() => {
              searchData(searchText, allRestaurants);
            }}
          >
            Search
          </button>
          <FiSearch className="text-lg" />
        </div>
       <div className="relative right-5 flex items-center">
       <label
          className={`mr-2 ml-10 text-xl ${
            theme ? "text-white" : "text-black"
          }`}
        >
          Filter <span className="text-[#B22126]">by :</span>{" "}
        </label>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          className="min-w-40 border-2 text-center rounded-md bg-black border-[#B22126]"
        />
       </div>
      </div>
      {errorMessage && (
        <div
          className={`flex-col flex justify-center items-center h-[90vh] ${
            theme ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="shadow-md">
            <img className="h-60 rounded-sm" src={restaurantImage} alt="" />
            <p className=" text-center m-2">
              sorry{" "}
              <FaHandsPraying className="inline ml-[2px] text-[#F7C19B] mr-1" />{" "}
              {searchText} restaurant is not in our list.
            </p>
          </div>
        </div>
      )}

      {allRestaurants?.length === 0 && FilterRes?.length === 0 ? (
        <Shimmer />
      ) : (
        <div
          className={`flex flex-wrap gap-2 items-center justify-center pb-12 pt-4 ${
            theme ? "bg-black" : "bg-white"
          }`}
        >
          {(filteredRestaurants === null ? FilterRes : filteredRestaurants).map(
            (restaurant) => {
              return (
                <Link
                  to={"/restaurant/" + restaurant?.info?.id}
                  key={restaurant?.info?.id}
                >
                  <RestaurantCard {...restaurant?.info} />
                </Link>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Body;
