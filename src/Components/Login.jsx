import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import foodbg from "../Images/foodbg2.png";
import { useNavigate } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../Utils/ItemSlice";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

const Signup = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.item.theme);

  const googleAuthProvider = new GoogleAuthProvider();
 

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        dispatch(setLogin(true));

        sessionStorage.setItem("user", user.displayName);

        sessionStorage.setItem("isLogin", "true");

        navigate("/body");
        toast.success("You are logged in with Google.", {
          position: "top-center",
          theme: "dark",
        });
      })
      .catch((error) => {
        toast.error("Failed to logged in with Google.", {
          position: "top-center",
          theme: "dark",
        });
      });
  };

  

  const handleLogin = async () => {
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    if (!emailCheck) {
      toast.error("Email is not valid.", {
        position: "top-center",
        theme: "dark",
      });
    }

    const passwordCheck =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!passwordCheck) {
      toast.error("Password is not valid.", {
        position: "top-center",
        theme: "dark",
      });
    }

    if (emailCheck == true && passwordCheck == true) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          toast.success("You are logged in.", {
            position: "top-center",
            theme: "dark",
          });
          setEmail("");
          setPassword("");
          dispatch(setLogin(true));
          navigate("/body");
          localStorage.setItem("userinfo", email);
          sessionStorage.setItem("isLogin", "true");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(`${errorMessage.slice(17, 42)}`, {
            position: "top-center",
            theme: "dark",
          });
        });
    }
  };

  const handleRegister = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(setLogin(false));
  }, []);

  return (
    <div
      className={`flex justify-center items-center h-[81vh] ${
        theme ? "bg-black" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-center flex-col lg:flex-row">
        <img className="" src={foodbg} alt="" />
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`flex flex-col text-center bg-light-mode-shadow pl-5 p-7 mb-1 test rounded-sm lg:mt-12 ${
            !theme ? "bg-light-mode-shadow" : "bg-dark-mode"
          }`}
        >
          <h1
            className={`font-bold text-xl relative  ${
              theme ? " text-white" : "text-[#373737]"
            }`}
          >
            Login
          </h1>

          <div className="relative">
            <MdMail className=" text-[#B22126] absolute top-3 left-4 z-10 text-xl" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="text-center rounded-sm border-2 p-1 px-4 placeholder-[#1A1A1A] focus:outline-[#B22126] relative mt-1 left-2 mb-2"
              type="email"
              placeholder="Enter your email"
              value={email}
            />
          </div>

          <div className="relative">
            <FaLock className=" text-[#B22126] absolute top-2 left-4 z-10 text-xl" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="text-center rounded-sm border-2 p-1 placeholder-[#1A1A1A] focus:outline-[#B22126] mb-2 px-4 relative left-2"
              type="password"
              placeholder="Enter password"
              value={password}
            />
          </div>

          <button
            onClick={() => {
              handleLogin();
            }}
            className="p-1 rounded-sm bg-[#B22126] relative left-2 text-white font-bold hover:bg-[#e76854] duration-300"
          >
            Login
          </button>

          <div
            onClick={() => handleGoogleAuth()}
            className={`flex py-1 border relative left-2 rounded-sm mt-2 items-center justify-center  ${
              !theme ? "bg-gray-100 text-[#373737]" : "bg-black text-white"
            }`}
          >
            <FcGoogle className="text-xl" />
            <button className="pl-2">Login with Google</button>
          </div>

          

          <p
            className={`font-bold text-sm m-1 mt-2 ${
              theme ? "text-white" : "text-[#373737]"
            }`}
          >
            Don't have an account ?
            <span
              onClick={() => handleRegister()}
              className="text-[#B22126] ml-1 cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
