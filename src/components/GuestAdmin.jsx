import React from 'react'
import AdminSideBar from './partials/AdminSideBar'
import AdminContent from './partials/AdminContent'
import '../assets/styles/homepage.styles.css'
import '../assets/styles/custom.css'
import { useAdminAuthContext } from '../context/AdminAuthProvider';
import AdminAuth from './partials/AdminAuth';
import { Navigate } from 'react-router-dom';

function GuestAdmin() {

    const { isAuthenticated } = useAdminAuthContext();
    if (isAuthenticated) {
        // return <Navigate to="/admin/task/all"/>
    }
    return (
        <div className="adminhome">
            <AdminSideBar />
            <AdminAuth />
         

        </div>
    )
}

export default GuestAdmin
