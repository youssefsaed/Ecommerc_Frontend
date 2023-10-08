import React from 'react';
import Slider from "react-slick";

import slide1 from '../../../src/Assets/images/slider-image-1.jpeg'
import slide2 from '../../../src/Assets/images/slider-image-2.jpeg'
import slide3 from '../../../src/Assets/images/slider-image-3.jpeg'
import bloge1 from '../../../src/Assets/images/blog-img-1.jpeg'
import bloge2 from '../../../src/Assets/images/blog-img-2.jpeg'

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return <>

    <div className="row gx-0 my-4 ">
      <div className="col-md-9 rounded-start overflow-hidden">
        <Slider {...settings}>
          <img height={400} className='w-100' src={slide1} />
          <img height={400} className='w-100' src={slide2} />
          <img height={400} className='w-100' src={slide3} />
        </Slider>
      </div>
      <div className="col-md-3 rounded-end overflow-hidden">
        <img height={200} className='w-100' src={bloge1} />
        <img height={200} className='w-100' src={bloge2} />
      </div>
    </div>
  </>
}
