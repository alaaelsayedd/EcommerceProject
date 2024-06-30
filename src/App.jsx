import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Register from "./components/Register/Register";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoue from "./Guards/ProtectedRoue";
import AuthProtectedRoute from "./Guards/AuthProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CartCountProvider from "./Context/CountCartItem";
import Wishlist from "./components/WishList/WishList";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import RestPassword from "./components/ForgetPassword/ResetPassword";
import UpdatePassword from "./components/ForgetPassword/UpdatePassword";
import Checkout from "./components/Checkout/Checkout";
import { QueryClient, QueryClientProvider } from "react-query";
import AllOrders from "./components/AllOrders/AllOrder";
import { Provider } from 'react-redux'
import { Store } from "./Redux/Store";
const queryClient = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {
      path: "/EcommerceProject",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoue>
              <Home />,
            </ProtectedRoue>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtectedRoute>
              {" "}
              <Login />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "resetPassword",
          element: (
            <AuthProtectedRoute>
              {" "}
              <UpdatePassword />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "forgetpassword",
          element: (
            <AuthProtectedRoute>
              {" "}
              <ForgetPassword />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "verfiy-code",
          element: (
            <AuthProtectedRoute>
              {" "}
              <RestPassword />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <AuthProtectedRoute>
              {" "}
              <Register />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoue>
              <Cart />,
            </ProtectedRoue>
          ),
        },
        {
          path: "checkout/:id",
          element: (
            <ProtectedRoue>
              <Checkout />,
            </ProtectedRoue>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoue>
              <Wishlist />,
            </ProtectedRoue>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoue>
              <ProductDetails />,
            </ProtectedRoue>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoue>
              <Categories />,
            </ProtectedRoue>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoue>
              <AllOrders/>,
            </ProtectedRoue>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoue>
              <Brands />,
            </ProtectedRoue>
          ),
        },
      ],
    },
  ]);

  return (

    <>
    <Provider store={Store}>
     <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartCountProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </CartCountProvider>
      </AuthContextProvider>
      </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
