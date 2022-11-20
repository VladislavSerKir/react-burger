import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from './reducers/dataReducer';
import { constructorReducer } from './reducers/constructorReducer';
import { modalReducer } from './reducers/modalReducer';
import { userReducer } from './reducers'

const rootReducer = combineReducers({
    data: dataReducer,
    modal: modalReducer,
    burgerConstructor: constructorReducer,
    user: userReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}

// export default createStore;

