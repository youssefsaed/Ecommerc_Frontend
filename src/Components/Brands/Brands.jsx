import React from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { BaseUrl } from '../../utils/baseUrl';
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function Brands() {
  function getBrands() {
    return axios.get(`${BaseUrl}/brands`)
  }
  let { data } = useQuery('brands', getBrands)

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
  };
  return <>
    <div className='my-4'>
      {data?.data.data &&
        <Slider {...settings} dots={false} >
          {data?.data.data.map(brand => <img key={brand._id} height={150} src={brand.image} alt={brand.name} />)}
        </Slider>}
    </div>
  </>
}
