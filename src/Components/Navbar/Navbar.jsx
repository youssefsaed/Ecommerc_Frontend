import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { userContext } from '../../context/user.context';
import { cartContext } from '../../context/cart.context';



export default function Navbar() {

  const { userToken } = useContext(userContext)
  const { NumOfCartItems } = useContext(cartContext)

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">wishlist<i className="fa-solid fa-heart fa-beat mx-1 text-danger"></i></Link>
            </li>

          </ul>}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item d-flex align-items-center">

              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>




            {userToken &&
              <>
                 <li>
                  <Link to={'/cart'}>  <div className='position-relative mx-2'>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                      {NumOfCartItems}
                    </span>
                  </div>
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" to="/user"><i className="fa-solid fa-user mx-2"></i></Link>
                </li>
             
              </>



            }

            {!userToken && <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>}


          </ul>

        </div>
      </div>
    </nav>
  </>
}
