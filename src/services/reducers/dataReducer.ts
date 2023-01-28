import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllIngredients, onFetchOrder } from '../actions/actions';
import { TIngredient, TOrders } from '../types';
import { TDataState } from '../types/dataType';

const dataState: TDataState = {
    ingredients: [],
    ingredientsRequest: false,
    success: false,
    errorMessage: null,
    ingredientsCurrentTab: 'bun',
    ingredientDetails: {
        ingredient: null
    },
    wsOpen: false,
    wsUrl: '',
    wsConnectionStatus: true,
    wsError: null,
    fetchError: null,
    fetchRequest: false,
    orders: null
};

export const dataSlice = createSlice({
    name: 'data',
    initialState: dataState,
    reducers: {
        getCardData: (state, action: PayloadAction<TIngredient>) => {
            state.ingredientDetails.ingredient = action.payload;
        },
        toggleIngredientsTab: (state, action: PayloadAction<string>) => {
            state.ingredientsCurrentTab = action.payload;
        },
        setWebsocketOpen: (state, action: PayloadAction<boolean>) => {
            state.wsOpen = action.payload;
            state.wsError = null;
        },
        setWebsocketClose: (state, action: PayloadAction<boolean>) => {
            state.wsOpen = false;
            state.wsUrl = ''
            state.wsError = null;
            state.orders = null;
        },
        setWebsocketConnection: (state, action: PayloadAction<string>) => {
            state.wsConnectionStatus = true;
            state.wsUrl = action.payload
        },
        setWebsocketOffline: (state) => {
            state.wsConnectionStatus = false;
        },
        setWebsocketConnectionError: (state, action: PayloadAction<null | string>) => {
            state.wsError = action.payload;
        },
        setWebsocketGetOrders: (state, action: PayloadAction<TOrders>) => {
            state.orders = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getAllIngredients.pending, (state) => {
            state.ingredientsRequest = true;
        })
        builder.addCase(getAllIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload.data;
            state.success = action.payload.success;
            state.ingredientsRequest = false;
        })
        builder.addCase(getAllIngredients.rejected, (state, action) => {
            state.errorMessage = action.payload;
            state.success = false;
            state.ingredients = [];
            state.ingredientsRequest = false;
        })
        builder.addCase(onFetchOrder.pending, (state) => {
            state.fetchRequest = true;
        })
        builder.addCase(onFetchOrder.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.fetchRequest = false;
            state.fetchError = null;
        })
        builder.addCase(onFetchOrder.rejected, (state, action) => {
            state.fetchError = action.payload;
            state.fetchRequest = false;
        })
    }
})

export const { getCardData, toggleIngredientsTab, setWebsocketOpen, setWebsocketClose, setWebsocketConnection, setWebsocketOffline, setWebsocketConnectionError, setWebsocketGetOrders } = dataSlice.actions
export const dataReducer = dataSlice.reducer