import { getCookie } from "./cookie";
import { checkResponse } from "./api";
import { onRefreshToken } from "./api";

export const BASE_URL = `https://norma.nomoreparties.space/api`;

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

export const registerRequest = ({ email, password, name }) => {
    console.log('registerRequest', email, password, name)
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

export const loginRequest = async ({ email, password }) => {
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
            // token: localStorage.getItem('refreshToken')
        }),
    })
}

export const resetRequest = async ({ email }) => {
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

export const resetPasswordRequest = async ({ password, token }) => {
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

export const editRequest = async ({ email, name }) => {
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
            name: name
        }),
    })
}