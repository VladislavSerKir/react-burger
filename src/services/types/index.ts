import { Action } from 'redux';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '..';

export type RootState = ReturnType<typeof rootReducer>

export const useTypedDispatch = () => useDispatch<AppThunkDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type AppThunkDispatch = ThunkDispatch<RootState, never, Action<string>>;

export interface IResponse {
    success: boolean,
    [key: string]: any
}

export type TwsActions = {
    wsConnection: string,
    wsOffline: string,
    wsOpen: string,
    wsError: string,
    wsMessage: string,
    wsClose: string
}

export type TError = {
    success: boolean;
    message?: string
}

export type TRefreshData = {
    success: boolean;
    accessToken: string
}

export type TUser = {
    email: string,
    name: string,
    password: string,
    token: string
}

// export type TUser = {
//     email?: string | undefined,
//     name?: string | undefined,
//     password?: string | undefined,
//     token?: string | undefined
// }

// export type TIngredient = {
//     _id?: string;
//     name?: string;
//     type?: string;
//     proteins?: number;
//     fat?: number;
//     carbohydrates?: number;
//     calories?: number;
//     price?: number;
//     image?: string;
//     image_mobile?: string;
//     image_large?: string;
//     __v?: number;
// }

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
    index?: string
}

export type TOrders = {
    success: boolean,
    orders: Array<TOrder>,
    total: number,
    totalToday: number
}

export type TOrder = {
    _id: string,
    ingredients: Array<string>,
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number
}