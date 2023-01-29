import { registerRequest, loginRequest, logoutRequest, resetRequest, editRequest, resetPasswordRequest, getOrderRequest, placeOrderRequest, userRequest, BASE_URL } from "../../utils/utils";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import { setUser, setUserRequest, setUserError, setAuthChecked } from "../reducers/userReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError, TIngredient, TResponseWithoutPayload, TOrders, TPlaceOrder, TUser, TUserEditResponse, TUserFetchResponse } from "../types";

export interface IIngredients {
    success: boolean,
    data: TIngredient[]
}

export const getAllIngredients = createAsyncThunk<IIngredients, undefined, { rejectValue: TError }>(
    'data/getAllIngredients',
    async function (_, { rejectWithValue }) {
        const response = await fetch(`${BASE_URL}/ingredients`);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method getAllIngredients' });
        }
        const data: IIngredients = await response.json();
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
            .then((user: TUserFetchResponse) => {
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
            return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onRegister' });
        }
        const data: TUserEditResponse = await response.json();
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
            return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onLogin' });
        }
        const data: TUserEditResponse = await response.json();
        const accessToken = data.accessToken.split('Bearer ')[1];
        const refreshToken = data.refreshToken;
        setCookie('accessToken', accessToken, {});
        setCookie('refreshToken', refreshToken, {});
        return data;
    }
)

export const onLogout = createAsyncThunk<TResponseWithoutPayload, undefined, { rejectValue: TError }>(
    'user/onLogout',
    async function (_, { rejectWithValue }) {
        const response = await logoutRequest();
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onLogout' });
        }
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        const data: TResponseWithoutPayload = await response.json();
        return data;
    }
);


export const onReset = createAsyncThunk<TResponseWithoutPayload, TUser, { rejectValue: TError }>(
    'user/onReset',
    async function (user, { rejectWithValue }) {
        const response = await resetRequest(user);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onReset' });
        }
        const data: TResponseWithoutPayload = await response.json();
        return data;
    }
)

export const onResetPassword = createAsyncThunk<TResponseWithoutPayload, TUser, { rejectValue: TError }>(
    'user/onResetPassword',
    async function (user, { rejectWithValue }) {
        const response = await resetPasswordRequest(user);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onResetPassword' });
        }
        const data: TResponseWithoutPayload = await response.json();
        return data;
    }
);

export const onUpdateUser = createAsyncThunk<TUserEditResponse, TUser, { rejectValue: TError }>(
    'user/onUpdateUser',
    async function (user, { rejectWithValue }) {
        const response = await editRequest(user);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onUpdateUser' });
        }
        const data: TUserEditResponse = await response.json();
        return data;
    }
)

export const onFetchOrder = createAsyncThunk<TOrders, string, { rejectValue: TError }>(
    'data/onFetchOrder',
    async function (number, { rejectWithValue }) {
        const response = await getOrderRequest(number);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onFetchOrder' });
        }
        const data: TOrders = await response.json();
        return data;
    }
)

export const onPlaceOrder = createAsyncThunk<TPlaceOrder, string[], { rejectValue: TError }>(
    'constructor/onPlaceOrder',
    async function (cart, { rejectWithValue }) {
        const response = await placeOrderRequest(cart);
        if (!response.ok) {
            return rejectWithValue({ status: response.status, message: 'Server Error, take a look on method onPlaceOrder' });
        }
        const data: TPlaceOrder = await response.json();
        return data;
    }
)