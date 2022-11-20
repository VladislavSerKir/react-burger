import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/api';
import { checkResponse } from '../../utils/utils';

const dataState = {
    ingredients: [],
    success: false,
    errorMessage: null,
    ingredientsCurrentTab: 'bun',
    ingredientDetails: {
        ingredient: null
    },
};

export const getAllIngredients = createAsyncThunk(
    'data',
    async function (_, { dispatch }) {
        return fetch(`${BASE_URL}/ingredients`)
            .then(checkResponse)
            .then((data) => {
                dispatch(setIngredients(data))
            })
            .catch((error) => {
                dispatch(loadDataFail(error))
                console.warn(error)
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
    },
})

export const { setIngredients, loadDataFail, getCardData, toggleIngredientsTab } = dataSlice.actions
export const dataReducer = dataSlice.reducer