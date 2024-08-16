import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetProductDetails, ClearErrors } from "../../action/ProductAction";
import { addItemsToCart } from "../../action/CartAction.js";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader.jsx";
import MetaData from "../layout/MetaData";
import { ToastContainer, toast } from "react-toastify";
import { Rating } from "@mui/material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import { ClearNewReviewError, newReview } from "../../action/ProductAction";
import { NEW_REVIEW_RESET } from "../../slices/NewReviewSlice.js";
import MySwal from "sweetalert2";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector(
        (state) => state.ProductDetails
    );

    const { success, error: reviewError } = useSelector(
        (state) => state.NewReview
    );

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const submitReviewToggle = () => {
        setOpen(!open);
    };

    const reviewSubmitHandler = () => {
        if (rating <= 0) {
            submitReviewToggle();
            return;
        }
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            // toast.error(error);
            MySwal.fire({
                icon: "error",
                text: error,
                timer: 3000, // Auto-close after 3 seconds
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(ClearErrors());
        }
        dispatch(GetProductDetails(id));
        if (reviewError) {
            // toast.error(reviewError);
            MySwal.fire({
                icon: "error",
                text: reviewError,
                timer: 3000, // Auto-close after 3 seconds
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(ClearNewReviewError());
        }
        if (success) {
            MySwal.fire({
                icon: "success",
                text: "Review Submitted Successfully",
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(NEW_REVIEW_RESET());
        }
    }, [dispatch, id, error, reviewError, success]);

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));

        MySwal.fire({
            icon: "success",
            text: "Item added to cart",
            timer: 3000, // Auto-close after 3 seconds
            toast,
            position: "top-end",
            heightAuto: false,
            timerProgressBar: true,
            showConfirmButton: true,
        });
    };

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`${product.name} -- ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel
                                axis="horizontal"
                                autoPlay
                                swipeable={true}
                                infiniteLoop
                                showThumbs={false}
                                width="25vmax"
                            >
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>
                                            -
                                        </button>
                                        <input
                                            readOnly
                                            type="number"
                                            value={quantity}
                                        />
                                        <button onClick={increaseQuantity}>
                                            +
                                        </button>
                                    </div>
                                    <button
                                        disabled={
                                            product.stock < 1 ? true : false
                                        }
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b
                                        className={
                                            product.stock < 1
                                                ? "redColor"
                                                : "greenColor"
                                        }
                                    >
                                        {product.stock < 1
                                            ? " OutOfStock"
                                            : ` InStock (${product.stock})`}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button
                                onClick={submitReviewToggle}
                                className="submitReview"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                    {/* L? */}

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="secondary"
                                onClick={submitReviewToggle}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={reviewSubmitHandler}
                                color="primary"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard
                                        key={review._id}
                                        review={review}
                                    />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </>
            )}
            <ToastContainer />
        </>
    );
};

export default ProductDetails;
