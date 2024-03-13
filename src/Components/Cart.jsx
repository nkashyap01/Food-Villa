import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ItemListCard from "./ItemListCard";
import { clearCart } from "../Utils/ItemSlice";
import { MdDeleteForever } from "react-icons/md";
import useGetValue from "../Utils/getPriceDetail";
import { useNavigate } from "react-router";
import { FaStripe } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [couponValue, setCouponValue] = useState("");
  const [avail, setAvail] = useState(false);
  const [totalValue, discount, deliveryCharge] = useGetValue();
  const [totalPrice, setTotalPrice] = useState(totalValue);
  const cartItems = useSelector((store) => store.item.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentMessage = () => {
    toast.info("Click on Proceed to payment", {
      position: "top-center",
      theme: "dark",
    });
  };

  const theme = useSelector((store) => store.item.theme);

  const handleClear = () => {
    dispatch(clearCart());
    setTotalPrice(0);
    setAvail(false);
    toast.error("All cart items deleted", {
      position: "top-center",
      theme: "dark",
    });
  };

  const onCouponApply = () => {
    if (couponValue === "SAROJ100" && avail == false) {
      setTotalPrice((prev) => prev - 100);
      setAvail(true);
      setCouponValue("");
    } else {
    }
  };

  useEffect(() => {
    setTotalPrice(totalValue);
    if (!sessionStorage.getItem("isLogin")) {
      navigate("/");
    }
  }, [cartItems]);

  const paymentHandler = async (e) => {
    const response = await fetch("https://foodvilla-8f6g.onrender.com/order", {
      method: "POST",
      body: JSON.stringify({
        amount: parseInt(totalPrice + deliveryCharge - discount) * 100,
        currency: "INR",
        receipt: "qwsaq1",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();

    var options = {
      key: "rzp_test_o3OG8LG9cCAqvZ",
      amount: parseInt(totalPrice + deliveryCharge - discount) * 100,
      currency: "INR",
      name: "Food Villa",
      description: "Razorpay payment gateway",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "https://foodvilla-8f6g.onrender.com/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();

        navigate("/cart/ordersuccess");
      },
      prefill: {
        name: "Saroj Kumar",
        email: "saroj@gmail.com",
        contact: "8638316090",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <div
      className={`flex items-center justify-center flex-col ${
        theme ? "bg-black" : "bg-white"
      } `}
    >
      <div
        className={`flex flex-col items-center justify-center w-8/12  mt-2  ${
          theme ? "border-b-2" : "border-b-2 border-[#373737]"
        }`}
      >
        <IoCartSharp className="text-3xl text-[#B22126]" />
        <h3 className={`font-bold ${theme ? "text-white" : "text-[#373737]"}`}>
          My Cart Items
        </h3>
        <div className={`flex w-full pb-2 justify-around `}>
          <h3
            className={`font-bold ${theme ? "text-white" : "text-[#373737]"}`}
          >
            Total <span className="text-[#B22126]">{cartItems.length}</span>{" "}
            Items
          </h3>
          <button
            onClick={handleClear}
            className="bg-red-600 duration-200 px-2 py-[1px] rounded-sm bg-light-mode-shadow hover:bg-red-700 text-white"
          >
            clear cart <MdDeleteForever className="inline -mt-[1px]" />
          </button>
        </div>
      </div>
      <div className="min-h-screen flex mt-4 w-full justify-center ">
        <div className=" flex flex-col w-7/12 relative -left-36">
          {cartItems.map((item) => {
            return <ItemListCard item={item} />;
          })}
        </div>
        {cartItems.length != 0 && (
          <div
            className={`w-[21rem]  p-2 h-[65vh]  fixed right-24 top-44 rounded-sm ${
              theme ? "bg-dark-mode" : " bg-light-mode-shadow"
            }`}
          >
            <h3
              className={`text-center text-lg font-bold pb-2 ${
                theme
                  ? "text-white border-b-2"
                  : "text-[#373737] border-b-2 border-[#373737]"
              }`}
            >
              Price Details
            </h3>
            <div className="flex flex-col justify-center">
              <div className=" flex justify-center flex-col text-center">
                <ul className="flex mt-4 ">
                  <li
                    className={`w-6/12 ${
                      theme ? "text-white" : "text-[#373737]"
                    }`}
                  >
                    Total 3 items
                  </li>
                  <li
                    className={`w-6/12 ${
                      theme ? "text-white" : "text-[#373737]"
                    }`}
                  >
                    {" "}
                    <FaRupeeSign className="inline text-sm -mt-[2px]" />
                    {totalValue}
                  </li>
                </ul>
                <ul className="flex mt-4">
                  <li
                    className={`w-6/12 ${
                      theme ? "text-white" : "text-[#373737]"
                    }`}
                  >
                    Discount
                  </li>
                  <li
                    className={`w-6/12 ${
                      theme ? "text-white" : "text-[#373737]"
                    }`}
                  >
                    {" "}
                    <FaRupeeSign className="inline text-sm -mt-[2px]" />
                    {parseInt(discount)}
                  </li>
                </ul>
                <ul className="flex mt-4">
                  <li
                    className={`w-6/12 ${
                      theme ? "text-white" : "text-[#373737]"
                    }`}
                  >
                    Delivery charges
                  </li>
                  <li
                    className={`w-6/12 ${
                      theme ? "text-white" : "text-[#373737]"
                    }`}
                  >
                    {" "}
                    <FaRupeeSign className="inline text-sm -mt-[2px]" />
                    {parseInt(deliveryCharge)}
                  </li>
                </ul>
                <ul className="flex mt-4">
                  <li
                    className={`w-6/12 font-bold text-lg ${
                      theme ? "text-white" : "text-[#373737]"
                    }`}
                  >
                    Total Amount
                  </li>
                  <li className="w-6/12 text-xl font-bold text-green-600">
                    {" "}
                    <FaRupeeSign className="inline text-sm -mt-[2px]" />
                    {parseInt(totalPrice + deliveryCharge - discount)}
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-center">
                <div>
                  <input
                    onChange={(e) => {
                      setCouponValue(e.target.value);
                    }}
                    value={couponValue}
                    type="text"
                    className="text-center w-40 border-2 p-1 focus:outline-none mt-2"
                    placeholder="SAROJ100"
                  />
                  <button
                    onClick={() => onCouponApply()}
                    className={`w-16 px-2 py-[5px] bg-[#B22126] text-white`}
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={(e) => paymentHandler(e)}
                  className="bg-green-500 py-2 w-10/12 mt-2 text-white rounded-sm bg-light-mode-shadow hover:bg-green-600 duration-200"
                >
                  Proceed to payment
                </button>
              </div>
              <div className="mt-2">
                <div
                  className={`m-1 font-bold text-center mt-2 ${
                    theme ? "text-white" : "text-[B373737]"
                  }`}
                >
                  Accepted payment{" "}
                </div>
                <div className="flex justify-around items-center mt-4 ">
                  <button
                    onClick={() => paymentMessage()}
                    className="bg-[#6772E5] text-white px-2 h-7 rounded-sm flex items-center justify-center"
                  >
                    <FaStripe className="text-5xl" />
                  </button>
                  <button
                    onClick={() => paymentMessage()}
                    className="bg-[#00AFF0] text-white px-2 h-7 rounded-sm flex items-center justify-center"
                  >
                    <SiPaytm className="text-5xl" />
                  </button>
                  <button
                    onClick={() => paymentMessage()}
                    className="bg-[#006FFF] text-white px-2 h-7 rounded-sm flex items-center justify-center"
                  >
                    <FaGooglePay className="text-5xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
