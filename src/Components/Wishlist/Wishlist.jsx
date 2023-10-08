import React, { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../../context/wishlist.context';
import { useQuery } from 'react-query';
import { cartContext } from '../../context/cart.context';
import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner';


export default function Wishlist() {
  const { getWishlist, deleteWishlist } = useContext(wishlistContext)
  let { addToCart, setNumOfCartItems } = useContext(cartContext)
  const [wishlist, setWishlist] = useState(null)
  const [isLoading, setloading] = useState(false)

  async function getUserWishlist() {
    setloading(true)
    const { data } = await getWishlist()
    data && setWishlist(data)
    setloading(false)
  }

  useEffect(() => {
    getUserWishlist()
  }, [])

  async function addProduct(id) {
    let res = await addToCart(id)
    if (res.data?.status === 'success') {
      toast.success(`${res.data?.message}`, { position: 'top-right' })
      setNumOfCartItems(res.data?.numOfCartItems)
    }
    else {
      toast.error(`something happened error please try again`, { position: 'top-right' })
    }
  }

  async function removeWishlist(productId) {
    setloading(true)
    let { data } = await deleteWishlist(productId)
    if (data?.status == 'success') {
      toast.success(`${data?.message}`, { position: 'top-right' })
    }
    else {
      toast.error(`something happened error please try again`, { position: 'top-right' })
    }
    setloading(false)
  }

  return <>
    {wishlist?.data?.length === 0 ? <div className="container bg-main-light rounded p-5 my-5 h1">Add wishlist</div> :
      <>
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
        </div> :
          <div className="container bg-main-light rounded p-5 my-5">

            {wishlist?.data.map(product =>
              <div key={product.id} className="row m-4 ">
                <div className="col-md-2">
                  <img src={product.imageCover} className='w-100 rounded' alt={product.title} />
                </div>
                <div className="col-md-10 p-5">
                  <h3 className='h6 text-main'>{product.title}</h3>
                  <p>{product.description}</p>
                  <button onClick={() => addProduct(product.id)} className='btn bg-main my-2 w-100'>add to cart</button>
                  <button onClick={() => removeWishlist(product.id)} className='btn bg-danger my-2 w-100'>remove from wishlist</button>
                </div>

              </div>

            )}
          </div>}
      </>}

  </>
}
