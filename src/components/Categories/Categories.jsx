import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Category from "../Category/Category";
import SubCategory from "../Category/SubCategory";

function Categories() {
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [categoryHead, setCategoryHead] = useState(null);
  const [isloading, setIsloading] = useState(false);
  async function getAllCategories() {
    setIsloading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    // console.log(data.data);
    setCategories(data.data);
    setIsloading(false);
  }
  async function getSubCategory(id ,head) {
    setIsloading(true);
    setCategoryHead(head);

    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    // console.log(data.data);
    setSubCategories(data.data)
    setIsloading(false);
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <>
        <div className="grid md:grid-cols-3 md:gap-3 grid-cols-1 gap-y-2 mt-5 ">
          {categories?.map((category, index) => {
            return (
              <div
                className="border hover:shadow-md hover:shadow-green-500 transition-all duration-300 rounded  cursor-pointer"
                onClick={ () =>  getSubCategory(category._id,category.name)}
              >
                <Category key={index} category={category} />
              </div>
            );
          })}
        </div>
        
        {categoryHead&&<h4 className="text-center text-green-500 text-2xl my-4">{categoryHead}</h4>}
        <div className="grid  lg:grid-cols-6 lg:gap-6   md:grid-cols-4 md:gap-4  grid-cols-2 gap-2">
        {subCategories?.map((data,index)=>{
            return <SubCategory key={index} data={data}/>
        })}
        </div>
        </>
      )}
    </>
  );
}

export default Categories;
