import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ children, ...props }) => {
    const isAuthChecked = useSelector(state => state.user.isAuthChecked);
    const user = useSelector(state => state.user.userData.name);

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
