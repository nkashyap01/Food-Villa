import React, { useEffect } from "react";
import deliveryBoy from "../Images/delivery-boy.gif";
import { FaHandsPraying } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FcOk } from "react-icons/fc";
import { FaQuoteLeft } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa6";

const OrderSuccess = () => {
  const theme = useSelector((store) => store.item.theme);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isLogin")) {
      navigate("/");
    }
  }, []);

  return (
    <div
      className={`flex justify-center items-center h-[90vh] ${
        theme ? "bg-black" : "bg-white"
      }`}
    >
      <div
        className={`order-success -mt-4 p-8 flex flex-col items-center w-6/12 h-8/12 ${
          theme ? "text-white" : "text-[#373737]"
        }`}
      >
        <img className="h-52 -mt-8" src={deliveryBoy} alt="delivery boy" />

        <p className=" text-xl mt-4 flex gap-2 items-center justify-center">
          You order has been placed successfully !{" "}
          <FcOk className="inline -mt-[2px] -ml-[2px]" />
        </p>
        <p className=" mt-2">
          Thank you for ordering !{" "}
          <FaHandsPraying className="inline -mt-1 ml-[2px] text-[#F7C19B]" />
        </p>
        <p className="text-xl font-bold mt-2">
          <FaQuoteLeft className="inline -mt-4" /> Nothing brings People
          together like good food! <FaQuoteRight className="inline mt-2" />
        </p>
        <p className=" text-xs text-center mt-4">
          Our mission is to connect people around good food. We feed employee’s
          hunger and nurture a sense of community within the company. A changing
          workplace needs a new type of food and spaces tailored to bringing
          people together. Our food keeps people productive, inspired and
          healthy.
        </p>
        <div className="mt-4 flex justify-between gap-10">
          <Link to="/cart/ordersuccess/orderdetails">
            <button className="bg-green-500 px-2 py-1 rounded-sm text-white hover:bg-green-600 duration-200 shadow-lg">
              View Order Details
            </button>
          </Link>
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

export default OrderSuccess;
