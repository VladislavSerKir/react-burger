import { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useTypedSelector } from "../../services/types";

export const ProtectedRoute: FC<{ children: React.ReactNode, path: string }> = ({ children, ...props }) => {
    const isAuthChecked = useTypedSelector(state => state.user.isAuthChecked);
    const user = useTypedSelector(state => state.user.userData.name);

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
