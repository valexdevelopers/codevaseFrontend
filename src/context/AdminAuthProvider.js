import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContextAdmin = createContext();

export const useAdminAuthContext = () => useContext(AuthContextAdmin);

export const AdminAuthProvider = ({ children }) => {
    const [authAdmin, setAuthAdmin] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAdmin = Cookies.get('authAdmin');
        if (storedAdmin) {
            try {
                const parsedAdmin = JSON.parse(storedAdmin);
                setAuthAdmin(parsedAdmin);
                setIsAuthenticated(true);
                console.log('admin logged in from AdminAuthProvider');
            } catch (error) {
                console.error('Error parsing authAdmin cookie:', error);
                Cookies.remove('authAdmin'); // Remove invalid cookie
            }
        }
    }, []);

    const login = async (credentials) => {
        try {
            const csrfToken = Cookies.get('XSRF_TOKEN'); // Retrieve CSRF token from the cookie
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/admin/auth/refresh/signin`,
                credentials,
                {
                    headers: {
                        'X-CSRF-Token': csrfToken, // Include CSRF token in headers
                    },
                    withCredentials: true, // Ensure credentials (cookies) are sent with the request
                }
            );

            const { admin } = response.data.data; // Adjust according to actual response structure

            // Store admin in cookies or local storage
            Cookies.set('authAdmin', JSON.stringify(admin));
            setAuthAdmin(admin);
            setIsAuthenticated(true);

            return response;
        } catch (error) {
            let errorMessage = 'There was a problem with your login: Please try again.';

            // Check if the error response exists and extract the server message
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            console.error('Login error:', errorMessage);
            throw error; // Ensure to re-throw the error so it's caught by the caller
        }
    };

    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('authAdmin');
        setAuthAdmin(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContextAdmin.Provider value={{ authAdmin, isAuthenticated, login, logout }}>
            {children}
        </AuthContextAdmin.Provider>
    );
};
