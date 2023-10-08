import axios from "axios";
import { createContext } from "react";
import { BaseUrl } from "../utils/baseUrl";

export const wishlistContext = createContext()

export default function WishlistContextProvider(props) {
    const headers = {
        token: localStorage.getItem('token')
    }
    function addWishlist(productId) {
        return axios.post(`${BaseUrl}/wishlist`, { productId }, { headers })
            .then(res => res)
            .catch(err => err)
    }
    function getWishlist() {
        return axios.get(`${BaseUrl}/wishlist`, { headers })
            .then(res => res)
            .catch(err => err)
    }
    function deleteWishlist(productId) {
        return axios.delete(`${BaseUrl}/wishlist/${productId}`, { headers })
            .then(res => res)
            .catch(err => err)
    }



    return <wishlistContext.Provider value={{addWishlist,getWishlist,deleteWishlist}}>
        {props.children}
    </wishlistContext.Provider>
}