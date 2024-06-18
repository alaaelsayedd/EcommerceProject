import { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

function AuthProtectedRoute({children}) {
    const {islogin} = useContext(authContext);
    
    return ( 
        <>
       
     {!islogin?children: <Navigate to={'/'}/> }
        
        </>
     );
}

export default AuthProtectedRoute;
