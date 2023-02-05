import {
  ORDER_ITEM_REQUEST,
  ORDER_ITEM_SUCCESS,
  ORDER_ITEM_FAIL,
  MY_ORDER_ITEM_REQUEST,
  MY_ORDER_ITEM_SUCCESS,
  MY_ORDER_ITEM_FAIL,
  CLEAR_ERROR,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
} from "../Constant/OrderItemConstant";

export const orderItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_ITEM_SUCCESS:
      return {
        ...state,
        order: action.payload,
      };
    case ORDER_ITEM_FAIL:
      return {
        ...state,
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

export const myOrderItemReducer = (state = { orders: [] }, action) => {
    switch(action.type){
        case MY_ORDER_ITEM_REQUEST:
            return {
                loading:true
            }
        case MY_ORDER_ITEM_SUCCESS:
            return {
                loading:false,
                orders: action.payload
            }
        case MY_ORDER_ITEM_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null   
            }
        default:
            return state
        
    }
};


export const orderDetailReducer = (state={order:{}},action)=>{
  switch(action.type){
    case ORDER_DETAIL_REQUEST:
      return {
        loading:true
      }
    case ORDER_DETAIL_SUCCESS:
      return {
        loading:false,
        order:action.payload
      }
    case ORDER_DETAIL_FAIL:
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