import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from './reducers/dataReducer';
import { constructorReducer } from './reducers/constructorReducer';
import { modalReducer } from './reducers/modalReducer';
import { userReducer } from './reducers/userReducer';
import { socketMiddleware } from './middlewares/socketMiddleware';

const wsActions = {
    wsConnection: 'data/setWebsocketConnection',
    wsOffline: 'data/setWebsocketOffline',
    wsOpen: 'data/setWebsocketOpen',
    wsError: 'data/setWebsocketConnectionError',
    wsMessage: 'data/setWebsocketGetOrders',
    wsClose: 'data/setWebsocketClose',
}

export const rootReducer = combineReducers({
    data: dataReducer,
    modal: modalReducer,
    burgerConstructor: constructorReducer,
    user: userReducer
});

const store = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(socketMiddleware(wsActions)),
    });
}

export default store;