import React from 'react';
import TopBar from '../partials/TopBar';
import { useLocation } from 'react-router-dom';
import LoginForm from './forms/LoginForm';

function HomeContent() {
    const currentPath = useLocation();
  return (
    <div className="pageContent">
          <TopBar />
          {currentPath.pathname == "/login" &&
              <LoginForm/>
          }
    </div>
  )
}

export default HomeContent
