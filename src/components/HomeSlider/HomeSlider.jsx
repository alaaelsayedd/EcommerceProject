import slide1 from "../../images/slider-image-1.jpeg";
import slide2 from "../../images/slider-image-2.jpeg";
import slide3 from "../../images/slider-image-3.jpeg";
import Slider from "react-slick";

function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
    <>
      <div className="my-5   p-4 md:p-7 md:w-3/4  w-full  mx-auto ">
        <div className="grid grid-cols-2   ">
          <div className="">
            <Slider {...settings}>
              <div>
                <div className="imge1">
                  <img
                    src={slide1}
                    alt=""
                    className=" w-full h-80 object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="imge1">
                  <img
                    src={slide2}
                    alt=""
                    className=" w-full h-80 object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="imge1">
                  <img
                    src={slide3}
                    alt=""
                    className=" w-full h-80 object-cover"
                  />
                </div>
              </div>
              
            
            </Slider>
          </div>
          <div className="h-80">
            <div className="imge1">
              <img src={slide1} alt="" className="w-full h-40 object-cover" />
            </div>
            <div className="imge1">
              <img src={slide2} alt="" className="w-full h-40 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSlider;
