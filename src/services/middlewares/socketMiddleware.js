import { getCookie } from '../../utils/cookie';
import { ORDERS_WSS, USER_ORDERS_WSS } from '../../utils/utils';
import { setWebsocketConnectionError, setWebsocketConnection, setWebsocketGetOrders, setWebsocketGetUserOrders } from '../reducers/dataReducer';

export const socketMiddleware = () => {
    return store => {
        let socket, userSocket = null;

        socket = new WebSocket(ORDERS_WSS);
        userSocket = new WebSocket(`${USER_ORDERS_WSS}?token=${getCookie('accessToken')}`);

        return next => action => {
            const { dispatch } = store;

            if (socket) {
                socket.onopen = event => {
                    dispatch(setWebsocketConnection(true))
                };
                socket.onerror = event => {
                    dispatch(setWebsocketConnectionError(event))
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(setWebsocketGetOrders(parsedData))
                };
                socket.onclose = event => {
                    dispatch(setWebsocketConnection(false))
                };
            }

            if (userSocket) {
                userSocket.onopen = event => {
                };
                userSocket.onerror = event => {
                    dispatch(setWebsocketConnectionError(event))
                };
                userSocket.onmessage = event => {
                    const { data } = event;
                    const userParsedData = JSON.parse(data);
                    dispatch(setWebsocketGetUserOrders(userParsedData))
                };
                userSocket.onclose = event => {
                };
            }

            next(action);
        };
    };
}; 