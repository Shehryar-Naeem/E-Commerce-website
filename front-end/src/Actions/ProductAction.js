import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERROR } from "../Constant/ProductConstant";

import axios from "axios";

export const getAllProductAction= ()=> async (dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST})

        const {data} = await axios.get("/api/product/getAllProducts")
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}



export const clearErrorAction=()=> async (dispatch)=>{
    dispatch({
        type:CLEAR_ERROR
    })
}