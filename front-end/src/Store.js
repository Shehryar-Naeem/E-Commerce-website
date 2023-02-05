import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductDetailReducer, ProductReducers } from "./Reducers/ProductReducer";
import { forgetPasswordReducer, loginReducer, updateProfileReducer } from "./Reducers/UserReducer";
import { addToCartReducers } from "./Reducers/CartReducers";
import { myOrderItemReducer, orderDetailReducer, orderItemReducer } from "./Reducers/orderItemReducer";
const reducer = combineReducers({
    products:ProductReducers,
    productDetail: ProductDetailReducer,
    loginUser:loginReducer,
    updateProfile: updateProfileReducer,
    forgetPassword: forgetPasswordReducer,
    Cart: addToCartReducers,
    newOrder:orderItemReducer,
    myOrderItems:myOrderItemReducer,
    getOrderDetail:orderDetailReducer
});

const initialState = {
  Cart:{
    cartitems: localStorage.getItem("cartitems")
      ? JSON.parse(localStorage.getItem("cartitems"))
      : [],
    shippingInfo :localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")): {},
  }
};
const middleware = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
