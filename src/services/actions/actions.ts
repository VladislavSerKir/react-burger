import { registerRequest, loginRequest, logoutRequest, resetRequest, editRequest, resetPasswordRequest, getOrderRequest, placeOrderRequest, userRequest, BASE_URL } from "../../utils/utils";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import { setUser, setUserRequest, setUserError, setAuthChecked } from "../reducers/userReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError, TIngredient, TOrder, TOrders, TUser, TUserEditResponse } from "../types";

export interface IIngredients {
    success: boolean,
    data: TIngredient[]
}

export const getAllIngredients = createAsyncThunk<IIngredients, undefined, { rejectValue: TError }>(
    'data/getAllIngredients',
    async function (_, { rejectWithValue }) {
        const response = await fetch(`${BASE_URL}/ingredients`);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error!' });
        }
        const data = await response.json();
        return data;
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

export const onRegister = createAsyncThunk<TUserEditResponse, TUser, { rejectValue: TError }>(
    'user/onRegister',
    async function (user, { rejectWithValue }) {
        const response = await registerRequest(user);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error!' });
        }
        const data = await response.json();
        const accessToken = data.accessToken.split('Bearer ')[1];
        const refreshToken = data.refreshToken;
        setCookie('accessToken', accessToken, {});
        setCookie('refreshToken', refreshToken, {});
        return data;
    }
)

export const onLogin = createAsyncThunk<TUserEditResponse, TUser, { rejectValue: TError }>(
    'user/onLogin',
    async function (user, { rejectWithValue }) {
        const response = await loginRequest(user);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error!' });
        }
        const data = await response.json();
        const accessToken = data.accessToken.split('Bearer ')[1];
        const refreshToken = data.refreshToken;
        setCookie('accessToken', accessToken, {});
        setCookie('refreshToken', refreshToken, {});
        return data;
    }
);

export const onLogout = createAsyncThunk<undefined, undefined, { rejectValue: TError }>(
    'user/onLogout',
    async function (_, { rejectWithValue }) {
        const response = await logoutRequest();
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error!' });
        }
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        const data = await response.json();
        return data;
    }
);


export const onReset = createAsyncThunk<boolean, TUser, { rejectValue: TError }>(
    'user/onReset',
    async function (user, { rejectWithValue }) {
        const response = await resetRequest(user);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error!' });
        }
        const data = await response.json();
        return data;
    }
);

export const onResetPassword = createAsyncThunk<boolean, TUser, { rejectValue: TError }>(
    'user/onResetPassword',
    async function (user, { rejectWithValue }) {
        const response = await resetPasswordRequest(user);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error!' });
        }
        const data = await response.json();
        return data;
    }
)

export const onUpdateUser = createAsyncThunk<TUserEditResponse, TUser, { rejectValue: TError }>(
    'user/onUpdateUser',
    async function (user, { rejectWithValue }) {
        const response = await editRequest(user);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error!' });
        }
        const data = await response.json();
        return data;
    }
)

export const onFetchOrder = createAsyncThunk<TOrders, string, { rejectValue: TError }>(
    'user/onFetchOrder',
    async function (number, { rejectWithValue }) {
        const response = await getOrderRequest(number);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error!' });
        }
        const data = await response.json();
        return data;
    }
)

export const onPlaceOrder = createAsyncThunk<{ order: TOrder }, string[], { rejectValue: TError }>(
    'user/onPlaceOrder',
    async function (cart, { rejectWithValue }) {
        const response = await placeOrderRequest(cart);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error!' });
        }
        const data = await response.json();
        return data;
    }
)