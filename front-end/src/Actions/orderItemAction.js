import axios from "axios"
import { ORDER_ITEM_REQUEST,ORDER_ITEM_SUCCESS,ORDER_ITEM_FAIL,CLEAR_ERROR, MY_ORDER_ITEM_REQUEST, MY_ORDER_ITEM_SUCCESS, MY_ORDER_ITEM_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL } from "../Constant/OrderItemConstant"

export const orderItemAction=(order)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ORDER_ITEM_REQUEST})
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post("/api/order/orderitem/new",order,config)
        dispatch({type:ORDER_ITEM_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:ORDER_ITEM_FAIL,payload:error.response.data.message})
    }
} 


export const myOrderItemsAction = ()=> async(dispatch,getState)=>{
    try{
        dispatch({type:MY_ORDER_ITEM_REQUEST})
        const {data}= await axios.get("/api/order/orders/me")
        dispatch({type:MY_ORDER_ITEM_SUCCESS,payload:data.orders})
    }catch(error){
        dispatch({type:MY_ORDER_ITEM_FAIL,payload:error.response.data.message})
    }
}

export const orderDetailAction=(id)=>async(dispatch)=>{
    try{
        dispatch({type:ORDER_DETAIL_REQUEST})
        const {data} = await axios.get(`/api/order/getsingleOrder/${id}`)
        // console.log(data.order);
        dispatch({type:ORDER_DETAIL_SUCCESS,payload:data.order})
    }catch(error){
        dispatch({type:ORDER_DETAIL_FAIL,payload:error.response.data.message})
    }
}
export const clearErrorAction = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };