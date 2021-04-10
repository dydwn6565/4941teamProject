import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./css/LogIn.css";

function LogIn() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:8001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].email);
      }
    });
  }, []);

  const logInRequest = () => {
    if (userEmail === "" || userPassword === "") {
      alert("There is empty input box. Please fill in.");
    } else {
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
          history.push("/");
        }
      });
    }
  };
  return (
    <div className="container">
      <div className="signin">
        <h1>Sign In</h1>
        <Form onSubmit={logInRequest}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              aria-required
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              aria-required
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button type="submit" id="signinBtn">
            Submit
          </Button>
        </Form>
        {/* <label>Email: </label>
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
      <button onClick={logInRequest}>Signin</button> */}
      </div>
    </div>
  );
}

export default LogIn;
