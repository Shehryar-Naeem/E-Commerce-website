import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  CLEAR_ERROR,
} from "../Constant/ProductConstant";

export const ProductReducers = (state = { getProducts: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        getProducts: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        getProducts: action.payload.getProducts,
        countProduct: action.payload.countProduct,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};



export const ProductDetailReducer=(state={getSingleProduct:{}}, action)=>{
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading:true   
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading:false,
                getSingleProduct:action.payload.getSingleProduct
            }
        case PRODUCT_DETAIL_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}
