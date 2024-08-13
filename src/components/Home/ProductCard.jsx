import React from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating-stars-component";

const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        value: product.ratings,
        size: window.innerWidth < 940 ? 15 : 35,
        readOnly: true,
        activeColor: "tomato",
        isHalf: true,
    };
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <div className="card_image">
                <img src={product.images[0].url} alt={product.name} />
            </div>
            <div className="card_text">
                <p className="card_name">{product.name}</p>
                <div>
                    <Rating {...options} />{" "}
                    <span className="productCardSpan">
                        {" "}
                        ({product.numReviews} Reviews)
                    </span>
                </div>
                <span>{`₹${product.price}`}</span>
            </div>
        </Link>
    );
};

export default ProductCard;
