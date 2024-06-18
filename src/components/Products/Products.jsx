import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import Slide from "../Slider/Slider";
import { useQuery } from "react-query";

function Products() {
  const [products, setProducts] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [categories, setCategories] = useState(null);
  let { data, isLoading } = useQuery("products", getAllProducts);
  // console.log(isFetching);

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  async function getAllCategories() {
    setIsloading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    setIsloading(false);
  }

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Slide data={categories} />
          <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-2 md:gap-2  grid-cols-1 ">
            {data.data.data?.map((product, index) => {
              return <Product key={index} product={product} />;
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Products;
