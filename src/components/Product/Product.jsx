import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContContext } from "../../Context/CountCartItem";

function Product({ product }) {
  const [isLoadingToCart, setIsLoadingToCart] = useState(false);
  const [isAddToWishList, setIsAddToWishList] = useState(false);
  const [WishList, setWishList] = useState(undefined);
  const { setCount, count } = useContext(ContContext);
  async function addToCart(productId) {
    setIsLoadingToCart(true);
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoadingToCart(false);
    toast.success("Sucessfully add to Cart", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setCount(data.numOfCartItems);
  }
  async function addToWishList() {
    setIsAddToWishList(true);
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId: product.id,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
   
  }
  

  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCount(data.numOfCartItems);
    } catch (error) {
      setCount(0);
    }
  }
  async function getUserWishList() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },

        }
      );
      const ids = data.data.map(item => item.id);
      setWishList(ids);
      // console.log(data.data);
    } catch (error) {
      setIsloading(false);
    }
  }
  useEffect(() => {
    getUserCart();
    getUserWishList();
    WishList?.forEach((element) => {
      if (element === product.id) {
        setIsAddToWishList(true);
      }
    });
  }, [WishList,product.id]);
  return (
    <div className=" p-4   hover:shadow-green-500 shadow-lg  rounded transition-all duration-150">
      <Link to={`productdetails/${product.id}`}>
        <div className="image">
          <img src={product.imageCover} alt="" className="w-full" />
        </div>
        <div className="content">
          <p className="text-green-500 text-lg my-2">{product.category.name}</p>
          <p className="text-gray-950 text-lg my-2">
            {" "}
            {product.title.split(" ").slice(0, 2).join(" ")}
          </p>
          <div className="price flex mt-2 justify-between">
            <p className="text-gray-950 text-lg"> {product.price} EGp</p>
            <div className="rating">
              <i
                className="fa-solid fa-star inline-block me-1 "
                style={{ color: "#FFD43B" }}
              ></i>
              <span className="text-lg">{product.ratingsAverage}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="btn w-full  mt-2  flex justify-between ">
        <button
          disabled={isLoadingToCart}
          className="text-white   bg-green-500 hover:bg-green-600  w-4/5 p-2 rounded text-center"
          onClick={() => addToCart(product.id)}
        >
          {isLoadingToCart ? (
            <span className="text-lg">
              <i className="fas fa-spinner fa-spin"></i>
            </span>
          ) : (
            <span> + add to cart</span>
          )}
        </button>
        <button
          className="inline-block ms-2 text-xl cursor-pointer"
          onClick={addToWishList}
        >
          <i
            className={`fa-solid fa-heart ${
              isAddToWishList ? "text-red-600" : "text-gray-950"
            }`}
          ></i>
        </button>
      </div>
    </div>
  );
}

export default Product;
