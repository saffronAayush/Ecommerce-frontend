import {
    createProduct,
    ClearNewProductError,
} from "../../action/ProductAction";
import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../slices/NewProductSlice.js";

const NewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(
        (state) => state.NewProduct
    );

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setstock] = useState(0);
    const [images, setImages] = useState([]);
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
        console.log("new product");
        if (error) {
            toast.error(error);
            dispatch(ClearNewProductError());
        }

        if (success) {
            toast.success("Product Created Successfully");
            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 3000);

            dispatch(NEW_PRODUCT_RESET());
        }
    }, [dispatch, error, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        console.log("in");
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        const imagesArray = images.map((image) => image);
        if (!imagesArray.length) {
            toast.error("Please Uploade Product image(s)");
            return;
        }
        myForm.set("images", JSON.stringify(imagesArray));
        console.log(
            imagesArray,
            imagesArray.length,
            Boolean(imagesArray.length)
        );
        for (let pair of myForm.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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
                        onSubmit={createProductSubmitHandler}
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
                                onChange={(e) => setstock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
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

export default NewProduct;
