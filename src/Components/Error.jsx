import ErrorImage from "../Images/404 Error.jpg";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="text-white text-center flex items-center justify-center h-[90vh]">
      <div className="w-6/12 flex flex-col justify-center items-center">
        <img className="h-60" src={ErrorImage} alt="" />
        <h1>Sorry, but your searched restaurant is not listed in our list..</h1>
        <h3 className="">{err.data}</h3>
        <h3 className="">
          <Link to="/body">
            <button className="bg-[#B22126] px-2 py-1 rounded-sm text-white hover:bg-[#7d292c] duration-200 shadow-lg mt-2">
              Go to Homepage
            </button>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Error;
