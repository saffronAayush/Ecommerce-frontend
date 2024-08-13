import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_LOGIN_ERRORS,
} from "../slices/UserSlice";
import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    CLEAR_PROFILE_ERROR,
} from "../slices/ProfileSlice";
import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_FORGET_ERRORS,
} from "../slices/ForgotPasswordSlice";
import {
    ADMIN_USER_REQUEST,
    ADMIN_USER_FAIL,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_CLEAR_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_CLEAR_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_CLEAR_ERROR,
} from "../slices/AdminUserSlice.js";
import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    CLEAR_USER_DETAILS_ERROR,
} from "../slices/AdminUserDetailSlice.js";
axios.defaults.withCredentials = true;

// LOGIN
const Login = (email, password) => async (dispatch) => {
    try {
        dispatch(LOGIN_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/login",
            { email, password },
            config
        );

        dispatch(LOGIN_SUCCESS(data));
    } catch (error) {
        dispatch(LOGIN_FAIL(error.response?.data?.message || "Login failed"));
    }
};

// REGISTER USER
const Register = (userData) => async (dispatch) => {
    try {
        dispatch(REGISTER_REQUEST());
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.post(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/register",
            userData,
            config
        );
        dispatch(REGISTER_SUCCESS(data));
    } catch (error) {
        dispatch(
            REGISTER_FAIL(
                error.response?.data?.message || "Registration failed"
            )
        );
    }
};

// LOAD USER
const LoadUser = () => async (dispatch) => {
    try {
        dispatch(LOAD_USER_REQUEST());

        const { data } = await axios.get(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/me"
        );
        const user = data.user;

        dispatch(LOAD_USER_SUCCESS(user));
    } catch (error) {
        dispatch(
            LOAD_USER_FAIL(
                error.response?.data?.message || "Failed to load user"
            )
        );
    }
};

// LOGOUT
const Logout = () => async (dispatch) => {
    try {
        await axios.get(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/logout"
        );
        dispatch(LOGOUT_SUCCESS());
    } catch (error) {
        dispatch(LOGOUT_FAIL(error.response?.data?.message || "Logout failed"));
    }
};

// UPDATE PROFILE
const UpdateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(UPDATE_PROFILE_REQUEST());
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.put(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/me/update",
            userData,
            config
        );
        dispatch(UPDATE_PROFILE_SUCCESS(data));
    } catch (error) {
        dispatch(
            UPDATE_PROFILE_FAIL(
                error.response?.data?.message || "Failed to update profile"
            )
        );
    }
};

// UPDATE PASSWORD
const updatePassword = (userData) => async (dispatch) => {
    try {
        dispatch(UPDATE_PASSWORD_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/password/update",
            userData,
            config
        );

        dispatch(UPDATE_PASSWORD_SUCCESS(data));
    } catch (error) {
        dispatch(
            UPDATE_PASSWORD_FAIL(
                error.response?.data?.message || "Failed to update password"
            )
        );
    }
};

// FORGOT PASSWORD
const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(FORGOT_PASSWORD_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/password/forgot",
            email,
            config
        );

        dispatch(FORGOT_PASSWORD_SUCCESS(data));
    } catch (error) {
        dispatch(
            FORGOT_PASSWORD_FAIL(
                error.response?.data?.message || "Forgot password failed"
            )
        );
    }
};

// RESET PASSWORD
const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch(RESET_PASSWORD_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `https://ecommerce-backend-for-fun.vercel.app/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch(RESET_PASSWORD_SUCCESS(data));
    } catch (error) {
        dispatch(
            RESET_PASSWORD_FAIL(
                error.response?.data?.message || "Reset password failed"
            )
        );
    }
};

// GET ALL USERS
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(ADMIN_USER_REQUEST());

        const { data } = await axios.get(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/admin/users"
        );

        dispatch(ADMIN_USER_SUCCESS(data));
    } catch (error) {
        dispatch(
            ADMIN_USER_FAIL(
                error.response?.data?.message || "Failed to get users"
            )
        );
    }
};

// GET USER DETAILS
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch(USER_DETAILS_REQUEST());

        const { data } = await axios.get(
            `https://ecommerce-backend-for-fun.vercel.app/api/v1/admin/user/${id}`
        );
        dispatch(USER_DETAILS_SUCCESS(data));
    } catch (error) {
        dispatch(
            USER_DETAILS_FAIL(
                error.response?.data?.message || "Failed to get user details"
            )
        );
    }
};

// UPDATE USER
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch(UPDATE_USER_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `https://ecommerce-backend-for-fun.vercel.app/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch(UPDATE_USER_SUCCESS(data));
    } catch (error) {
        dispatch(
            UPDATE_USER_FAIL(
                error.response?.data?.message || "Failed to update user"
            )
        );
    }
};

// DELETE USER
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(DELETE_USER_REQUEST());

        const { data } = await axios.delete(
            `https://ecommerce-backend-for-fun.vercel.app/api/v1/admin/user/${id}`
        );

        dispatch(DELETE_USER_SUCCESS(data));
    } catch (error) {
        dispatch(
            DELETE_USER_FAIL(
                error.response?.data?.message || "Failed to delete user"
            )
        );
    }
};

// CLEAR ERROR
const ClearLoginErrors = () => async (dispatch) => {
    dispatch(CLEAR_LOGIN_ERRORS());
};
const ClearProfileError = () => async (dispatch) => {
    dispatch(CLEAR_PROFILE_ERROR());
};
const ClearForgotPasswordError = () => async (dispatch) => {
    dispatch(CLEAR_FORGET_ERRORS());
};
const ClearAdminUserError = () => async (dispatch) => {
    dispatch(ADMIN_USER_CLEAR_ERROR());
};
const ClearUpdateUserError = () => async (dispatch) => {
    dispatch(UPDATE_USER_CLEAR_ERROR());
};
const ClearDeleteUserError = () => async (dispatch) => {
    dispatch(DELETE_USER_CLEAR_ERROR());
};
const ClearUserDetailsError = () => async (dispatch) => {
    dispatch(CLEAR_USER_DETAILS_ERROR());
};

export {
    Login,
    ClearLoginErrors,
    Register,
    LoadUser,
    Logout,
    UpdateProfile,
    ClearProfileError,
    updatePassword,
    forgotPassword,
    ClearForgotPasswordError,
    resetPassword,
    ClearAdminUserError,
    ClearUpdateUserError,
    ClearDeleteUserError,
    ClearUserDetailsError,
};
