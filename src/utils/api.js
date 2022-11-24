import { registerRequest, loginRequest, logoutRequest, resetRequest, editRequest, resetPasswordRequest } from "./utils";
import { setCookie, getCookie, deleteCookie } from "./cookie";
import { setUser, setLogoutUser, setEditUser, setEditUserRequest, setEditUserError, setResetRequest, setResetConfirmed, setResetError, setChangePasswordRequest, setChangePasswordConfirmed, setChangePasswordError } from "../services/reducers/userReducer";
import { refreshTokenRequest } from "./utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

//         .then(checkResponse)
//         .then(res => {
//             let authToken;
//             res.headers.forEach(header => {
//                 if (header.indexOf('Bearer') === 0) {
//                     authToken = header.split('Bearer ')[1];
//                 }
//             });
//             if (authToken) {
//                 setCookie('token', authToken);
//                 console.log(getCookie('token'));
//             }
//             console.log(res)
//             return res.json();
//         })

export const onRefreshToken = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (error) {
        if (error.message === "jwt expired") {
            const refreshData = await refreshTokenRequest();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken);

            options.headers.authorization = refreshData.accessToken;

            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(error);
        }
    }
}

export const onRegister = (body) => {
    console.log('registerApi', body);
    return async function (dispatch) {
        return registerRequest(body)
            .then(checkResponse)
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('accessToken', accessToken);
                setCookie('refreshToken', refreshToken);
                // console.log(getCookie('token'));
                // localStorage.setItem('refreshToken', refreshToken);
                dispatch(setUser(res));
                console.log('work');
            })
            .catch((err) => {
                console.warn(err);
                // dispatch(setRegistrationFailed());
            });
    }
}

export const onLogin = (body) => {
    return async function (dispatch) {
        loginRequest(body)
            .then(checkResponse)
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('accessToken', accessToken);
                setCookie('refreshToken', refreshToken);
                // localStorage.setItem('refreshToken', refreshToken);
                dispatch(setUser(res));

            })
            .catch((err) => {
                console.warn(err);
                // dispatch(setLoginFailed());
            });
    };
};

export const onLogout = () => {
    return async function (dispatch) {
        logoutRequest()
            .then(checkResponse)
            .then((res) => {
                dispatch(setLogoutUser());
                deleteCookie('refreshToken');
                // localStorage.removeItem('refreshToken');
            })
            .catch((err) => {
                console.warn(err);
            });
    };
};

export const onReset = (body) => {
    return async function (dispatch) {
        resetRequest(body)
            .then(checkResponse)
            .then((res) => {
                dispatch(setResetRequest(true))
                if (res.success) {
                    dispatch(setResetConfirmed(res.success))
                }
                dispatch(setResetRequest(false))
            })
            .catch((err) => {
                dispatch(setResetRequest(true))
                dispatch(setResetError(err))
                dispatch(setResetRequest(false))
            });
    };
};

export const onResetPassword = (body) => {
    return async function (dispatch) {
        resetPasswordRequest(body)
            .then(checkResponse)
            .then((res) => {
                dispatch(setChangePasswordRequest(true))
                if (res.success) {
                    dispatch(setChangePasswordConfirmed(res.success))
                }
                dispatch(setChangePasswordRequest(false))
            })
            .catch((err) => {
                dispatch(setChangePasswordRequest(true))
                dispatch(setChangePasswordError(err))
                dispatch(setChangePasswordRequest(false))
            });
    };
};

export const onEditUser = (user) => {
    return async function (dispatch) {
        editRequest(user)
            .then(checkResponse)
            .then((res) => {
                dispatch(setEditUserRequest(true))
                dispatch(setEditUser(res))
                dispatch(setEditUserRequest(false))
            })
            .catch((err) => {
                dispatch(setEditUserRequest(true))
                dispatch(setEditUserError(err))
                dispatch(setEditUserRequest(false))
            });
    };
};