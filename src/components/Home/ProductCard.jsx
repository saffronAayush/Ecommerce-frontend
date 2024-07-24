import React from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating-stars-component";

const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        value: product.ratings,
        size: window.innerWidth < 940 ? 10 : 25,
        readOnly: true,
        activeColor: "tomato",
        isHalf: true,
    };
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <Rating {...options} />{" "}
                <span className="productCardSpan">
                    {" "}
                    ({product.numReviews} Reviews)
                </span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    );
};

export default ProductCard;
