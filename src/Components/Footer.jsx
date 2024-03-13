import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Github_URL } from "../constants";
import { IoIosHeart } from "react-icons/io";
import { FaGithubSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useSelector((store) => store.item.theme);

  return (
    <div
      className={`flex items-center justify-center gap-1 text-[#373737] h-16 text-base font-semibold border-t-2 bg-light-mode-shadow ${
        theme ? "bg-[#0F1518]" : "bg-white border-black"
      }`}
    >
      <div
        className={`flex items-center relative gap-1 ${
          theme ? "text-white" : "text-[#373737]"
        }`}
      >
        <a
          onClick={() => {
            toast.info("Redirecting to github", {
              position: "top-center",
              theme: "dark",
            });
          }}
          href={Github_URL}
        >
          <FaGithubSquare className="text-xl" />
        </a>
        <FaInstagramSquare className="text-xl" />
        <FaLinkedin className="text-xl" />
      </div>
      <h3 className={`${theme ? " text-white" : "text-[#373737]"}`}>
        || Developed by <IoIosHeart className="inline text-red-600" /> Neha
        Kumari
      </h3>
    </div>
  );
};

export default Footer;
