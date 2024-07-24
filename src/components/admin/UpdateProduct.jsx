import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    ClearUpdateProductError,
    updateProduct,
    GetProductDetails,
    ClearErrors,
} from "../../action/ProductAction.js";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../slices/UpdateProductSlice.js";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const productId = useParams().id;
    const dispatch = useDispatch();

    const { error, product } = useSelector((state) => state.ProductDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.UpdateProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(GetProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }
        if (error) {
            toast.error(error);
            dispatch(ClearErrors());
        }

        if (updateError) {
            toast.error(updateError);
            dispatch(ClearUpdateProductError());
        }

        if (isUpdated) {
            toast.success("Product Updated Successfully");
            navigate("/admin/products");

            dispatch(UPDATE_PRODUCT_RESET());
            dispatch(GetProductDetails(productId));
        }
    }, [dispatch, toast, error, isUpdated, productId, product, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        console.log(oldImages);

        const imagesArray = images.map((image) => image);
        myForm.set("images", JSON.stringify(imagesArray));

        console.log(imagesArray);
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt="Old Product Preview"
                                    />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt="Product Preview"
                                />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default UpdateProduct;
