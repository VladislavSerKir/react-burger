import { Middleware } from "redux";
import { RootState, TwsActions } from "../types";

export const socketMiddleware = (wsActions: TwsActions): Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;
        let url = '';

        return next => action => {
            const { type, payload } = action;
            const { dispatch } = store;
            const { wsConnection, wsOffline, wsOpen, wsError, wsMessage, wsClose } = wsActions;

            if (type === wsConnection) {
                url = payload;
                socket = new WebSocket(`${url}`);
            }

            if (type === wsOffline) {
                if (socket) {
                    socket.close(1000, `Websocket closed`)
                    socket = null;
                }
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: wsOpen });
                };
                socket.onerror = event => {
                    dispatch({ type: wsError });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: wsMessage, payload: parsedData });
                };
                socket.onclose = event => {
                    dispatch({ type: wsClose, payload: event.code.toString() });
                };
            }

            next(action);
        };
    };
}; 