import { TError, TIngredient } from "."

export type TConstructorState = {
    bun: TIngredient | null,
    ingredients: Array<TIngredient> | [],
    orderNumber: number | null,
    orderRequest: boolean,
    success: boolean,
    orderError: null | undefined | TError,
}

export type TDrag = {
    dragIndex: number,
    hoverIndex: number
}