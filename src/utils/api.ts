import { TError, TRefreshData } from "../services/types";
import { setCookie } from "./cookie";
import { refreshTokenRequest } from "./utils";
import { TIngredient } from "../services/types";

export type TIngredientResponse = {
    data: TIngredient[]
}

export interface IRefreshData {
    success: boolean;
    accessToken: string;
    refreshToken: string
}

export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const onRefreshToken = async (url: string, options: RequestInit) => {
    return fetch(url, options)
        .then(checkResponse)
        .catch(async (error: TError) => {
            if (error.message === "jwt expired") {
                const refreshData: TRefreshData = await refreshTokenRequest();
                if (!refreshData.success) {
                    Promise.reject(refreshData);
                }
                setCookie("accessToken", refreshData.accessToken, {});
                (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
                const res = await fetch(url, options);
                return await checkResponse(res);
            } else {
                return Promise.reject(error);
            }
        })
}