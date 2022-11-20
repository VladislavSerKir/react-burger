export const BASE_URL = `https://norma.nomoreparties.space/api`;

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const options = (method, body = null) => ({
    method: method,
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
        body
    }),
})

export const registerRequest = async (body) => {
    return fetch(`${BASE_URL}/auth/register`, options('POST', body))
}

export const loginRequest = async (body) => {
    return fetch(`${BASE_URL}/auth/login`, options('POST', body))
}

export const logoutRequest = async () => {
    return fetch(`${BASE_URL}/auth/logout`, options('POST'))
}