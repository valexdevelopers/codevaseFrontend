import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
// import SideBar from './SideBar';
import '../assets/styles/landingpage.css'; // Create and style the landing page using CSS
import htmlSnippet from '../assets/images/codeSnippet/javacodesnippet.png';
import cssSnippet from '../assets/images/codeSnippet/csscodesnippet.png';
import jsSnippet from '../assets/images/codeSnippet/javascript.png';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <SideBar />
            <div className="main-content">
                <div className="content-wrapper">
                    <h1>The best place to build, test, and discover front-end code.</h1>
                    <p>
                        CodePlatform is a social development environment for front-end designers and developers. Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.
                    </p>
                    <button className="sign-up-button">Sign Up for Free</button>
                    <div className="code-snippets">
                        <img src={htmlSnippet} alt="HTML Code Snippet" className="code-snippet" />
                        <img src={cssSnippet} alt="CSS Code Snippet" className="code-snippet" />
                        <img src={jsSnippet} alt="JavaScript Code Snippet" className="code-snippet" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
