import React from 'react';
import TopBar from '../partials/TopBar';
import { useLocation, Navigate } from 'react-router-dom';
import AllUsers from './content/admin/AllUsers';
import NewTask from './content/admin/NewTask';
import AllTasks from './content/admin/AllTasks';
import { useAdminAuthContext } from '../../context/AdminAuthProvider';

function AdminContent() {
    const currentPath = useLocation();
    
    return (
        <div className="pageContent">
            <TopBar />

            {currentPath.pathname === "/admin/users/all" && <AllUsers />}
            {currentPath.pathname === "/admin/task/all" && <AllTasks />}
            {currentPath.pathname === "/admin/task/new" && <NewTask />}
        </div>
    );
}

export default AdminContent;
