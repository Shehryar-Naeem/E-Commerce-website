import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetail.css";
import { productDetailAction } from "../../Actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {getSingleProduct,loading,error} = useSelector(state=>state.productDetail)
  useEffect(() => {
    dispatch(productDetailAction(id));
  },[dispatch,id]);
  return (
    <>
      <div className="product_detail">
        <div>
          <Carousel>
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
          </Carousel>
        </div>
        <div>
            <div className="detail_block_1">
              <h2>{getSingleProduct.name}</h2>
              <p>Product # {getSingleProduct._id}</p>
            </div>
            <div className="detail_block_2">
              <ReactStars />
              <span>({getSingleProduct.noOfReviews})</span>
            </div>
            <div className="detail_block_3">
              <h1>{`₹${getSingleProduct.price}`}</h1>
              <div className="detail_block_3.1">
                <div className="detail_block_3.1.1">
                    <button>-</button>
                    <input value="1" type="number"/>
                    <button>+</button>
                </div>
                <button>Add to cart</button>
              </div>
              <p>Status <b className={getSingleProduct.stock< 1 ? "redColor":"greenColor"}>
                {getSingleProduct.stock<1 ?"Out of Stock":"inStock"}</b> </p>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
