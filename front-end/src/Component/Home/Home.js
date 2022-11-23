import React,{useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import {CgMouse} from "react-icons/cg"
import ProductCard from "./ProductCard"
import MetaData from "../Layout/MetaData.js";
import "./Home.css"
import {useDispatch,useSelector} from "react-redux"
import { getAllProductAction,clearErrorAction } from "../../Actions/ProductAction.js";
import LoadingComp from "../Layout/Loader/Loading.js";
import { useAlert } from "react-alert";

const Home =()=>{

    const alert = useAlert()
    const dispatch=useDispatch()
    const {keyword} = useParams()

    const{loading,error,getProducts}= useSelector(state=>state.products)
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrorAction())
        }
        dispatch(getAllProductAction(keyword))
    },[dispatch,error,alert,keyword])
    return (
        <>
            {
                loading ? <LoadingComp/> :<>
                <MetaData title="E-commerce"/>
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>Find Amazing product below</h1>
        
                        <Link to="/home">
                            <button>
                                Scroll <CgMouse/>
                            </button>
                        </Link>
                    </div>
                    <h2 className="home_heading">
                        Featured Product
                    </h2>
                    <div className="product_container" id="product_container">
                        {getProducts && getProducts.map((product)=><ProductCard product={product} key={product._id}/>
                        )}
                    </div>
                </>
            }
        </>
    )
}
export default Home;