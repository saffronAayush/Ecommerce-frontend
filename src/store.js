import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slices/ProductSlice.js";
import ProductDetailReducer from "./slices/ProductDetailSlice.js";
import UserReducer from "./slices/UserSlice.js";
import ProfileReducer from "./slices/ProfileSlice.js";
import ForgotPasswordReducer from "./slices/ForgotPasswordSlice.js";
import CartReducer from "./slices/CartSlice.js";
import OrderReducer from "./slices/OrderSlice.js";
import MyOrderReducer from "./slices/MyOrderSlice.js";
import OrderDetailReducer from "./slices/OrderDetailSlice.js";
import NewReviewReducer from "./slices/NewReviewSlice.js";
import AdminProductReducer from "./slices/AdminProductSlice.js";
import NewProductReducer from "./slices/NewProductSlice.js";
import DeleteProductReducer from "./slices/DeleteProduct.js";
import UpdateProductReducer from "./slices/UpdateProductSlice.js";
import AdminOrderReducer from "./slices/AdminOrderSlice.js";
import AdminUserReducer from "./slices/AdminUserSlice.js";
import AdminUserDetailReducer from "./slices/AdminUserDetailSlice.js";
import AdminReviewsReducer from "./slices/AdminReviewsSlice.js";

export const store = configureStore({
    reducer: {
        AllProducts: ProductReducer,
        ProductDetails: ProductDetailReducer,
        User: UserReducer,
        Profile: ProfileReducer,
        ForgotPasswordStates: ForgotPasswordReducer,
        Cart: CartReducer,
        Order: OrderReducer,
        MyOrders: MyOrderReducer,
        OrderDetails: OrderDetailReducer,
        NewReview: NewReviewReducer,
        AdminProducts: AdminProductReducer,
        NewProduct: NewProductReducer,
        DeleteProduct: DeleteProductReducer,
        UpdateProduct: UpdateProductReducer,
        AdminOrder: AdminOrderReducer,
        AdminAllUsers: AdminUserReducer,
        AdminUser: AdminUserDetailReducer,
        AdminReviews: AdminReviewsReducer,
    },
});
