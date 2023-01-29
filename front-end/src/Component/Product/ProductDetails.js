import React, { useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
import "./productDetail.css";
import { clearErrorAction, productDetailAction } from "../../Actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import LoadingComp from "../Layout/Loader/Loading";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { addToCartAction } from "../../Actions/CartAction";
const ProductDetails = () => {
  const alert = useAlert()
  const { id } = useParams();
  const dispatch = useDispatch(); 
  const { getSingleProduct, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const [quantity,setQuantity]= useState(1)

  const increamentQuantity=()=>{
    if(quantity >=getSingleProduct.stock) return
    const qty = quantity+1;
    setQuantity(qty)
  }
  const decreamentQuantity =()=>{
    if(1>=quantity) return;
    const qty = quantity-1;
    setQuantity(qty)
  }
  const addToCartHandler= ()=>{
    dispatch(addToCartAction(id,quantity))
    alert.success("product add successfully")
  }
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrorAction())
    }
    dispatch(productDetailAction(id));
  }, [dispatch, id,alert,error]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: getSingleProduct.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
        <MetaData title={`${getSingleProduct.name} -- e-commerce`}/>
          <div className="product_detail">
            <div>
              {/* <Carousel> */}
              {getSingleProduct.images &&
                getSingleProduct.images.map((item, i) => {
                  return (
                    <img
                      className="carousael_image"
                      src={item.img_url}
                      alt={`slide ${i}`}
                    />
                  );
                })}
              {/* </Carousel> */}
            </div>
            <div>
              <div className="detail_block_1">
                <h2>{getSingleProduct.name}</h2>
                <p>Product # {getSingleProduct._id}</p>
              </div>
              <div className="detail_block_2">
                <ReactStars {...options} />
                <span>({getSingleProduct.noOfReviews})</span>
              </div>
              <div className="detail_block_3">
                <h1>{`₹${getSingleProduct.price}`}</h1>
                <div className="detail_block_3-1">
                  <div className="detail_block_3-1-1">
                    <button onClick={decreamentQuantity}>-</button>
                    <input value={quantity} type="number" />
                    <button onClick={increamentQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to cart</button>
                </div>
                <p>
                  Status{" "}
                  <b
                    className={
                      getSingleProduct.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {getSingleProduct.stock < 1 ? "Out of Stock" : "inStock"}
                  </b>{" "}
                </p>
              </div>
              <div className="detail_block_4">
                <p>
                  Discription <br />
                  <span>{getSingleProduct.discription}</span>
                </p>
              </div>
              <button className="submit_reviews">submit Reviews</button>
            </div>
          </div>

          <h3 className="reviews_heading">REVIEWS</h3>

          {getSingleProduct.reviews && getSingleProduct.reviews[0] ? (
            <div className="reviews">
              {getSingleProduct.reviews &&
                getSingleProduct.reviews.map((reviews, i) => {
                  return <ReviewCard reviews={reviews} key={i} />;
                })}
            </div>
          ) : (
            <p className="no_of_reviews">No Reviews yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
