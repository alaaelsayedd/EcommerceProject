import React from "react";
import Slider from "react-slick";

function Slide({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
   
  };
  return (
    <div className="slider-container my-9 ">
      <Slider {...settings}>
        {data?.map((data) => {
          return (
            <div className="p-0 m-0" >
              <img
                src={data.image}
                alt=""
                className="w-full h-72 object-cover"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Slide;
