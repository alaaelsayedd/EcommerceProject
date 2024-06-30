import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

function Brands() {
  const [brands, setBrands] = useState(undefined);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    (async function getAllBransds() {
      setIsloading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
      setIsloading(false);
    });
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  md:gap-3 lg:gap-4 my-5   ">
          {brands?.map((brand) => {
            return (
              <div className=" border-2  hover:shadow-md hover:shadow-green-500 transition-all duration-300  ">
                <div className="imge">
                  <img src={brand.image} alt="" className="w-full   " />
                </div>
                <div className="title text-center  text-gray-950 text-xl  mt-3 p-5 ">
                  <p>{brand.name}</p>
                </div>
              </div>
            );
          })||<div className="p-5 mb-64 "> <p className="font-bold text-2xl">No Brands Found </p></div>}
        </div>
      )}
    </>
  );
}

export default Brands;
