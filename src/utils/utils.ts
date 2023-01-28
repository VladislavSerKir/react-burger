import { getCookie } from "./cookie";
import { checkResponse } from "./api";
import { onRefreshToken } from "./api";
import { TUser } from "../services/types";

export const BASE_URL = `https://norma.nomoreparties.space/api`;
export const BASE_WSS = `wss://norma.nomoreparties.space`;

export const placeOrderRequest = async (cart: Array<string>) => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken'),
        },
        body: JSON.stringify({
            "ingredients": cart,
        })
    })
}

export const userRequest = () => {
    return onRefreshToken(`${BASE_URL}/auth/user`, {
        headers: {
            Authorization: 'Bearer ' + getCookie('accessToken'),
        },
    })
}

export const refreshTokenRequest = async () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getCookie("refreshToken"),
        }),
    })
        .then(checkResponse);
};

export const registerRequest = ({ email, password, name }: TUser) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        }),
    })
}

export const loginRequest = async ({ email, password }: TUser) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
}

export const logoutRequest = async () => {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            token: getCookie('refreshToken')
        }),
    })
}

export const resetRequest = async ({ email }: TUser) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            email: email
        }),
    })
}

export const resetPasswordRequest = async ({ password, token }: TUser) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            password: password,
            token: token
        }),
    })
}

export const editRequest = async ({ email, name, password }: TUser) => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            email: email,
            name: name,
            password: password
        }),
    })
}

export const getOrderRequest = async (number: string) => {
    return fetch(`${BASE_URL}/orders/${number}`, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
}