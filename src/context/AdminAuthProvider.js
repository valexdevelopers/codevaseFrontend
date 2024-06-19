import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContextAdmin = createContext();

export const useAdminAuthContext = () => useContext(AuthContextAdmin);

export const AdminAuthProvider = ({ children }) => {
    const [authAdmin, setAuthAdmin] = useState(null);

    useEffect(() => {
        const storedAdmin = Cookies.get('authAdmin');
        if (storedAdmin) {
            try {
                const parsedAdmin = JSON.parse(storedAdmin);
                setAuthAdmin(parsedAdmin);
            } catch (error) {
                console.error('Error parsing authAdmin cookie:', error);
                // Handle the error as per your application's requirements
                // For example, clear the invalid cookie:
                Cookies.remove('authAdmin');
            }
        }
    }, []);

    const login = async () => {
        try {
            const credentials = ''; // Replace with actual credentials or login logic
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

            const { admin } = response.data.data;

            // Store admin in cookies or local storage
            Cookies.set('authAdmin', JSON.stringify(admin));
            setAuthAdmin(admin);

            return response;
        } catch (error) {
            let errorMessage = 'There was a problem with your login: Please try again.';

            // Check if the error response exists and extract the server message
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            console.error(error.response.data, errorMessage);
            throw error; // Ensure to re-throw the error so it's caught by the caller
        }
    };

    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('authAdmin');
        setAuthAdmin(null);
    };

    return (
        <AuthContextAdmin.Provider value={{ authAdmin, login, logout }}>
            {children}
        </AuthContextAdmin.Provider>
    );
};
