import axios from "axios";
import { ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_INFO } from "../Constant/CartContact";

export const addToCartAction = (id,quantity) => async(dispatch,getState)=>{
    const {data} =await axios.get(`/api/product/singleProduct/${id}`)
    // console.log(data);
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.getSingleProduct._id,
            name:data.getSingleProduct.name,
            price: data.getSingleProduct.price,
            image:data.getSingleProduct.images[0].img_url,
            stock:data.getSingleProduct.stock,
            quantity    
        }
    })
    localStorage.setItem("cartitems", JSON.stringify(getState().Cart.cartitems));
}


export const removeCartItemAction = (id)=>(dispatch,getState)=>{
    dispatch({
        type:REMOVE_TO_CART,
        payload:id
    })
    localStorage.setItem("cartitems",JSON.stringify(getState().Cart.cartitems))
}


export const saveShippingInfoAcion = (data)=>(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data
    })
    localStorage.setItem("shippingInfo",JSON.stringify(data))
}