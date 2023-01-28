import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { onPlaceOrder } from '../actions/actions';
import { TIngredient } from '../types';
import { TConstructorState, TDrag } from '../types/constructorType';

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
        addIngredient: (state, action: PayloadAction<TIngredient>) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload;
            } else {
                state.ingredients = [action.payload, ...state.ingredients];
            }
        },
        moveIngredient: (state, action: PayloadAction<TDrag>) => {
            const ingredients = [...state.ingredients];
            ingredients.splice(action.payload.hoverIndex, 0, ingredients.splice(action.payload.dragIndex, 1)[0]);
            state.ingredients = ingredients
        },
        removeIngredient: (state, action: PayloadAction<number>) => {
            state.ingredients = [...state.ingredients].filter((item, index) => index !== action.payload);
        },
    },

    extraReducers: (builder) => {
        builder.addCase(onPlaceOrder.pending, (state) => {
            state.orderRequest = true
        })
        builder.addCase(onPlaceOrder.fulfilled, (state, action) => {
            state.orderNumber = action.payload.order.number;
            state.ingredients = [];
            state.bun = null;
            state.success = true;
            state.orderRequest = false
        })
        builder.addCase(onPlaceOrder.rejected, (state, action) => {
            state.orderError = action.payload;
            state.success = false;
            state.orderNumber = null;
            state.orderRequest = false
        })
    }
})

export const { addIngredient, removeIngredient, moveIngredient } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;