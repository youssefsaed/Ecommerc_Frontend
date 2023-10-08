import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/cart.context';
import { BallTriangle } from 'react-loader-spinner';
import Address from '../address/address';
import { Link } from 'react-router-dom';
import { orderContext } from '../../context/order.context';

export default function Cart() {
  let { getUserCart, deleteProductFromCart, updateQuntityProductFromCart, clearUserCart,setNumOfCartItems } = useContext(cartContext)
  const [cart, setCart] = useState(null)
  async function getCart() {
    let { data } = await getUserCart()
    data && setCart(data)
  }

  async function deleteProduct(id) {
    let { data } = await deleteProductFromCart(id)
    data && setCart(data)
  }
  async function updateQuntity(id, count) {
    let { data } = await updateQuntityProductFromCart(id, count)
    data && setCart(data)
  }
  async function clearCart() {
    await clearUserCart()
    setCart(null)
    setNumOfCartItems(0)
  }
  useEffect(() => {
    getCart()
  }, [])

  return <>
    {!cart ? <div className='h1 p-5 m-5 bg-main-light rounded'>your not have a cart</div> :
      <>
        {cart?.data ? <div className="container bg-main-light mt-3 rounded p-5">
          <div className='d-flex justify-content-between'>
            <h3>shop Cart:</h3>
            <button onClick={() => clearCart()} className='btn btn-danger'>clear cart</button>
          </div>
          <div className='text-main fw-bolder mb-2'>Total Cart Price: <span>{cart.data?.totalCartPrice}</span> </div>

          {cart.data.products.map(product => <div key={product._id} className='row my-2' >

            <div className="col-md-1">
              {<img className='w-100 rounded' src={product.product?.imageCover} alt={product.product?.title} />}
            </div>
            <div className="col-md-11">
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h2 className='h5' >{product.product?.title.split(' ').slice(0, 9).join(' ')}</h2>
                  <div className='text-main fw-bolder'>Price: {product.price}</div>
                  <div onClick={() => deleteProduct(product.product._id)} className='cursor-pointer'><i className="fa-solid fa-trash text-main"></i><span>Remove</span></div>
                </div>
                <div>
                  <button onClick={() => updateQuntity(product.product._id, ++product.count)} className='btn brd-btn px-2 py-2'>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={() => updateQuntity(product.product._id, --product.count)} className='btn brd-btn px-2 py-2'>-</button>
                </div>
              </div>
            </div>
          </div>)
          }

          <div className="row">
            <div className="col-md-12">
              <Link to='/address' className='btn bg-main p-3 my-4 w-100 text-white' >creat order</Link >
            </div>
          </div>

        </div> : <div className='w-100 d-flex justify-content-center align-items-end vh-50'>
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
        </div>}
      </>
    }

  </>
}
