import React, { useState, useEffect } from "react";
import Axios from "axios";

function LogIn() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].email);
      }
    });
  }, []);

  const logInRequest = () => {
    Axios.post("http://localhost:8001/login", {
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      // console.log(response);
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
      }
    });
  };
  return (
    <div className="signin">
      <h1>Sign In</h1>
      <label>Email: </label>
      <input
        type="text"
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
      />
      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={logInRequest}>Signin</button>
    </div>
  );
}

export default LogIn;
