import axios from 'axios';
import React from 'react';
import { BaseUrl } from '../../utils/baseUrl';
import { useQuery } from 'react-query';
import jwt_decode from "jwt-decode";
import { BallTriangle } from 'react-loader-spinner';


export default function Order() {

  let user = jwt_decode(localStorage.getItem('token'))
  function getuserOrder() {
    return axios.get(`${BaseUrl}/orders/user/${user.id}`)
  }

  let { data, isLoading } = useQuery('order', getuserOrder)


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
    </div> : <div className="container">
      <h5 className='h1'>order confirmation</h5>
      <div className='circle d-flex align-items-center justify-content-center m-auto'><i className="fa-solid fa-check"></i></div>
      {data?.data.map(order => <div key={order._id} className='my-5'>

        <table className="table table-striped">
          <thead>
          <tr>
            <td>product</td>
            <td>count</td>
            <td>price</td>
          </tr>
          </thead>
      
          <tbody>
            {order.cartItems.map(item => <tr key={item._id}>
              <td>{item.product.title.split(' ').slice(0, 3).join(' ')}</td>
              <td>{item.count}</td>
              <td>{item.price}</td>
            </tr>)}
          </tbody>
        </table>

        <div className='bg-main-light p-3 rounded'>
          <div> <span className='text-main my-1 fw-bold'>payment method:</span>  {order.paymentMethodType}</div>
          <div> <span className='text-main my-1 fw-bold'>totalOrderPrice:</span>{order.totalOrderPrice}</div>

          <div> <span className='text-main my-1 fw-bold'>shippingAddress:</span>
            <div>details: {order.shippingAddress?.details}</div>
            <div>details: {order.shippingAddress?.city}</div>
            <div>details: {order.shippingAddress?.phone}</div>
          </div>

          <div> <span className='text-main my-1 fw-bold'>order date: </span>{order.createdAt.split('T')[0]}</div>

        </div>
        <hr />
      </div>)}
    </div>}

  </>
}
