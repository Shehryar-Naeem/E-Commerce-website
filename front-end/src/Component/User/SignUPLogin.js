import React, { useRef } from "react";
import { Link } from "react-router-dom";

const SingUpLogin = () => {
    const loginTab= useRef(null)
    const RegisterTab= useRef(null)
    const switchertab= useRef(null)
  return (
    <>
      <div className="login_signup_container">
        <div className="login_signup_box">
          <div>
            <div className="login_signup_toggle">
              <p onClick={(e) => switchTab(e, "login")}>Login</p>
              <p onClick={(e) => switchTab(e, "register")}>Register</p>
            </div>
            <button ref={switchertab}></button>
          </div>
          <form className="login_form" ref={loginTab} onSubmit={submitHandler}>
            <div className="login_Email">
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="login_password">
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forget">forget Password</Link>
            <input type="submit" value="login" className="login_btn"/>
          </form>
        </div>
      </div>
    </>
  );
};
