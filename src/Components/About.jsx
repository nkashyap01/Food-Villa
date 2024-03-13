import React, { useEffect } from "react";
import boy from "../Images/boy-removebg-preview.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const About = () => {
  const theme = useSelector((store) => store.item.theme);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isLogin")) {
      navigate("/");
    }
  }, []);

  return (
    <div
      className={`min-h-[81vh] flex justify-center items-center ${
        theme ? "bg-black" : "bg-white"
      }`}
    >
      <div className="w-8/12 flex ">
        <div className="w-7/12 text-center flex items-center justify-center -mt-5">
          <div>
            <h3
              className={` font-bold text-xl ${
                theme ? "text-white" : "text-[#373737]"
              }`}
            >
              Hii👋
            </h3>
            <h4
              className={` font-bold text-3xl ${
                theme ? "text-white" : "text-[#373737]"
              }`}
            >
              I'm <span className="font-bold text-[#B22126]">Neha Kumari</span>{" "}
            </h4>
            <h5
              className={` font-bold text-4xl ${
                theme ? "text-white" : "text-[#373737]"
              }`}
            >
              <span className="text-[#178A31]">F</span>
              <span className="text-yellow-500">R</span>
              <span className="text-[#61DBFC]">O</span>
              <span className="text-[#7AB566]">N</span>
              <span className="text-[#178A31]">T</span> 
      {" "}
              <span className="text-[#B22126]">End developer</span>
            </h5>
            <p
              className={`text-base leading-4 mt-2 ${
                theme ? "text-white" : "text-[#373737]"
              }`}
            >
              Hello, I'm Neha Kumari, a Master's in Computer Application student
              from Bihar, currently specializing in Front end development at
              Lovely Professional University. With a passion for coding and
              problem-solving, I bring a strong foundation to develop innovative
              web solutions. Eager to collaborate and contribute to meaningful
              projects.
            </p>
            
            <p
              className={` font-bold mt-1 text-xl ${
                theme ? "text-white" : "text-[#373737]"
              }`}
            >
              Contact <span className="text-[#B22126]">Me : </span>{" "}
              <span className="text-blue-600">nehakashyap1011@gmail.com</span>
            </p>
          </div>
        </div>
        <div className="w-5/12">
          <img src={boy} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
