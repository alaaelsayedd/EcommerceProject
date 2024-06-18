import { Link } from "react-router-dom";

function Category({ category }) {
    


  return (

    <>
    
      
        <div className="imge ">
          <img src={category.image} alt=""  className="w-full h-96 object-cover"/>
        </div>
        <div className="head p-3">
            <h4 className="text-green-500 text-center text-2xl">{category.name}</h4>
        </div>

     
     
    </>
  );
}

export default Category;
