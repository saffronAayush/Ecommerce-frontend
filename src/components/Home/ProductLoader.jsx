import React from "react";
import "./ProductLoader.css";

const ProductLoader = () => {
    return (
        <div className="productCard loader">
            <div className="card_image loader-image"></div>
            <div className="card_text">
                <p className="loader-name"></p>
                <div className="loader-rating"></div>
                <span className="loader-price"></span>
            </div>
        </div>
    );
};

export default ProductLoader;
