import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserAuthContext } from './context/UserAuthProvider';

const UserPrivateRoute = ({ element: Element, ...rest }) => {
    const { authUser } = useUserAuthContext();

    return (
        <Route
            {...rest}
            element={authUser ? <Element /> : <Navigate to="/login" replace />}
        />
    );
};

export default UserPrivateRoute;
