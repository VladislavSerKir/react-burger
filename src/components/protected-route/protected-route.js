import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import { getCookie } from "../../utils/cookie";
// import { USER_ORDERS_WSS } from "../../utils/utils";

export const ProtectedRoute = ({ children, ...props }) => {
    const isAuthChecked = useSelector(state => state.user.isAuthChecked);
    const user = useSelector(state => state.user.userData.name);

    // if (user) {
    //     let userSocket = new WebSocket(`${USER_ORDERS_WSS}?token=${getCookie('accessToken')}`);
    // }

    return (
        <Route
            {...props}
            render={({ location }) => (
                isAuthChecked && user
                    ? (children)
                    : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                        />
                    )
            )}
        />
    );

}
