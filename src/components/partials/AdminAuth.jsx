import React from 'react';
import TopBar from '../partials/TopBar';
import { useLocation, Navigate } from 'react-router-dom';
import AdminSignUp from './forms/AdminSignUp'
import AdminLogin from './forms/AdminLogin'
import { useAdminAuthContext } from '../../context/AdminAuthProvider';

function AdminAuth() {
    const currentPath = useLocation();
    const { isAuthenticated } = useAdminAuthContext();

    if (isAuthenticated) {
        // Redirect to login page if not authenticated
        console.log(isAuthenticated, 'Admin currently logged in, cant create account or log in again, from AdminAuth');
        // <Navigate to="/admin/task/all" replace />;
    }


    return (
        <div className="pageContent">
            <TopBar />
            {currentPath.pathname == "/admin/login" &&
                <AdminLogin />
            }
            {currentPath.pathname == "/admin/signup" &&
                <AdminSignUp />
            }
            
        </div>
    )
}

export default AdminAuth
