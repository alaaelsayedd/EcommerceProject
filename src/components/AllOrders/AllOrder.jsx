import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/AuthContext";

function AllOrders() {
   let  {userId}= useContext(authContext);
   const [userOrder,setUserOrders]=useState([])
   console.log(userId)
   async  function getUserAllOrders()
    {
        let {data}   = await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/"+userId)
        setUserOrders(data)
    }
useEffect(()=>{
    getUserAllOrders()
},[])
    return ( 
        <>
       {userOrder?<p className="p-5 min-h-80">Not Order Yet </p>:<p>Your Orders</p>}
       </>
     );
}

export default AllOrders;