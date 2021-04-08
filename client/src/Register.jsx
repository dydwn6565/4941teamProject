import React, { useState, useEffect } from "react";
import Axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const RegisterRequest = () => {
    Axios.post("http://localhost:8001/register", {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };
  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <label>Email: </label>
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={RegisterRequest}>Signup</button>
    </div>
  );
}

export default Register;
