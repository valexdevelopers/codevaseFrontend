import React, { useState } from 'react';
import '../../../assets/styles/login.styles.css';
import * as BIcons from 'react-bootstrap-icons';
import logo from '../../../assets/images/logo/logo.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Info from '../modal/info';

const SignUpForm = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [formResponse, setFormResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, data);
            setFormResponse({ status: response.data.status, message: response.data.message });
        } catch (error) {
            setFormResponse({ status: 'error', message: 'There was a problem with your registration. Please try again.' });
            console.error('There was a problem with your axios operation:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginFormWrap">
            {formResponse && <Info status={formResponse.status} message={formResponse.message} />}
            <div className="signup_form_wrap">
                <div className="logo_wrap">
                    <img src={logo} alt="Brand Logo" className="brandImage" />
                </div>
                <div className="loginformContainer">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="formTitle">
                            <h3>Create Account</h3>
                        </div>
                        {errors.email && (
                            <div className="form_error">
                                <span>{errors.email.message}</span>
                            </div>
                        )}
                        <div className="formContainer">
                            <label htmlFor="fullName" className="form-label loginFormLabel">Full Name</label>
                            <input
                                type="text"
                                className="form-control sqaureBorder"
                                id="fullName"
                                {...register("fullname", { required: "Full Name is required", pattern: { value: /^[A-Za-z\s]+$/i, message: "Invalid name format" } })}
                            />
                            {errors.fullname && <span className="form_error">{errors.fullname.message}</span>}
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
                        <div className="formContainer">
                            <label htmlFor="passwordConfirmation" className="form-label loginFormLabel">Confirm Password</label>
                            <div className="input-group password">
                                <input
                                    type={passwordVisibility ? 'text' : 'password'}
                                    className="form-control sqaureBorder removeOutline"
                                    id="passwordConfirmation"
                                    {...register("password_confirmation", { required: "Password confirmation is required", minLength: { value: 10, message: "Minimum length is 10 characters" }, maxLength: { value: 16, message: "Maximum length is 16 characters" } })}
                                />
                                <button
                                    type="button"
                                    className="btn showPassword"
                                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                                >
                                    {passwordVisibility ? <BIcons.EyeSlash /> : <BIcons.Eye />}
                                </button>
                            </div>
                            {errors.password_confirmation && <span className="form_error">{errors.password_confirmation.message}</span>}
                        </div>
                        <div className="loginActionBtn">
                            <div className="formButtons">
                                <button type="submit" className="mb-1 with_bg with_radius">Register</button>
                            </div>
                            <div className="formButtons">
                                <a href="/login" className="bordered no_text_decoration btn_link white_text with_radius">Go to Login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
