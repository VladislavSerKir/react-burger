import { createSlice } from '@reduxjs/toolkit'

const modalState = {
    ingredientDetails: {
        isOpened: false,
    },
    orderDetails: {
        isOpened: false,
    },
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState: modalState,
    reducers: {
        closeAllModals: (state, action) => {
            state.ingredientDetails.isOpened = false;
            state.orderDetails.isOpened = false
        },
        openIngredient: (state, action) => {
            state.ingredientDetails.isOpened = true;
        },
        setOpenOrderModal: (state, action) => {
            state.orderDetails.isOpened = true
        },
    },
})

export const { closeAllModals, openIngredient, setOpenOrderModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer