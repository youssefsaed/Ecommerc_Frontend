import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import { useContext, useEffect } from 'react';
import { userContext } from './context/user.context';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRout';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './context/cart.context';
import { Toaster } from 'react-hot-toast';
import Address from './Components/address/address';
import Order from './Components/order/order';
import OrderContextProvider from './context/order.context';
import WishlistContextProvider from './context/wishlist.context';
import Wishlist from './Components/Wishlist/Wishlist';
import User from './Components/User/User';




let routes = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'Products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'Address', element: <ProtectedRoute><Address /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Order /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'user', element: <ProtectedRoute><User /></ProtectedRoute> },
      { path: 'ProductDetails/:id', element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
      { path: 'Login', element: <Login /> },
      { path: 'Register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])

function App() {
  const { setUserToken } = useContext(userContext)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserToken(localStorage.getItem('token'))
    }
  }, [])
  return <CartContextProvider>
    <OrderContextProvider>
      <WishlistContextProvider>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </WishlistContextProvider>
    </OrderContextProvider>
  </CartContextProvider>



}

export default App;
