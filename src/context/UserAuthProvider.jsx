import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContextUser = createContext();

export const useUserAuthContext = () => useContext(AuthContextUser);

export const UserAuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const storedUser = Cookies.get('authUser');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setAuthUser(parsedUser);
            } catch (error) {
                console.error('Error parsing authUser cookie:', error);
                // Handle the error as per your application's requirements
                // For example, clear the invalid cookie:
                Cookies.remove('authUser');
            }
        }
    }, []);

    const login = async () => {
        try {
            const credentials = ''; // Replace with actual credentials or login logic
            const csrfToken = Cookies.get('XSRF_TOKEN'); // Retrieve CSRF token from the cookie
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/auth/refresh/signin`,
                credentials,
                {
                    headers: {
                        'X-CSRF-Token': csrfToken, // Include CSRF token in headers
                    },
                    withCredentials: true, // Ensure credentials (cookies) are sent with the request
                }
            );

            const { user } = response.data.data;

            // Store user in cookies or local storage
            Cookies.set('authUser', JSON.stringify(user));
            setAuthUser(user);

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
        Cookies.remove('authUser');
        setAuthUser(null);
    };

    return (
        <AuthContextUser.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContextUser.Provider>
    );
};
