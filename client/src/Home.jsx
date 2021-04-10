import React from "react";
import { Jumbotron, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Home.css";
import { Navbar, Nav } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/PatientList">Patient list</Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/MedicalStaff">Medical staff</Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/LogIn">Login</Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/Register">Register</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Jumbotron className="mt-5">
          <h1>Appoinment management system</h1>
          <p>
            This website is for a manager who wants to manages appointment between doctors and
            patients in their database system. After signup or login if you already have an account,
            you can create, read, update, and delete any of the appointment.
          </p>

          <Row className="d-flex my-2 ml-1 align-middle">
            <span>Please start with register!</span>
          </Row>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default Home;
