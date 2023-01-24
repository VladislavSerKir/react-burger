import { createSlice } from '@reduxjs/toolkit';
import { TModalState } from '../types/modalType';

const modalState: TModalState = {
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
        closeAllModals: (state) => {
            state.ingredientDetails.isOpened = false;
            state.orderDetails.isOpened = false
        },
        openIngredient: (state) => {
            state.ingredientDetails.isOpened = true;
        },
        setOpenOrderModal: (state) => {
            state.orderDetails.isOpened = true
        },
    },
})

export const { closeAllModals, openIngredient, setOpenOrderModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer