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
            "/api/v1/login",
            { email, password },
            config
        );

        dispatch(LOGIN_SUCCESS(data));
    } catch (error) {
        dispatch(LOGIN_FAIL(error.response.data.message));
    }
};

//REGISTER USER
const Register = (userData) => async (dispatch) => {
    try {
        dispatch(REGISTER_REQUEST());
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.post("/api/v1/register", userData, config);
        dispatch(REGISTER_SUCCESS(data));
    } catch (error) {
        dispatch(REGISTER_FAIL(error.response.data.message));
    }
};

//LOAD USER
const LoadUser = () => async (dispatch) => {
    try {
        dispatch(LOAD_USER_REQUEST());

        const { data } = await axios.get("/api/v1/me");
        const user = await data.user;

        await dispatch(LOAD_USER_SUCCESS(user));
    } catch (error) {
        dispatch(LOAD_USER_FAIL(error.response.data.message));
    }
};

//logout user
const Logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);
        dispatch(LOGOUT_SUCCESS());
    } catch (error) {
        dispatch(LOGOUT_FAIL(error.response.data.message));
    }
};

//////////////////////////////////////////////////////////////
//Update profile
const UpdateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(UPDATE_PROFILE_REQUEST());
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.put("/api/v1/me/update", userData, config);
        dispatch(UPDATE_PROFILE_SUCCESS(data));
    } catch (error) {
        dispatch(UPDATE_PROFILE_FAIL(error.response.data.message));
    }
};

//Update password
const updatePassword = (userDate) => async (dispatch) => {
    try {
        dispatch(UPDATE_PASSWORD_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            "/api/v1/password/update",
            userDate,
            config
        );

        dispatch(UPDATE_PASSWORD_SUCCESS(data));
    } catch (error) {
        dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message));
    }
};
// forgot password
const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(FORGOT_PASSWORD_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/password/forgot",
            email,
            config
        );

        dispatch(FORGOT_PASSWORD_SUCCESS(data));
    } catch (error) {
        dispatch(FORGOT_PASSWORD_FAIL(error.response.data.message));
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
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch(RESET_PASSWORD_SUCCESS(data));
    } catch (error) {
        dispatch(RESET_PASSWORD_FAIL(error.response.data.message));
    }
};

//get all users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(ADMIN_USER_REQUEST());

        const { data } = await axios.get("/api/v1/admin/users");

        await dispatch(ADMIN_USER_SUCCESS(data));
    } catch (error) {
        dispatch(ADMIN_USER_FAIL(error.response.data.message));
    }
};
//get  user details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch(USER_DETAILS_REQUEST());

        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        await dispatch(USER_DETAILS_SUCCESS(data));
    } catch (error) {
        dispatch(USER_DETAILS_FAIL(error.response.data.message));
    }
};
//Update User
export const updateUser = (id, userDate) => async (dispatch) => {
    try {
        dispatch(UPDATE_USER_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `/api/v1/admin/user/${id}`,
            userDate,
            config
        );

        dispatch(UPDATE_USER_SUCCESS(data));
    } catch (error) {
        dispatch(UPDATE_USER_FAIL(error.response.data.message));
    }
};
// Delete user
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(DELETE_USER_REQUEST());

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch(DELETE_USER_SUCCESS(data));
    } catch (error) {
        dispatch(DELETE_USER_FAIL(error.response.data.message));
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
//
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
