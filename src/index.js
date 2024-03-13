import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Error from "./Components/Error";
import RestaurantMenu from "./Components/RestaurantMenu";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cart from "./Components/Cart";
import { Provider } from "react-redux";
import store from "./Utils/store";
import Contact from "./Components/Contact";
import About from "./Components/About";
import OrderSuccess from "./Components/OrderSuccess";
import Register from "./Components/Register";
import Login from "./Components/Login";
import OrderDetails from "./Components/OrderDetails";

const AppLayout = () => {

  return (
    <React.Fragment>

      <Provider store={store}>
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer autoClose={2000} />
      </Provider>
    </React.Fragment>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/body",
        element: <Body />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart/ordersuccess",
        element: <OrderSuccess />,
      },
      {
        path: "/cart/ordersuccess/orderdetails",
        element: <OrderDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
