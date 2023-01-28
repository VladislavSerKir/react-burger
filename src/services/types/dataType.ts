import { TError, TIngredient } from ".";
import { TOrders } from ".";

export type TDataState = {
    ingredients: Array<TIngredient> | [] | undefined,
    ingredientsRequest: boolean,
    success: boolean,
    errorMessage: null | undefined | TError,
    ingredientsCurrentTab: string,
    ingredientDetails: {
        ingredient: TIngredient | null
    },
    wsOpen: boolean,
    wsUrl: string,
    wsConnectionStatus: boolean,
    wsError: null | string,
    fetchError: null | undefined | TError,
    fetchRequest: boolean,
    orders: null | TOrders
};