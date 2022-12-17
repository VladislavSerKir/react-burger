import { getCookie } from '../../utils/cookie';
import { setWebsocketConnectionError, setWebsocketConnection, setWebsocketGetOrders, setWebsocketGetUserOrders } from '../reducers/dataReducer';

export const socketMiddleware = () => {
    return store => {
        let socket = null;
        let url = '';

        // socket = new WebSocket(ORDERS_WSS);
        // userSocket = new WebSocket(`${USER_ORDERS_WSS}?token=${getCookie('accessToken')}`);

        return next => action => {
            const { type, payload } = action;
            const { dispatch } = store;

            const token = getCookie('accessToken');

            if (type === 'data/setWebsocketConnection') {
                url = payload;

                socket = token
                    ? new WebSocket(`${url}?token=${token}`)
                    : new WebSocket(`${url}`);
            }
            // console.log(url, socket, type);

            if (socket) {
                socket.onopen = event => {
                    // dispatch(setWebsocketConnection(true))
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
                    // dispatch(setWebsocketConnection(false))
                };
            }

            next(action);
        };
    };
}; 