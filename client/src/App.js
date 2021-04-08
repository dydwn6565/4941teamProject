import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MedicalStaff from "./MedicalStaff";
import Register from "./Register";
import LogIn from "./LogIn";
import Home from "./Home";
import PatientList from "./PatientList";
function App() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  // const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;
  // const register = () => {
  //   Axios.post("http://localhost:8001/register", {
  //     email: email,
  //     password: password,
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  // const login = () => {
  //   Axios.post("http://localhost:8001/login", {
  //     email: userEmail,
  //     password: userPassword,
  //   }).then((response) => {
  //     // console.log(response);
  //     if (!response.data.auth) {
  //       setLoginStatus(false);
  //     } else {
  //       console.log(response.data);
  //       localStorage.setItem("token", response.data.token);
  //       setLoginStatus(true);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   Axios.get("http://localhost:8001/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].email);
  //     }
  //   });
  // }, []);

  const userAuthenticated = () => {
    Axios.get("http://localhost:8001/authUser", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <Router>
        <Route path="/MedicalStaff" component={MedicalStaff} exact />
        <Route path="/Register" component={Register} exact />
        <Route path="/LogIn" component={LogIn} exact />
        <Route path="/" component={Home} exact />
        <Route path="/PatientList" component={PatientList} exact />
      </Router>
      <div className="App">
        {/* <div className="signup"> */}
        {/* <h1>Sign Up</h1>
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
          <button onClick={register}>Signup</button> */}
        {/* </div> */}
        {/* <br />
        <h3>OR</h3> */}
        {/* <div className="signin">
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
          <button onClick={login}>Signin</button>
        </div> */}

        {/* {loginStatus && (
          <>
            <button onClick={userAuthenticated}>Authentication check</button>
            {/* <Link path="medicalStaff"> */}
        {/* <button onClick={loadDoctorPage}>loadDoctorPage</button> */}
        {/* </Link> */}

        {/* )}  */}
      </div>
    </>
  );
}

export default App;
