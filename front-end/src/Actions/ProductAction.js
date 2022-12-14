import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERROR, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS } from "../Constant/ProductConstant";

import axios from "axios";

export const getAllProductAction= (keyword="",currentPage=1,price=[0,25000],productCategory,ratings=0)=> async (dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST})
        let link =`/api/product/getAllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if(productCategory){
            link = `/api/product/getAllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${productCategory}`
        }
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