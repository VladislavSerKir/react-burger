import { getCookie } from '../../utils/cookie';
import { setWebsocketConnectionError, setWebsocketGetOrders, setWebsocketOpen, setWebsocketClose } from '../reducers/dataReducer';

export const socketMiddleware = () => {
    return store => {
        let socket = null;
        let url = '';

        return next => action => {
            const { type, payload } = action;
            const { dispatch } = store;

            const accessToken = getCookie('accessToken');

            if (type === 'data/setWebsocketConnection') {
                url = payload;

                socket = accessToken
                    ? new WebSocket(`${url}?token=${accessToken}`)
                    : new WebSocket(`${url}`);
            }

            if (type === 'data/setWebsocketOffline') {
                socket = null;
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch(setWebsocketOpen(true))
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
                    dispatch(setWebsocketClose(event.code.toString()))
                };
            }

            next(action);
        };
    };
}; 