import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { dataReducer } from './dataReducer';
import { constructorReducer } from './constructorReducer';
import { modalReducer } from './modalReducer';
// import thunk from 'redux-thunk';

// export const initialState = {
//     ingredients: [],
//     success: false,
//     ingredientsCurrentTab: 'bun',
//     orderDetails: {
//         isOpened: false,
//         orderNumber: null
//     },
//     ingredientDetails: {
//         isOpened: false,
//         ingredient: null
//     },
//     burgerConstructor: {
//         bun: null,
//         ingredients: [],
//     }
// };

const rootReducer = combineReducers({
    data: dataReducer,
    modal: modalReducer,
    burgerConstructor: constructorReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
        // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //     serializableCheck: false
        // }),
        // middleware: [thunk]
    });
}

export default createStore;

// const store = configureStore({
//     reducer: {
//         dataReducer,
//         // ingredient:ingredientReducer,
//         // modal: modalReducer
//     },
//     middleware: [thunk],
//     initialState
// })

