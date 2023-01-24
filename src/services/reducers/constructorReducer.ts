import { createSlice } from '@reduxjs/toolkit';
import { TConstructorState } from '../types/constructorType';

const constructorState: TConstructorState = {
    bun: null,
    ingredients: [],
    orderNumber: null,
    orderRequest: false,
    success: false,
    orderError: null
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState: constructorState,
    reducers: {
        addIngredient: (state, action) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload;
            } else {
                state.ingredients = [action.payload, ...state.ingredients];
            }
        },
        moveIngredient: (state, action) => {
            const ingredients = [...state.ingredients];
            ingredients.splice(action.payload.hoverIndex, 0, ingredients.splice(action.payload.dragIndex, 1)[0]);
            state.ingredients = ingredients
        },
        removeIngredient: (state, action) => {
            state.ingredients = [...state.ingredients].filter((item, index) => index !== action.payload);
        },
        setPlaceOrderRequest: (state, action) => {
            state.orderRequest = action.payload
        },
        setOrderNumber: (state, action) => {
            state.orderNumber = action.payload.order.number;
            state.ingredients = [];
            state.bun = null;
            state.success = true;
        },
        setResetOrderNumber: (state) => {
            state.orderNumber = null;
        },
        setStatusSuccess: (state, action) => {
            state.orderError = action.payload;
            state.success = false;
            state.orderNumber = null;
        }
    },
})

export const { addIngredient, removeIngredient, moveIngredient, setPlaceOrderRequest, setOrderNumber, setResetOrderNumber, setStatusSuccess } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;