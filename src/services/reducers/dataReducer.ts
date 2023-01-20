import { createSlice } from '@reduxjs/toolkit';
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
    wsClose: true,
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
        setIngredients: (state, action) => {
            state.ingredients = action.payload.data;
            state.success = action.payload.success;
        },
        setIngredientsRequest: (state, action) => {
            state.ingredientsRequest = action.payload
        },
        loadDataFail: (state, action) => {
            state.errorMessage = action.payload;
            state.success = false;
            state.ingredients = [];
        },
        getCardData: (state, action) => {
            state.ingredientDetails.ingredient = action.payload;
        },
        toggleIngredientsTab: (state, action) => {
            state.ingredientsCurrentTab = action.payload;
        },
        setWebsocketOpen: (state, action) => {
            state.wsOpen = action.payload;
            state.wsError = null;
        },
        setWebsocketClose: (state, action) => {
            state.wsClose = action.payload;
            state.wsError = null;
        },
        setWebsocketConnection: (state, action) => {
            state.wsConnectionStatus = true;
        },
        setWebsocketOffline: (state) => {
            state.wsConnectionStatus = false;
            state.orders = null;
        },
        setWebsocketConnectionError: (state, action) => {
            state.wsError = action.payload;
        },
        setWebsocketGetOrders: (state, action) => {
            state.orders = action.payload;
        },
        setFetchOrder: (state, action) => {
            state.orders = action.payload;
        },
        setFetchOrderRequest: (state, action) => {
            state.fetchRequest = action.payload;
        },
        setFetchOrderError: (state, action) => {
            state.fetchError = action.payload;
        }
    },
})

export const { setIngredients, setIngredientsRequest, loadDataFail, getCardData, toggleIngredientsTab, setWebsocketOpen, setWebsocketClose, setWebsocketConnection, setWebsocketOffline, setWebsocketConnectionError, setWebsocketGetOrders, setFetchOrder, setFetchOrderRequest, setFetchOrderError } = dataSlice.actions
export const dataReducer = dataSlice.reducer