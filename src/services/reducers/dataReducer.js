import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { initialState } from './index';
import { BASE_URL } from '../../utils/data';
import { checkResponse } from '../../utils/utils';

const dataState = {
    ingredients: [],
    success: false,
    ingredientsCurrentTab: 'bun',
    ingredientDetails: {
        ingredient: null
    },
    orderDetails: {
        isOpened: false,
        orderNumber: null
    },
};

export const getAllIngredients = createAsyncThunk(
    'data',
    async function (_, { dispatch }) {
        return fetch(`${BASE_URL}/ingredients`)
            .then(checkResponse)
            .then((data) => {
                dispatch(setIngredients(data))
                return data
            })
            .catch((error) => {
                dispatch(loadDataFail())
                console.log(error)
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
            state.success = action.success;
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



// export function dataReducer(state = initialState, action = {}) {
//     switch (action.type) {
//         case LOAD_DATA:
//             return {
//                 ...state,
//                 ingredients: action.payload.data,
//                 success: action.payload.success,
//             }
//         case LOAD_DATA_FAIL:
//             return {
//                 ...state, success: false
//             }
//         case LOAD_CARD_DATA:
//             return {
//                 ...state,
//                 ingredientDetails: {
//                     ...state.ingredientDetails,
//                     isOpened: true,
//                     ingredient: action.payload
//                 },
//             }
//         case LOAD_SUMMARY_ORDER_DATA:
//             return {
//                 ...state,
//                 orderDetails: {
//                     ...state.orderDetails,
//                     isOpened: true,
//                     orderNumber: action.payload
//                 },
//                 burgerConstructor: {
//                     bun: null,
//                     ingredients: [],
//                 }
//             }
//         default:
//             return {
//                 ...state
//             }
//     }
// }