import React, { useState } from "react";
import "../../../assets/styles/login.styles.css";
import * as BIcons from "react-bootstrap-icons";
import logo from "../../../assets/images/logo/logo.png";

function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userPasswordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordVisibility, setChangePasswordVisibility] = useState(false);
  return (
    <div className="loginFormWrap">
      <div className="signup_form_wrap">
        <div className="logo_wrap">
          <img src={logo} alt="" className="brandImage" />
        </div>
        <div className="loginformContainer">
          <form action="">
            <div className="formTitle">
              <h3>Create Account</h3>
            </div>
            <div className="form_error">
              <span>Password do not match</span>
            </div>
            <div class="formContainer">
              <label
                for="exampleFormControlInput1"
                class="form-label loginFormLabel"
              >
                FullName
              </label>
              <input
                type="text"
                class="form-control sqaureBorder"
                id="exampleFormControlInput1"
                required
                value={fullName}
                onChange={(event) => setFullName(() => event.target.value)}
              />
            </div>
            <div class="formContainer">
              <label
                for="exampleFormControlInput1"
                class="form-label loginFormLabel"
              >
                UserName
              </label>
              <input
                type="text"
                class="form-control sqaureBorder"
                id="exampleFormControlInput1"
                required
                value={userName}
                onChange={(event) => setUserName(() => event.target.value)}
              />
            </div>
            <div class="formContainer">
              <label
                for="exampleFormControlInput1"
                class="form-label loginFormLabel"
              >
                Email
              </label>
              <input
                type="text"
                class="form-control sqaureBorder"
                id="exampleFormControlInput1"
                required
                value={email}
                onChange={(event) => setEmail(() => event.target.value)}
              />
            </div>
            <div class="formContainer">
              <label
                for="exampleFormControlInput1"
                class="form-label loginFormLabel"
              >
                Password
              </label>
              <div class="input-group password">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  required
                  class="form-control sqaureBorder removeOutline"
                  aria-label="Password"
                  aria-describedby="button-addon2"
                  value={userPassword}
                  onChange={(event) => setPassword(() => event.target.value)}
                />
                {passwordVisibility ? (
                  <button
                    class="btn showPassword"
                    type="button"
                    id="button-addon2"
                    onClick={() =>
                      setChangePasswordVisibility((prevState) => !prevState)
                    }
                  >
                    <BIcons.EyeSlash />
                  </button>
                ) : (
                  <button
                    class="btn showPassword"
                    type="button"
                    id="button-addon2"
                    onClick={() =>
                      setChangePasswordVisibility((prevState) => !prevState)
                    }
                  >
                    <BIcons.Eye />
                  </button>
                )}
              </div>
            </div>
            <div class="formContainer">
              <label
                for="exampleFormControlInput1"
                class="form-label loginFormLabel"
              >
                Confirm Password
              </label>
              <div class="input-group password">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  required
                  class="form-control sqaureBorder removeOutline"
                  aria-label="Password"
                  aria-describedby="button-addon2"
                  value={userPasswordConfirmation}
                  onChange={(event) =>
                    setPasswordConfirmation(() => event.target.value)
                  }
                />
                {passwordVisibility ? (
                  <button
                    class="btn showPassword"
                    type="button"
                    id="button-addon2"
                    onClick={() =>
                      setChangePasswordVisibility((prevState) => !prevState)
                    }
                  >
                    <BIcons.EyeSlash />
                  </button>
                ) : (
                  <button
                    class="btn showPassword"
                    type="button"
                    id="button-addon2"
                    onClick={() =>
                      setChangePasswordVisibility((prevState) => !prevState)
                    }
                  >
                    <BIcons.Eye />
                  </button>
                )}
              </div>
            </div>
            <div className="loginActionBtn">
              <div className="formButtons">
                <button
                  type="submit"
                  className="mb-1 with_bg with_radius with_radius"
                >
                  Register
                </button>
              </div>
              <div className="formButtons">
                <a
                  href="/login"
                  className="bordered no_text_decoration btn_link white_text with_radius"
                >
                  Go to Login
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
