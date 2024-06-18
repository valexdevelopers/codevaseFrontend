import React from 'react';
import '../assets/styles/sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <button className="start-coding-button">Start Coding</button>
            <nav>
                <ul>
                    <li><a href="#search">Search Pens</a></li>
                    <li><a href="#challenges">Challenges</a></li>
                    <li><a href="#spark">Spark</a></li>
                    <li><a href="#pro">CodePen Pro</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
