import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import {  Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductDetails() {
  const { id } = useParams();
  const[isloading,setIsloading]=useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoadingToCart,setIsLoadingToCart] =useState(false)
  async function getProductDetails() {
    setIsloading(true)
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setIsloading(false)
  }
  
  async function addToCart()
  {
    setIsLoadingToCart(true);
    const {data} =  await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
      "productId": id
  },{
    headers:{
      token:localStorage.getItem("token")
    }
  })
  setIsLoadingToCart(false);
  toast.success('Sucessfully add to Cart', {
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
 
  // console.log(data);
}
  useEffect(() => {
    getProductDetails();
  }, []);
  
  return (
    <>
    {isloading?<Loading/>:
    <>
     {productDetails && (
        <div className=" px-4 py-2 rounded  grid-cols-1 mb-2 grid md:grid-cols-3 md:gap-3 items-center ">
          <div className="image">
            <img src={productDetails.imageCover} alt="" className="w-full" />
          </div>
          <div className="content  col-span-2">
            <p className="text-gray-950 text-lg my-2">
              {" "}
              {productDetails.title}
            </p>
            <p className="text-gray-600  my-1">
              {" "}
              {productDetails.description}
            </p>

            <p className="text-green-500  my-2 font-bold">
              {productDetails.category.name}
            </p>

            <div className="price flex  justify-between my-5">
              <p className="text-gray-950 text-lg">
                {" "}
                {productDetails.price} EGp
              </p>
              <div className="rating">
                <i
                  className="fa-solid fa-star inline-block me-1 "
                  style={{ color: "#FFD43B" }}
                ></i>
                <span className="text-lg">{productDetails.ratingsAverage}</span>
              </div>
            </div>
            <div className="btn w-full  mt-2  flex justify-between ">
              <button disabled={isLoadingToCart} className="text-white   bg-green-500 hover:bg-green-600  w-4/5 p-2 rounded" onClick={addToCart}>
              {isLoadingToCart?<span className="text-lg"  ><i className="fas fa-spinner fa-spin"></i></span>:<span> + add to cart</span>} 
           
           </button>
           
  
            </div>
          </div>
        </div>
      )}
</>

    }
     
    </>
  );
}

export default ProductDetails;
