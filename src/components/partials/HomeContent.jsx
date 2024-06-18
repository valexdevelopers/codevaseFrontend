import React from 'react';
import TopBar from '../partials/TopBar';
import { useLocation } from 'react-router-dom';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import HomePage from './content/HomePage';

function HomeContent() {
    const currentPath = useLocation();
  return (
    <div className="pageContent">
          <TopBar />
          {currentPath.pathname == "/login" &&
              <LoginForm/>
          }
          {currentPath.pathname == "/signup" &&
              <SignUpForm />
          }
          {currentPath.pathname == "/" &&
              <HomePage />
          }

    </div>
  )
}

export default HomeContent
