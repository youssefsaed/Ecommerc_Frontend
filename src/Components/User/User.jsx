import React, { useContext } from 'react';
import jwtDecode from 'jwt-decode';
import Order from '../order/order';
import { userContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../../utils/baseUrl';
import { useQuery } from 'react-query';

export default function User() {

  const user = jwtDecode(localStorage.getItem('token'))
  const { setUserToken } = useContext(userContext)
  const navigate = useNavigate()


  function getuserOrder() {
    return axios.get(`${BaseUrl}/orders/user/${user.id}`)
  }

  const { data, isLoading } = useQuery('order', getuserOrder)

  console.log();




  function logOut() {
    localStorage.removeItem('token')
    setUserToken(null)
    navigate('/login')
  }

  return <>
    <div className="container my-5 bg-main-light rounded p-5">
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className='h1 '>Hello <span className='text-main'>{user.name}</span> </h3>
        <div onClick={() => logOut()} className='h2 cursor-pointer text-danger'>log out <i className="fa-solid fa-right-from-bracket"></i> </div>
      </div>
      <div>
        <h3 className='h1 fw-bold my-2'>My Order:</h3>
        {data?.data?.length === 0 ? <div className='h1 p-5'>your not have order</div> : <div className='p-4'>
          <Order />
        </div>}



      </div>
    </div>

  </>
}
