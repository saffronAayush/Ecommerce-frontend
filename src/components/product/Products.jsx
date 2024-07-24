import React from "react";
import { useEffect, useState } from "react";
import { GetProduct, ClearErrors } from "../../action/ProductAction.js";
import Loader from "../layout/Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "../Home/ProductCard.jsx";
import "./Product.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [catagory, setCatagory] = useState("");
    const [ratings, setRatings] = useState(0);
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const {
        products,
        productsCount,
        loading,
        error,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.AllProducts);

    const keyword = useParams().keyword;
    useEffect(() => {
        if (error) {
            dispatch(ClearErrors());
            toast.error(error);
        }
        dispatch(GetProduct(keyword, currentPage, price, catagory, ratings));
    }, [dispatch, keyword, currentPage, price, catagory, ratings, error]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <>
                        <MetaData title="PRODUCTS -- ECOMMERCE" />
                        <h2 className="productsHeading">Products</h2>
                        <div className="products">
                            {products &&
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                        </div>
                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={25000}
                            />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCatagory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component="legend">
                                    Ratings Above
                                </Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>
                        </div>
                        {resultPerPage < filteredProductsCount && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}
                        <ToastContainer />
                    </>
                </>
            )}
        </>
    );
};

export default Products;
