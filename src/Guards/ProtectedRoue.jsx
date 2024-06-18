import { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../components/Login/Login";

function ProtectedRoue({children}) {
  const {islogin} = useContext(authContext)
  


    return ( 
        <>
        {islogin? children: <Login/>}
       
        </>
     );
}

export default ProtectedRoue;