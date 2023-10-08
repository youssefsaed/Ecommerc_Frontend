import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BaseUrl } from '../../utils/baseUrl';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { cartContext } from '../../context/cart.context';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../context/wishlist.context';


export default function Products() {
  let { addToCart, setNumOfCartItems } = useContext(cartContext)
  let { addWishlist } = useContext(wishlistContext)

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

  function getProducts() {
    return axios.get(`${BaseUrl}/products`)
  }
  let { data, isLoading } = useQuery('products', getProducts)

  async function wishlist(productId) {
    const res = await addWishlist(productId)
    if (res?.data?.status === 'success') {
      toast.success(`${res.data?.message}`, { position: 'top-right', duration: 2000 })
    }
    else {
      toast.error(`something happened error please try again`, { position: 'top-right' })
    }
  }




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
    </div> :
      <div className="row m-auto my-4">

        {data?.data.data.map((product) =>

          <div key={product._id} className="col-md-2 g-4">

            <div className="product p-2">
              <i onClick={() => wishlist(product.id)} className="fa-solid fa-heart wishlist-icon text-main cursor-pointer"></i>
              <Link to={`/ProductDetails/${product.id}`}>
                <img className='w-100' src={product.imageCover} alt={product.title} />
                <span className='text-main'>{product.category.name}</span>
                <h3 className='h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className='d-flex justify-content-between'>
                  <div>{product.price} EGP</div>
                  <div><i className="fa-solid fa-star rating-color"></i> {product.ratingsAverage}</div>
                </div>
              </Link>
              <button onClick={() => addProduct(product.id)} className='btn bg-main w-100'>add to cart</button>
            </div>
          </div>
        )}

      </div>
    }

  </>
}
