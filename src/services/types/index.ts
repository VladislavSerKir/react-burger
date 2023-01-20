import { Action } from 'redux';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '..';

export type RootState = ReturnType<typeof rootReducer>

export const useTypedDispatch = () => useDispatch<AppThunkDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export type AppThunkDispatch = ThunkDispatch<RootState, any, Action<string>>;

export interface IResponse {
    success: boolean,
    [key: string]: any
}

export type TUser = {
    email: string,
    name: string,
    password: string,
    token: string
}

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
    index?: string | undefined
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