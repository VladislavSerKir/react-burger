import { TIngredient } from ".";
import { TOrders } from ".";

export type TDataState = {
    ingredients: Array<TIngredient> | [] | undefined,
    ingredientsRequest: boolean,
    success: boolean,
    errorMessage: string | null,
    ingredientsCurrentTab: string,
    ingredientDetails: {
        ingredient: TIngredient | null
    },
    wsOpen: boolean,
    wsClose: boolean,
    wsConnectionStatus: boolean,
    wsError: null | string,
    fetchError: null | string,
    fetchRequest: boolean,
    orders: null | TOrders
};