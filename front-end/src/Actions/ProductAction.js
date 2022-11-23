import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERROR, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS } from "../Constant/ProductConstant";

import axios from "axios";

export const getAllProductAction= (keyword="",currentPage=1)=> async (dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST})
        const link =`/api/product/getAllProducts?keyword=${keyword}&page=${currentPage}`
        const {data} = await axios.get(link)
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

export const productDetailAction= (id)=> async (dispatch)=>{
    try{
        dispatch({
            type:PRODUCT_DETAIL_REQUEST
        })

        const {data}= await axios.get(`/api/product/singleProduct/${id}`)

        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAIL_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrorAction=()=> async (dispatch)=>{
    dispatch({
        type:CLEAR_ERROR
    })
}