import { setCookie } from "./cookie";
import { refreshTokenRequest } from "./utils";
import { IResponse } from "../services/types";

export const checkResponse = (res: IResponse) => {
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
            setCookie("accessToken", refreshData.accessToken,);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(error);
        }
    }
}