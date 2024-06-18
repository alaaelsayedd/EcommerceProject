import axios from "axios";
import {  useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { ContContext } from "../../Context/CountCartItem";
import { Link } from "react-router-dom";


function Cart() {
  const [cartData, setCartData] = useState(undefined);
  const [isloading, setIsloading] = useState(false);
  const {setCount} =useContext(ContContext);
  
 
  async function getUserCart() {
    try {
      setIsloading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCartData(data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
    }
  }
  async function deletItemFormCart(id) {
    setIsloading(true);
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + id,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCount(data.numOfCartItems)
    setCartData(data);
    setIsloading(false);
  }
  async function clearCartData() {
    setIsloading(true);
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCount(0)

    setCartData(undefined);
    setIsloading(false);
  }
   async function updateCount(id , newCount)
  {
   
    if(newCount==0)
        {
            deletItemFormCart(id);
        }
        else
        {
            setIsloading(true)
            const {data}= await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + id,{"count":newCount},{
                headers: {
                    token: localStorage.getItem("token"),
                  },
            })
            setCartData(data)
            setIsloading(false);
        }
   
   
   
    
  }
  useEffect(() => {
    getUserCart();
  }, []);
  return (
    <>
    <div className="min-h-72">
      {isloading && <Loading />}
      {!isloading && cartData != undefined && (
        <div className=" bg-gray-100  p-9 mt-5 rounded">
          <div className="head">
            <div className="flex justify-between">
              <h1 className="text-4xl ">Cart Shop</h1>
              <Link className=" border border-green-500 text-green-500   p-2 rounded text-center" to={`/checkout/${cartData.data._id}`}>
                CheckOut
              </Link>
            </div>
            <div className="price flex justify-between my-5">
              <p className="text-gray-900 font-bold">
                Total Price :{" "}
                <span className="text-green-500">
                  {" "}
                  {cartData.data.totalCartPrice}
                </span>{" "}
              </p>
              <p className="text-gray-900 font-bold me-4">
                {" "}
                Total Cart Item :{" "}
                <span className="text-green-500">
                  {" "}
                  {cartData.numOfCartItems}
                </span>
              </p>
            </div>
          </div>
          <div className="main">
            {cartData.data.products.map((product, index) => {
              return (
                <div
                  className=" grid md:grid-cols-4  grid-cols-2 p-2 my-5 border-b "
                  key={index}
                >
                  <div className=" w-full col-span-2 md:col-span-1">
                    <img
                      src={product.product.imageCover}
                      alt=""
                      className="w-full h-60 object-cover"
                    />
                  </div>
                  <div className="content p-5 col-span-1 my-6 md:col-span-2 ">
                    <p className="text-gray-900 text-2xl ">
                      {product.product.title}
                    </p>
                    <p className="my-3 text-gray-900 text-lg ">
                      Price: <span>{product.price}</span> EGp
                    </p>
                    <div
                      className="my-2 text-red-600  text-lg cursor-pointer "
                      onClick={() => deletItemFormCart(product.product.id)}
                    >
                      <i className="fa-solid fa-trash-can inline-block me-2"></i>{" "}
                      Remove
                    </div>
                  </div>
                  <div className="my-6 flex justify-end items-center text-lg col-span-1">
                    <button className="inline-block border border-green-500 text-green-500 p-2 rounded me-2   " onClick={()=>updateCount(product.product.id ,product.count+1 )}>
                      +
                    </button>
                    <span className="me-2">{product.count}</span>
                    <button className="inline-block border border-green-500 text-green-500 p-2 rounded me-2   " onClick={()=>updateCount(product.product.id ,product.count-1 )}>
                      -
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-center my-2 ">
              <button
                className=" border border-green-500 text-green-500 hover:bg-green-500  hover:text-white transition-all duration-200   px-5 py-2 text-xl  rounded text-center"
                onClick={clearCartData}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {!isloading && cartData == undefined && (
        <div className=" bg-gray-100  p-9 mt-5 rounded">
          <div className="head">
            <div className="">
              <h1 className="text-4xl my-5 ">Cart Shop</h1>
              <h1 className="text-gray-900 text-4xl  ">
                No product in Your Cart
              </h1>
            </div>
          </div>
        </div>
      )}
        </div>

    </>
  );
}

export default Cart;
