import React, { useState } from 'react'
import '../../../assets/styles/login.styles.css'
import * as BIcons from 'react-bootstrap-icons'
import logo from '../../../assets/images/logo/logo.png'
import axios from 'axios';
import Info from '../modal/info';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAdminAuthContext} from '../../../context/AdminAuthProvider';

function AdminLogin() {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [formResponse, setFormResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fetchCsrfToken = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/admin/auth/tokens/crsf_tokens`, {
            withCredentials: true, // Ensure cookies are sent
        });

    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await fetchCsrfToken()
            const csrfToken = Cookies.get('XSRF_TOKEN'); // Retrieve CSRF token from the cookie
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, data, {
                headers: {
                    'X-CSRF-Token': csrfToken, // Include CSRF token in headers
                },
                withCredentials: true,
            });
            const admin  = response.data.data; // store user in a variable
            Cookies.set('authAdmin', JSON.stringify(admin));
            console.log(`${Cookies.get('authAdmin')} not set`)
            // navigate('/admin/tasks/all'); //redirect
            // setFormResponse({ status: response.data.status, message: response.data.message });

        } catch (error) {
            let errorMessage = 'There was a problem with your registration: Please try again.';

            // Check if the error response exists and extract the server message
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            // setFormResponse({ status: error.response.data.error, message: errorMessage });
            console.error(error.response.data, errorMessage);
        } finally {
            setLoading(false);
            
        }
    };

    const { isAuthenticated} = useAdminAuthContext();

    if (isAuthenticated) {
        // Redirect to login page if not authenticated
        console.log( isAuthenticated)
        // return <Navigate to="/admin/tasks/all" />;
    }


    return (
        <div className="loginFormWrap">
            {formResponse && <Info status={formResponse.status} message={formResponse.message} />}
            <div className="form_wrap">
                <div className="logo_wrap">
                    <img src={logo} alt="" className="brandImage" />
                </div>
                <div className="loginformContainer">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="formTitle">
                            <h3>Admin Sign In</h3>
                        </div>
                        <div className="formContainer">
                            <label htmlFor="email" className="form-label loginFormLabel">Email</label>
                            <input
                                type="email"
                                className="form-control sqaureBorder"
                                id="email"
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
                            />
                            {errors.email && <span className="form_error">{errors.email.message}</span>}
                        </div>

                        <div className="formContainer">
                            <label htmlFor="password" className="form-label loginFormLabel">Password</label>
                            <div className="input-group password">
                                <input
                                    type={passwordVisibility ? 'text' : 'password'}
                                    className="form-control sqaureBorder removeOutline"
                                    id="password"
                                    {...register("password", { required: "Password is required", minLength: { value: 10, message: "Minimum length is 10 characters" }, maxLength: { value: 16, message: "Maximum length is 16 characters" } })}
                                />
                                <button
                                    type="button"
                                    className="btn showPassword"
                                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                                >
                                    {passwordVisibility ? <BIcons.EyeSlash /> : <BIcons.Eye />}
                                </button>
                            </div>
                            {errors.password && <span className="form_error">{errors.password.message}</span>}
                        </div>

                        <div className="remember">
                            <input type="checkbox" name="" id="" />
                            <label>Remember my login</label>
                        </div>
                        <div className="loginActionBtn">
                            <div className="formButtons"><button type="submit" className="appColorbtn btn-primary">Login</button></div>
                            <div className="formButtons"><button type="submit" className="appColorbtn btn-primary">Reset</button></div>
                        </div>
                        <div className="forgotPassword"><a href="/forgot-password">forgot password ?</a></div>
                    </form>
                </div >
            </div >
            {loading && (
                <div className="loading-overlay">
                    <img src="https://i.gifer.com/yy3.gif" alt="Loading..." />
                </div>
            )}
        </div >
    )
}

export default AdminLogin;
