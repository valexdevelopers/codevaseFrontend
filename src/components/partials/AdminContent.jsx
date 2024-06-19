import React from 'react';
import TopBar from '../partials/TopBar';
import { useLocation } from 'react-router-dom';
import AllUsers from './content/admin/AllUsers'
import NewTask from './content/admin/NewTask'
import NewTaske from './content/admin/NewTaske'

function AdminContent() {
    const currentPath = useLocation();
    return (
        <div className="pageContent">
            <TopBar />
            {currentPath.pathname == "/admin/users/all" &&
                <AllUsers />
            }
            {/* {currentPath.pathname == "/task/all" &&
                <SignUpForm />
            } */}
            {currentPath.pathname == "/admin/task/new" &&
                // <NewTask />
                <NewTaske />
             } 

        </div>
    )
}

export default AdminContent
