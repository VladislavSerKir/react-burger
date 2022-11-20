import { checkResponse, registerRequest, loginRequest, logoutRequest } from "./utils";
import { setCookie, getCookie, deleteCookie } from "./cookie";
import { setRegistrationFailed, setUser, setLoginFailed, removeUser } from "../services/reducers/userReducer";

// export const BASE_URL = `https://norma.nomoreparties.space/api`;

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

export const onRegister = (body) => {
    return async function (dispatch) {
        registerRequest(body)
            .then(checkResponse)
            .then((res) => {
                const authToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', authToken);
                console.log(getCookie('token'));
                localStorage.setItem('refreshToken', refreshToken);
                dispatch(setUser(res));
            })
            .catch((err) => {
                console.warn(err);
                dispatch(setRegistrationFailed());
            });
    }
}

export const onLogin = (body) => {
    return async function (dispatch) {
        loginRequest(body)
            .then(checkResponse)
            .then((res) => {
                const authToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', authToken);
                localStorage.setItem('refreshToken', refreshToken);
                dispatch(setUser(res));
            })
            .catch((err) => {
                console.warn(err);
                dispatch(setLoginFailed());
            });
    };
};

export const onLogout = () => {
    return async function (dispatch) {
        logoutRequest()
            .then(checkResponse)
            .then((res) => {
                deleteCookie('token');
                localStorage.removeItem('refreshToken');
                dispatch(removeUser());
            })
            .catch((err) => {
                console.warn(err);
            });
    };
};