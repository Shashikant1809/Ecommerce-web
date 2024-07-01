import React, { useState } from "react";
import "./LoginSignUp.css";
import { toast } from "react-toastify";
const url = "http://localhost:4000";
const LoginSignup = () => {
  const [state, setState] = useState("signUp");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const setLogin = () => {
    setState("Login");
  };
  const setSignUp = () => {
    setState("signUp");
  };

  const login = async () => {
    // console.log("login ", formData);
    let responseData;
    await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
      toast.success(responseData.message);
    } else {
      toast.error(responseData.error);
    }
  };
  const signup = async () => {
    // console.log("sign up", formData);

    let responseData;
    await fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
      toast.success(responseData.message);
    } else {
      toast.error(responseData.error);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {state === "Login" ? <h1>Login</h1> : <h1>Sign Up</h1>}
        <div className="loginsignup-fields">
          {state === "Login" ? (
            ""
          ) : (
            <input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Your Email"
          />
          <input
            onChange={changeHandler}
            name="password"
            value={formData.password}
            type="password"
            placeholder="Your Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state == "Login" ? (
          <p className="loginsignup-login">
            Create an account? <span onClick={setSignUp}>Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account? <span onClick={setLogin}>Login here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
