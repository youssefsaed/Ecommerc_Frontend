import React from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { BaseUrl } from '../../utils/baseUrl';
import { useQuery } from 'react-query';
import Slider from "react-slick";


export default function Categories() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
  };
  function getCategories() {
    return axios.get(`${BaseUrl}/categories`)
  }
  let { data } = useQuery('Categories', getCategories)


  return <>
    <div className='my-4'>
      {data?.data.data &&
        <Slider {...settings} dots={false} >
          {data?.data.data.map(category => <img key={category._id} height={150} src={category.image} alt={category.name} />)}
        </Slider>}


      {data?.data.data && <Slider {...settings} >
        {data?.data.data.map(category => <img height={150} key={category._id} src={category.image} alt={category.name} className='w-100' />)}
      </Slider>}
    </div>



  </>
}
