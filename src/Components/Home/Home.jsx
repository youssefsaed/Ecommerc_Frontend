import React, { useContext } from 'react';
import styles from './Home.module.css';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';
import MainSlider from '../MainSlider/MainSlider';
import Brands from '../Brands/Brands';


export default function Home() {

  return <>
    <div className="container-fluid">
      <MainSlider />
      <Categories />
      <Brands />
      <Products />
    </div>

  </>
}
