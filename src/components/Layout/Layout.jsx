import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function Layout() {
    return ( <>
    <Navbar/>
    <div className="container w-5/6 mx-auto mt-5 ">
    <Outlet/>
    </div>
    <Footer/>
    </> );
}

export default Layout;