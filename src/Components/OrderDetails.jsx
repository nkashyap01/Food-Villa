import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OrderDetailCard from "./OrderDetailCard";

const OrderDetails = () => {
  const cartItems = useSelector((store) => store.item.cartItems);

  const navigate = useNavigate();

  const theme = useSelector((store) => store.item.theme);

  useEffect(() => {
    if (!sessionStorage.getItem("isLogin")) {
      navigate("/");
    }
  }, []);

  return (
    <div
      className={`flex min-h-[90vh] justify-center ${
        theme ? "bg-black" : "bg-white"
      }`}
    >
      <div className=" text-white w-6/12">
        {cartItems.map((item) => {
          return <OrderDetailCard item={item} />;
        })}
        <div className="flex items-center justify-center">
          <Link to="/body">
            <button className="bg-[#B22126] px-2 py-1 rounded-sm text-white hover:bg-[#7d292c] duration-200 shadow-lg ">
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
