import React from "react";
import ProductLoader from "./ProductLoader";

const ProductLoaderContainer = () => {
    return <div className="container">{Array(8).fill(<ProductLoader />)}</div>;
};

export default ProductLoaderContainer;
