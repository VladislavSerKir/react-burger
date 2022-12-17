import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/utils';
import { checkResponse } from '../../utils/api';

const dataState = {
    ingredients: [],
    ingredientsRequest: false,
    success: false,
    errorMessage: null,
    ingredientsCurrentTab: 'bun',
    ingredientDetails: {
        ingredient: null
    },
    wsStart: false,
    wsConnectionStatus: true,
    wsError: null,
    orders: null
};

export const getAllIngredients = createAsyncThunk(
    'data',
    async function (_, { dispatch }) {
        dispatch(setIngredientsRequest(true))
        return fetch(`${BASE_URL}/ingredients`)
            .then(checkResponse)
            .then((data) => {
                dispatch(setIngredients(data))
            })
            .catch((error) => {
                dispatch(loadDataFail(error))
                console.warn(error)
            })
            .finally(() => {
                dispatch(setIngredientsRequest(false))
            })
    }
);

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
            state.success = action.success;
            state.ingredients = [];
        },
        getCardData: (state, action) => {
            state.ingredientDetails.ingredient = action.payload;
        },
        toggleIngredientsTab: (state, action) => {
            state.ingredientsCurrentTab = action.payload;
        },
        // setWebsocketConnectionStart: (state, action) => {
        //     state.wsStart = true;
        // },
        setWebsocketConnection: (state, action) => {
            state.wsConnectionStatus = action.payload;
        },
        setWebsocketConnectionError: (state, action) => {
            state.wsError = action.payload;
        },
        setWebsocketGetOrders: (state, action) => {
            state.orders = action.payload
        }
    },
})

export const { setIngredients, setIngredientsRequest, loadDataFail, getCardData, toggleIngredientsTab, setWebsocketConnectionStart, setWebsocketConnection, setWebsocketConnectionError, setWebsocketGetOrders, setWebsocketGetUserOrders } = dataSlice.actions
export const dataReducer = dataSlice.reducer