import { useNavigate } from "react-router-dom";
import Products from "../Products/Products";
import Slide from "../Slider/Slider";
import HomeSlider from "../HomeSlider/HomeSlider";
// import { useDispatch, useSelector } from "react-redux";
// import { decrease, increase } from "../../Redux/CounterSlice";

function Home() {
//   let counter = useSelector((state) => 
//     {
//         return state.counter
// });
// let dispacth = useDispatch()
//   console.log(counter.counter);

  return (
    <>
      <div>
        {/* <div className="p-2 border ">{counter.counter}</div>
        <div className="p-2 border flex  " onClick={()=>dispacth(increase(10))}>+</div>
        <div className="p-2 border flex  "  onClick={()=>dispacth(decrease())}>-</div> */}
        <HomeSlider />
        <Products />
      </div>
    </>
  );
}

export default Home;
