import { ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_INFO } from "../Constant/CartContact";


export const addToCartReducers =(state={cartitems:[],shippingInfo:{}},action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const item =action.payload;
            const isItemExist = state.cartitems.find((i)=>i.product=== item.product)

            if(isItemExist){
                return {
                    ...state,
                    cartitems: state.cartitems.map((i)=>i.product === isItemExist.product? item : i)
                }
            }else{  
                return {
                    ...state,
                    cartitems:[...state.cartitems,item]
                }
            }
        case REMOVE_TO_CART:
            return {
                ...state,
                cartitems:state.cartitems.filter((i)=>i.product!==action.payload)
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo:action.payload
            }
            default:
                return state
    }
}