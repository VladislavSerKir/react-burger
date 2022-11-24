import { Route, Redirect, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ isAuth, user, children, ...props }) => {
    const location = useLocation();

    if (isAuth && user.email) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Redirect to={from} />;
    }

    if (!isAuth && !user.email) {
        return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
    }

    return <Route {...props}>{children}</Route>;
}
