import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export let ContContext = createContext(0);
 

 function CartCountProvider({children}) {
    const [count,setCount]=useState(undefined);
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
          // console.log(data);
          setCount(data.numOfCartItems);
        } catch (error) {
          setCount(0);
        }
      }
  useEffect(()=>{
    getUserCart();
  },[])
    return (  
        <ContContext.Provider value={{count ,setCount}} >
            {children}
        </ContContext.Provider>
    );
 }
 
 export default CartCountProvider;