import axios from "axios";
import {
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
} from "../slices/ProductSlice.js";
import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../slices/ProductDetailSlice.js";
import {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    CLEAR_NEW_REVIEW_ERROR,
} from "../slices/NewReviewSlice.js";
import {
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_CLEAR_ERROR,
} from "../slices/AdminProductSlice.js";
import {
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_CLEAR_ERROR,
} from "../slices/NewProductSlice.js";
import {
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_CLEAR_ERROR,
    DELETE_PRODUCT_RESET,
} from "../slices/DeleteProduct.js";
import {
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_CLEAR_ERROR,
    UPDATE_PRODUCT_RESET,
} from "../slices/UpdateProductSlice.js";
import {
    ADMIN_REVIEW_REQUEST,
    ADMIN_REVIEW_FAIL,
    ADMIN_REVIEW_SUCCESS,
    ADMIN_REVIEW_CLEAR_ERROR,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_CLEAR_ERROR,
} from "../slices/AdminReviewsSlice.js";
// get product
export const GetProduct =
    (
        keyword = "",
        currentPage = 1,
        price = [0, 25000],
        category = "",
        ratings = 0
    ) =>
    async (dispatch) => {
        try {
            dispatch(ALL_PRODUCT_REQUEST());

            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            if (category.length)
                link = `/api/v1/products?keyword=${keyword}&category=${category}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            const { data } = await axios.get(link);
            dispatch(ALL_PRODUCT_SUCCESS(data));
        } catch (error) {
            dispatch(ALL_PRODUCT_FAIL(error.response.data.message));
        }
    };

// get a product detail
export const GetProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(PRODUCT_DETAILS_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch(PRODUCT_DETAILS_SUCCESS(data.product));
    } catch (error) {
        dispatch(PRODUCT_DETAILS_FAIL(error.response.data.message));
    }
};

//Admin Products
export const GetAdminProducts = () => async (dispatch) => {
    try {
        dispatch(ADMIN_PRODUCT_REQUEST());
        const { data } = await axios.get(`/api/v1/admin/products`);
        console.log("admin products", data);
        dispatch(ADMIN_PRODUCT_SUCCESS(data.products));
    } catch (error) {
        dispatch(ADMIN_PRODUCT_FAIL(error.response.data.message));
    }
};

//review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(NEW_REVIEW_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch(NEW_REVIEW_SUCCESS(data.success));
    } catch (error) {
        dispatch(NEW_REVIEW_FAIL(error.response.data.message));
    }
};

// NEW PRODUCT
export const createProduct = (productdata) => async (dispatch) => {
    try {
        dispatch(NEW_PRODUCT_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(productdata);
        const { data } = await axios.post(
            `/api/v1/admin/products/new`,
            productdata,
            config
        );

        dispatch(NEW_PRODUCT_SUCCESS(data));
    } catch (error) {
        dispatch(NEW_PRODUCT_FAIL(error.response.data.message));
    }
};
// UPDATE PRODUCT
export const updateProduct = (id, productdata) => async (dispatch) => {
    try {
        dispatch(UPDATE_PRODUCT_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(productdata);
        const { data } = await axios.put(
            `/api/v1/admin/products/${id}`,
            productdata,
            config
        );

        dispatch(UPDATE_PRODUCT_SUCCESS(data));
    } catch (error) {
        dispatch(UPDATE_PRODUCT_FAIL(error.response.data.message));
    }
};
// DeleteProduct
export const DeleteProduct = (id) => async (dispatch) => {
    try {
        dispatch(DELETE_PRODUCT_REQUEST());

        const { data } = await axios.delete(`/api/v1/admin/products/${id}`);

        dispatch(DELETE_PRODUCT_SUCCESS(data.success));
    } catch (error) {
        dispatch(DELETE_PRODUCT_FAIL(error.response.data.message));
    }
};
//Get Revies
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch(ADMIN_REVIEW_REQUEST());
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
        console.log("admin products", data);
        dispatch(ADMIN_REVIEW_SUCCESS(data.reviews));
    } catch (error) {
        dispatch(ADMIN_REVIEW_FAIL(error.response.data.message));
    }
};
//delete reviews
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch(DELETE_REVIEW_REQUEST());
        const { data } = await axios.delete(
            `/api/v1/reviews?id=${reviewId}&productId=${productId}`
        );
        dispatch(DELETE_REVIEW_SUCCESS(data));
    } catch (error) {
        dispatch(DELETE_REVIEW_FAIL(error.response.data.message));
    }
};

export const ClearNewReviewError = () => async (dispatch) => {
    dispatch(CLEAR_NEW_REVIEW_ERROR());
};
export const ClearErrors = () => async (dispatch) => {
    dispatch(CLEAR_ERRORS());
};
export const ClearAdminProductError = () => async (dispatch) => {
    dispatch(ADMIN_PRODUCT_CLEAR_ERROR());
};
export const ClearNewProductError = () => async (dispatch) => {
    dispatch(NEW_PRODUCT_CLEAR_ERROR());
};
export const ClearDeleteProductError = () => async (dispatch) => {
    dispatch(DELETE_PRODUCT_CLEAR_ERROR());
};
export const ClearUpdateProductError = () => async (dispatch) => {
    dispatch(UPDATE_PRODUCT_CLEAR_ERROR());
};
export const ClearAdminReviewError = () => async (dispatch) => {
    dispatch(ADMIN_REVIEW_CLEAR_ERROR());
};
export const ClearDeleteReviewError = () => async (dispatch) => {
    dispatch(DELETE_REVIEW_CLEAR_ERROR());
};
