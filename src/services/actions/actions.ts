import { registerRequest, loginRequest, logoutRequest, resetRequest, editRequest, resetPasswordRequest, getOrderRequest, placeOrderRequest, userRequest, BASE_URL } from "../../utils/utils";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import { setUser, setLogoutUser, setUpdateUser, setUpdateUserRequest, setUpdateUserError, setResetRequest, setResetConfirmed, setResetError, setChangePasswordRequest, setChangePasswordConfirmed, setChangePasswordError, setUserRequest, setUserError, setLogoutRequest, setLogoutError, setAuthChecked } from "../reducers/userReducer";
import { loadDataFail, setFetchOrder, setFetchOrderError, setFetchOrderRequest, setIngredients, setIngredientsRequest } from "../reducers/dataReducer";
import { setOrderNumber, setPlaceOrderRequest, setResetOrderNumber, setStatusSuccess } from "../reducers/constructorReducer";
import { setOpenOrderModal } from "../reducers/modalReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/api";
import { TIngredient, TUser } from "../types";

export interface IIngredients {
    success: boolean,
    data: TIngredient[]
}

export const getAllIngredients = createAsyncThunk(
    'data/getAllIngredients',
    async function (_, { dispatch }) {
        dispatch(setIngredientsRequest(true))
        return fetch(`${BASE_URL}/ingredients`)
            .then(checkResponse)
            .then((data) => {
                dispatch(setIngredients(data))
            })
            .catch((error) => {
                dispatch(loadDataFail(error))
                console.warn(error)
            })
            .finally(() => {
                dispatch(setIngredientsRequest(false))
            })
    }
);

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async function (_, { dispatch }) {
        if (getCookie('accessToken') !== null) {
            dispatch(getUser())
            dispatch(setAuthChecked(true))
        } else {
            dispatch(setAuthChecked(true))
        }
    }
);

export const getUser = createAsyncThunk(
    'user/getUser',
    async function (_, { dispatch }) {
        dispatch(setUserRequest(true))
        return userRequest()
            .then((user) => {
                dispatch(setUser(user))
            })
            .catch((err) => {
                dispatch(setUserError(err))
            })
            .finally(() => {
                dispatch(setUserRequest(false))
            })
    }
);

export const onRegister = createAsyncThunk(
    'user/onRegister',
    async function (user: TUser, { dispatch }) {
        dispatch(setUserRequest(true))
        return registerRequest(user)
            .then(checkResponse)
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('accessToken', accessToken, null);
                setCookie('refreshToken', refreshToken, null);
                dispatch(setUser(res));
            })
            .catch((err) => {
                dispatch(setUserError(err))
                console.warn(err);
            })
            .finally(() => {
                dispatch(setUserRequest(false))
            })
    }
);

export const onLogin = createAsyncThunk(
    'user/onLogin',
    async function (body: TUser, { dispatch }) {
        dispatch(setUserRequest(true))
        loginRequest(body)
            .then(checkResponse)
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                dispatch(setUser(res));
                setCookie('accessToken', accessToken, null);
                setCookie('refreshToken', refreshToken, null);
            })
            .catch((err) => {
                dispatch(setUserError(err))
                console.warn(err);
            })
            .finally(() => {
                dispatch(setUserRequest(false))
            })
    }
);

export const onLogout = createAsyncThunk(
    'user/onLogout',
    async function (_, { dispatch }) {
        dispatch(setLogoutRequest(true))
        logoutRequest()
            .then(checkResponse)
            .then((res) => {
                dispatch(setLogoutUser());
                deleteCookie('refreshToken');
                deleteCookie('accessToken');
            })
            .catch((err) => {
                dispatch(setLogoutError(err))
                console.warn(err);
            })
            .finally(() => {
                dispatch(setLogoutRequest(false))
            })
    }
);

export const onReset = createAsyncThunk(
    'user/onReset',
    async function (body: TUser, { dispatch }) {
        dispatch(setResetRequest(true))
        resetRequest(body)
            .then(checkResponse)
            .then((res) => {
                if (res.success) {
                    dispatch(setResetConfirmed(res.success))
                }
            })
            .catch((err) => {
                dispatch(setResetError(err))
                console.warn(err);
            })
            .finally(() => {
                dispatch(setResetRequest(false))
            })
    }
);

export const onResetPassword = createAsyncThunk(
    'user/onResetPassword',
    async function (body: TUser, { dispatch }) {
        dispatch(setChangePasswordRequest(true))
        resetPasswordRequest(body)
            .then(checkResponse)
            .then((res) => {
                if (res.success) {
                    dispatch(setChangePasswordConfirmed(res.success))
                }
            })
            .catch((err) => {
                dispatch(setChangePasswordError(err))
                console.warn(err);
            })
            .finally(() => {
                dispatch(setChangePasswordRequest(false))
            })
    }
);

export const onUpdateUser = createAsyncThunk(
    'user/onUpdateUser',
    async function (user: TUser, { dispatch }) {
        dispatch(setUpdateUserRequest(true))
        editRequest(user)
            .then(checkResponse)
            .then((res) => {
                dispatch(setUpdateUser(res))
            })
            .catch((err) => {
                dispatch(setUpdateUserError(err))
                console.warn(err);
            })
            .finally(() => {
                dispatch(setUpdateUserRequest(false))
            })
    }
);

export const onFetchOrder = createAsyncThunk(
    'user/onFetchOrder',
    async function (number: string, { dispatch }) {
        dispatch(setFetchOrderRequest(true))
        getOrderRequest(number)
            .then(checkResponse)
            .then((res) => {
                dispatch(setFetchOrder(res))
            })
            .catch((err) => {
                dispatch(setFetchOrderError(err))
                console.warn(err);
            })
            .finally(() => {
                dispatch(setFetchOrderRequest(false))
            })
    }
);

export const onPlaceOrder = createAsyncThunk(
    'user/onPlaceOrder',
    async function (cart: string[], { dispatch }) {
        dispatch(setResetOrderNumber())
        dispatch(setPlaceOrderRequest(true))
        return placeOrderRequest(cart)
            .then(checkResponse)
            .then((data) => {
                dispatch(setOrderNumber(data))
            })
            .then(() => {
                dispatch(setOpenOrderModal())
            })
            .catch((error) => {
                dispatch(setStatusSuccess(error))
                console.warn(error)
            })
            .finally(() => {
                dispatch(setPlaceOrderRequest(false))
            })
    }
);