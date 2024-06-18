import {  createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

 export const authContext =createContext(false)
 
 
function AuthContextProvider ({children}) {
    const [islogin, setLogin]=useState(false);
    const[userId,setUserId]=useState(undefined)
    
    useEffect(()=>{
        try{
            let data= jwtDecode(localStorage.getItem("token"))
            setUserId(data.id)
            setLogin(true)
        }
        catch(error)
        {
          setLogin(false)
        localStorage.removeItem("token");
          
        }
    window.addEventListener("storage",()=>{
        
        try{
            jwtDecode(localStorage.getItem("token"))
            setLogin(true)
            
        }
        catch(error)
        {
          setLogin(false)
        localStorage.removeItem("token");
          
        }

    })
    },[])
      
    
    return ( 
        <authContext.Provider value={{islogin, setLogin,userId}}>
          {children}
        </authContext.Provider>
     );
}

export default AuthContextProvider ;