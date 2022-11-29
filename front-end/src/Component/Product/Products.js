import React, { useEffect, useState } from "react";
import {
  clearErrorAction,
  getAllProductAction,
} from "../../Actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import LoadingComp from "../Layout/Loader/Loading";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import Typpgraphy from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price,setPrice]=useState([0,25000])

  

  const setCurrentPageNO = (e) => {
    setCurrentPage(e);
  };

  const priceHandler=(e,newPrice)=>{
    setPrice(newPrice)
  }
  const alert = useAlert();
  const dispatch = useDispatch();
  const { keyword } = useParams();  
  const { loading, error, getProducts, countProduct, resultPerPage,filterCountProducts } =
    useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorAction());
    }
    dispatch(getAllProductAction(keyword, currentPage, price));
  }, [dispatch, alert, error, keyword, currentPage, price]);
  let count = filterCountProducts
  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <h2 className="product_heading">Products</h2>
          <div className="products">
            {getProducts &&
              getProducts.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>

          <div className="filter_box">
            <Typpgraphy>Price</Typpgraphy>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
          </div>

          {resultPerPage < count && (
            <div className="pagination_box">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={countProduct}
                onChange={setCurrentPageNO}
                nextPageText="next"
                prevPageText="prev"
                firstPageText="1st"
                lastPageText="
            Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
