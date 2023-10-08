import axios from "axios";
import { createContext, useState } from "react";
import { BaseUrl } from "../utils/baseUrl";

export const cartContext = createContext()

export default function CartContextProvider(props) {
    const [NumOfCartItems,setNumOfCartItems]=useState(0)
    const headers = {
        token: localStorage.getItem('token')
    }
    function addToCart(productId) {
        return axios.post(`${BaseUrl}/cart`, { productId }, { headers })
            .then(res => res)
            .catch(err => err)
    }

    function getUserCart() {
        return axios.get(`${BaseUrl}/cart`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    
    function getCartId() {
        return axios.get(`${BaseUrl}/cart`, { headers })
            .then((res) => res?.data?.data?._id)
            .catch((err) => err)
    }
    function clearUserCart() {
        return axios.delete(`${BaseUrl}/cart`, { headers })
            .then((res) =>  res)
            .catch((err) => err)
    }

    function deleteProductFromCart(productId) {
        return axios.delete(`${BaseUrl}/cart/${productId}`,{ headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function updateQuntityProductFromCart(productId,count) {
        return axios.put(`${BaseUrl}/cart/${productId}`,{count},{ headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function onlinePayment(cartId,url,values) {
        return axios.post(`${BaseUrl}/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress:values},{ headers })
            .then((res) => res)
            .catch((err) => err)
    }

    return <cartContext.Provider value={{ addToCart, getUserCart ,clearUserCart,deleteProductFromCart,updateQuntityProductFromCart,onlinePayment,getCartId,setNumOfCartItems,NumOfCartItems}}>
        {props.children}
    </cartContext.Provider>
}