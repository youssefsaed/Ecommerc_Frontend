import axios from "axios";
import { createContext } from "react";
import { BaseUrl } from "../utils/baseUrl";

export const orderContext = createContext()

export default function OrderContextProvider(props) {
    const headers = {
        token: localStorage.getItem('token')
    }
    async function creatCashOrder(cartId,values) {
        return await axios.post(`${BaseUrl}/orders/${cartId}`,{shippingAddress:values},{headers})
            .then((res) => res)
            .catch(err => err)
    }
    return <orderContext.Provider value={{creatCashOrder}}>
        {props.children}
    </orderContext.Provider>
}