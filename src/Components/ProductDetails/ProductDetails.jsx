import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../../utils/baseUrl';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import Slider from "react-slick";
import { cartContext } from '../../context/cart.context';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let param = useParams()
  let { addToCart,setNumOfCartItems } = useContext(cartContext)

  async function addProduct() {
    let res = await addToCart(param.id)

    if (res.data?.status === 'success') {
      toast.success(`${res.data?.message}`, { position: 'top-right' })
      setNumOfCartItems(res.data?.numOfCartItems)
    }
    else {
      toast.error(`something happened error please try again`, { position: 'top-right' })
    }
  }

  function getProductDetails(id) {
    return axios.get(`${BaseUrl}/products/${id}`)
  }

  let { isLoading, data } = useQuery('productDetails', () => getProductDetails(param.id))

  var settings = {

    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };



  return <>
    {isLoading ? <div className='w-100 d-flex justify-content-center align-items-end vh-50'>
      <BallTriangle
        height={80}
        width={100}
        radius={5}
        color="#0aad0a"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div> : <div className="container mt-5">
      <div className="row">
        <div className="col-md-2">
          <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
          <div className="row">
            <Slider {...settings} >
              {data?.data.data.images.map(img =>
                <img key={img} className='w-100' src={img} alt={data?.data.data.title} />
              )}
            </Slider>
          </div>
        </div>
        <div className="col-md-10 p-5 d-flex justify-content-center flex-column">
          <div>
            <h3 className='h5 fw-bolder'>{data?.data.data.title}</h3>
            <p className='px-2'>{data?.data.data.description}</p>
            <div className='fw-bold'>{data?.data.data.category?.name}</div>
            <div className='d-flex justify-content-between'>
              <div>{data?.data.data.price} EGP</div>
              <div><i className="fa-solid fa-star rating-color"></i> {data?.data.data.ratingsAverage}</div>
            </div>
            <button onClick={() => addProduct()} className='w-100 btn mt-3 bg-main'>add cart</button>

          </div>
        </div>
      </div>

    </div>}


  </>
}
