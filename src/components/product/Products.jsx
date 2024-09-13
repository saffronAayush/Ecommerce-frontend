import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetProduct, ClearErrors } from "../../action/ProductAction.js";
import ProductCard from "../Home/ProductCard.jsx";
import "./Product.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ProductLoaderContainer from "../Home/ProductLoaderContainer.jsx";
import Sidebar from "react-sidebar";
import Tooltip from "@mui/material/Tooltip";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

function ValueLabelComponent(props) {
    const { children, open, value } = props;
    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const Products = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

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
        dispatch(GetProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if (!sidebarOpen) {
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when opening sidebar
        }
    };

    const handleCategoryClick = (cat) => {
        if (category === cat) {
            // If the clicked category is already selected, unselect it
            setCategory("");
        } else {
            // Otherwise, select the clicked category
            setCategory(cat);
        }
    };

    return (
        <>
            <MetaData title="PRODUCTS -- ECOMMERCE" />
            <h2 className="productsHeading">Products</h2>

            {loading ? (
                <ProductLoaderContainer />
            ) : (
                <div className="products">
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
            )}

            {/* Toggle Button for Filter Sidebar */}
            <button className="filterButton" onClick={toggleSidebar}>
                Filter
            </button>

            {/* Sidebar Component for Filter Options */}
            <Sidebar
                sidebar={
                    <div className="filterContent">
                        <Typography>Price Range</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                            ValueLabelComponent={ValueLabelComponent}
                        />

                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((cat) => (
                                <li
                                    className={`category-link ${
                                        category === cat ? "active" : ""
                                    }`}
                                    key={cat}
                                    onClick={() => handleCategoryClick(cat)}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">
                                Ratings Above
                            </Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) =>
                                    setRatings(newRating)
                                }
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>
                }
                open={sidebarOpen}
                onSetOpen={toggleSidebar}
                styles={{ sidebar: { background: "white", width: "300px" } }}
            >
                {/* Main Content */}
            </Sidebar>

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
    );
};

export default Products;
