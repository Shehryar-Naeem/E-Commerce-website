import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductDetailReducer, ProductReducers } from "./Reducers/ProductReducer";
import { loginReducer } from "./Reducers/UserReducer";
const reducer = combineReducers({
    products:ProductReducers,
    productDetail: ProductDetailReducer,
    loginUser:loginReducer
});

const initialState = {};

const middleware = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
