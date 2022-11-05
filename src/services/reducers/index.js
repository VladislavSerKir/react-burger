import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { dataReducer } from './dataReducer';
import { constructorReducer } from './constructorReducer';
import { modalReducer } from './modalReducer';

const rootReducer = combineReducers({
    data: dataReducer,
    modal: modalReducer,
    burgerConstructor: constructorReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}

export default createStore;

