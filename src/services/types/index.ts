import { Action } from 'redux';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '..';

export type RootState = ReturnType<typeof rootReducer>

export const useTypedDispatch = () => useDispatch<AppThunkDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type AppThunkDispatch = ThunkDispatch<RootState, never, Action<string>>;

export type TwsActions = {
    wsConnection: string,
    wsOffline: string,
    wsOpen: string,
    wsError: string,
    wsMessage: string,
    wsClose: string
}

export type TPlaceOrder = {
    order: TOrder,
    name: string,
    success: boolean
}

export type TRefreshToken = {
    success: boolean,
    refreshToken: string,
    accessToken: string
}

export type TUserEditResponse = {
    success: boolean
    user: TUser,
} & TRefreshToken

export type TUserFetchResponse = {
    success: boolean
    user: TUser
}

export type TResponseWithoutPayload = {
    success: boolean,
    message: string
}

export type TError = {
    success?: boolean;
    message?: string
    status?: number
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