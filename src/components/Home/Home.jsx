import { useNavigate } from "react-router-dom";
import Products from "../Products/Products";
import Slide from "../Slider/Slider";
import HomeSlider from "../HomeSlider/HomeSlider";



function Home() {

    
   
    return (  
        <><div>
            <HomeSlider/>
            <Products/>
            </div></>
    );
}

export default Home;