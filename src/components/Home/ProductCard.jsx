import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating-stars-component";

const ProductCard = ({ product }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const ratingSize = windowWidth < 600 ? 10 : 15;

    const options = {
        edit: false,
        value: product.ratings,
        size: ratingSize,
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
                    <Rating {...options} />
                    <span className="productCardSpan">
                        ({product.numReviews} Reviews)
                    </span>
                </div>
                <span>{`₹${product.price}`}</span>
            </div>
        </Link>
    );
};

export default ProductCard;
