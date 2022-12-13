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
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import MetaData from "../Layout/MetaData";


const categories= ["shees","clothes","shoes","laptop"]
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price,setPrice]=useState([0,25000])
  const [productCategory,setProductCategory]=useState("")
  const [ratings,setRatings]= useState(0)
  

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
    dispatch(getAllProductAction(keyword, currentPage, price,productCategory,ratings));
  }, [dispatch, alert, error, keyword, currentPage, price,productCategory,ratings]);
  let count = filterCountProducts
  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <MetaData title="products & e-commerce"/>
          <h2 className="product_heading">Products</h2>
          <div className="products">
            {getProducts &&
              getProducts.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>

          <div className="filter_box">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Category</Typography>
            <ul className="catergory_box">
              {
                categories.map((category)=>(
                  <li className="category_link" key={category} onClick={()=>setProductCategory(category)}>
                    {category}
                  </li>
                ))
              }
            </ul>
            <fieldset>
            <Typography component="legend">Ratings Above</Typography>
            <Slider value={ratings} onChange={(e,newRating)=> setRatings(newRating)} aria-labelledby="coutinous-slider" min={0} max={5} valueLabelDisplay="auto"/>
            </fieldset>
          </div>

          {resultPerPage <  count  && (
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
