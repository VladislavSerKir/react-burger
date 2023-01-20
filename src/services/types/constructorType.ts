import { TIngredient } from "."

export type TConstructorState = {
    bun: TIngredient | null,
    ingredients: Array<TIngredient> | [],
    orderNumber: string | null,
    orderRequest: boolean,
    success: boolean,
    orderError: string | null
}