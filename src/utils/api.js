import { registerRequest, loginRequest, logoutRequest, resetRequest, editRequest, resetPasswordRequest } from "./utils";
import { setCookie, deleteCookie } from "./cookie";
import { setUser, setLogoutUser, setUpdateUser, setUpdateUserRequest, setUpdateUserError, setResetRequest, setResetConfirmed, setResetError, setChangePasswordRequest, setChangePasswordConfirmed, setChangePasswordError, setUserRequest, setUserError, setLogoutRequest, setLogoutError } from "../services/reducers/userReducer";
import { refreshTokenRequest } from "./utils";
import { setRemoveUserOrders } from "../services/reducers/dataReducer";

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

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
    return async function (dispatch) {
        dispatch(setUserRequest(true))
        return registerRequest(body)
            .then(checkResponse)
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('accessToken', accessToken);
                setCookie('refreshToken', refreshToken);
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
}

export const onLogin = (body) => {
    return async function (dispatch) {
        dispatch(setUserRequest(true))
        loginRequest(body)
            .then(checkResponse)
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                dispatch(setUser(res));
                setCookie('accessToken', accessToken);
                setCookie('refreshToken', refreshToken);
            })
            .catch((err) => {
                dispatch(setUserError(err))
                console.warn(err);
            })
            .finally(() => {
                dispatch(setUserRequest(false))
            })
    };
};

export const onLogout = () => {
    return async function (dispatch) {
        dispatch(setLogoutRequest(true))
        logoutRequest()
            .then(checkResponse)
            .then((res) => {
                // dispatch(setRemoveUserOrders())
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
    };
};

export const onReset = (body) => {
    return async function (dispatch) {
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
    };
};

export const onResetPassword = (body) => {
    return async function (dispatch) {
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
    };
};

export const onUpdateUser = (user) => {
    return async function (dispatch) {
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
    };
};