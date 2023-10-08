import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { cartContext } from '../../context/cart.context';
import { Link, useNavigate } from 'react-router-dom';
import { orderContext } from '../../context/order.context';


export default function Address() {

  let { onlinePayment, getCartId } = useContext(cartContext)
  const { creatCashOrder } = useContext(orderContext)
  const[loading,isLoading]=useState(false)
const navigate=useNavigate()
/////////////////////////////////////////////online payment
  async function cardOrder() {
    const details=document.querySelector('#details')
    const phone=document.querySelector('#phone')
    const city=document.querySelector('#city')
    let cartId = await getCartId()
    let values={
      "details": details?.value,
      "phone": phone?.value,
      "city": city?.value
      }
    let res = await onlinePayment(cartId, 'http://localhost:3000', values)
    window.location.href = res?.data?.session?.url
  }
///////////////////////////////////////////cash payment
  async function cashOrder() {
    isLoading(true)
    const details=document.querySelector('#details')
    const phone=document.querySelector('#phone')
    const city=document.querySelector('#city')
    let cartId = await getCartId()
    let values={
      "details": details?.value,
      "phone": phone?.value,
      "city": city?.value
      }
      await creatCashOrder(cartId,values)
      navigate('/allorders')
      isLoading(false)

   }

  return <>
    <div className="container bg-main-light mt-5 p-5 rounded">
      <div className="row">
        <form >
          <input id='details' placeholder='details' name='details'  type="text" className='form-control my-2' />
          <input id='phone' placeholder='phone' name='phone'  type="tel" className='form-control my-2' />
          <input id='city' placeholder='city' name='city'  type="text" className='form-control my-2' />
        </form>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Link onClick={()=>cardOrder()}  className='btn bg-main p-3 my-4 w-100 text-white' >
          {loading?<i className="fa-solid fa-spinner fa-spin"></i>:'payment online'}</Link >
        </div>
        <div className="col-md-6">
          <Link onClick={()=>cashOrder()}  className='btn bg-main p-3 my-4 w-100 text-white' >
            {loading?<i className="fa-solid fa-spinner fa-spin"></i>:'cash'}</Link >
        </div>
      </div>
    </div>
  </>
}
