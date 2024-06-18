import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { ContContext } from "../../Context/CountCartItem";
import { Bounce, toast } from "react-toastify";

function Wishlist() {
  const [isLoadingToCart, setIsLoadingToCart] = useState(false);
  const [wishListData, setWishListData] = useState(undefined);
  const [indexOfClickedButton,setIndex] =useState(undefined);
  const [isloading, setIsloading] = useState(false);
  const { setCount } = useContext(ContContext);
  async function getUserWishList() {
    try {
      setIsloading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setWishListData(data);
      setIsloading(false);

    } catch (error) {
      setIsloading(false);
    }
  }
  async function deletItemFormWishList(id) {
    setIsloading(true);
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + id,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    getUserWishList();
  }
  async function addToCart(productId,index) {
    setIndex(index);
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
    deletItemFormWishList(productId);
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
  useEffect(() => {
    getUserWishList();
  }, []);
  return (
    <>
      <>
        <div className="min-h-72">
          {isloading && <Loading />}
          {!isloading && wishListData != undefined && (
            <div className=" bg-gray-100  p-9 mt-5 rounded">
              <div className="head">
                <div className="flex justify-between">
                  <h1 className="text-4xl "> My WishList</h1>
                </div>
              </div>
              <div className="main">
                {wishListData.data.map((product, index) => {
                  return (
                    <div
                      className=" grid md:grid-cols-4 p-2 my-5 border-b  grid-cols-2  "
                      key={index}
                    >
                      <div className=" w-full col-span-2 md:col-span-1">
                        <img
                          src={product.imageCover}
                          alt=""
                          className="w-full h-60 object-cover"
                        />
                      </div>
                      <div className="content p-5 col-span-2 my-6">
                        <p className="text-gray-900 text-2xl ">
                          {product.title}
                        </p>
                        <p className="my-3 text-gray-900 text-lg ">
                          Price: <span>{product.price}</span> EGp
                        </p>
                        <div
                          className="my-2 text-red-600  text-lg cursor-pointer "
                          onClick={() => deletItemFormWishList(product.id)}
                        >
                          <i className="fa-solid fa-trash-can inline-block me-2"></i>{" "}
                          Remove
                        </div>
                      </div>
                      <div className="my-6 flex justify-end items-center text-lg col-span-2 md:col-span-1">
                        <button
                          className="inline-block border border-green-500 text-green-500 p-2 rounded me-2  w-full hover:bg-green-500 hover:text-white transition-all duration-200  "
                          onClick={() => addToCart(product.id,index)}
                          disabled={isLoadingToCart}
                        >
                          {isLoadingToCart && index==indexOfClickedButton ? (
                            <span>
                              <i className="fas fa-spinner fa-spin text-lg inline-block text-center"></i>
                            </span>
                          ) : (
                            <span> Add To cart</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}

export default Wishlist;
