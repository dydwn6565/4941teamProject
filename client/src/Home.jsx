import React from "react";
import { Jumbotron, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <Container>
        <Jumbotron className="mt-5">
          <h1>Smobilpay Payments</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <Link to="/LogIn">
            <button>Login</button>
          </Link>
          <Link to="/Register">
            <button>SignUp</button>
          </Link>
          <Link to="/MedicalStaff">
            <button>medicalStaff</button>
          </Link>
          <Link to="/PatientList">
            <button>PatientList</button>
          </Link>
          <Row className="d-flex my-2 ml-1 align-middle">
            <span className="ml-2">Call us at +237 671234566868</span>
          </Row>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default Home;
