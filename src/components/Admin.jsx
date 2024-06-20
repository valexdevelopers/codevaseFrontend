import React, { useEffect } from 'react'
import AdminSideBar from './partials/AdminSideBar'
import AdminContent from './partials/AdminContent'
import '../assets/styles/homepage.styles.css'
import '../assets/styles/custom.css'
import { useAdminAuthContext } from '../context/AdminAuthProvider';
import AdminAuth from './partials/AdminAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Admin() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAdminAuthContext();


    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         console.log(isAuthenticated, 'Not authenticated admin from AdminContent');
    //         navigate('/admin/login');
    //     }
    // }, [isAuthenticated, navigate]);
    console.log(isAuthenticated, 'Not authenticated admin from AdminContent');
    return (
        <div className="adminhome">
            <AdminSideBar />
            <AdminContent />


        </div>
    )
    
}

export default Admin
