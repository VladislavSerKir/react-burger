import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponse } from '../../utils/utils';
import { BASE_URL } from '../../utils/data';

const constructorState = {
    bun: null,
    ingredients: [],
    orderNumber: null,
    success: false
}

// export const placeOrder = createAsyncThunk(
//     'constructor/placeOrder',
//     async function (_, { dispatch }) {
//         return fetch(`${BASE_URL}/orders`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify({
//                 "ingredients": [constructorState?.bun._id, ...constructorState.ingredients?.map((item) => item._id), constructorState?.bun._id]
//             })
//         })
//             .then(checkResponse)
//             .then((data) => {
//                 console.log(data)
//                 dispatch(saveOrderNumber(data))
//             })
//     }
// );

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState: constructorState,
    reducers: {
        addIngredient: (state, action) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload
            } else {
                state.ingredients = [action.payload, ...state.ingredients]
            }
        },
        moveIngredient: (state, action) => {
            const ingredients = [...state.ingredients];
            ingredients.splice(action.payload.hoverIndex, 0, ingredients.splice(action.payload.dragIndex, 1)[0]);
            state.ingredients = ingredients
        },
        removeIngredient: (state, action) => {
            state.ingredients = [...state.ingredients].filter((item, index) => index !== action.payload)
        },
        saveOrderNumber: (state, action) => {
            state.orderNumber = action.payload.order.number
            state.success = true
        },
        statusSuccess: (state, action) => {
            state.success = false
        }
    },
})

export const { addIngredient, removeIngredient, moveIngredient, saveOrderNumber, statusSuccess } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;

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