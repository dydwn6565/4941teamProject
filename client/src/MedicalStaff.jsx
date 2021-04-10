import React, { useState, useEffect } from "react";
import { Row, Col, Dropdown, Button } from "react-bootstrap";
import Axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function MedicalStaff() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [updateNum, setUpdateNum] = useState("");
  const [list, setList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setselectedPatient] = useState("");
  const [patientID, setPatientId] = useState("");
  const [patientState, setPatientState] = useState("");

  useEffect(() => {
    const getPatient = () => {
      Axios.get("http://localhost:8001/patientList").then((response) => {
        setPatientList(response.data);
        console.log(response.data);
      });
    };
    getPatient();
  }, []);

  const RegisterRequest = () => {
    console.log(startTime.split(" ")[1]);
    console.log(endDate + " " + endTime);
    if (name === "" || position === "" || endDate === "" || endTime === "") {
      alert("please type empty section");
    } else if (startTime > endDate + " " + endTime) {
      alert("Your end time is forward than your start time");
    } else if (patientState === 1) {
      alert("This patient already has been scheduled  ");
    } else {
      Axios.put("http://localhost:8001/updateReserved", {
        patientID: patientID,
        name: name,
        position: position,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
      }).then((response) => {
        console.log(response);
        console.log("line55");
        Axios.post("http://localhost:8001/post/medicalStaff", {
          name: name,
          position: position,

          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          patientID: patientID,
        }).then((response) => {
          console.log(response);
        });
      });
    }
  };

  const UpdateMedicalStaff = () => {
    if (name === "" || position === "" || endDate === "" || endTime === "") {
      alert("please type empty section");
    } else if (startTime > endDate + " " + endTime) {
      alert("Your end time is forward than your start time");
    } else if (patientState === 1) {
      alert("This patient already has been scheduled  ");
    } else {
      Axios.put("http://localhost:8001/put/medicalStaff", {
        name: name,
        position: position,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        updateNum: updateNum,
        patientID: patientID,
      }).then((response) => {
        console.log(response);
      });
    }
  };

  const GetMedicalStaff = () => {
    Axios.get("http://localhost:8001/get/medicalStaff", {
      name: name,
      position: position,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      patientID: patientID,
    }).then((response) => {
      console.log(response.data);
      console.log(response.data[0].start_at);
      setList(response.data);
    });
  };

  const DeleteMedicalStaff = () => {
    console.log("line107");

    Axios.put("http://localhost:8001/updateNotReserved", {
      patientID: patientID,
    }).then((response) => {
      console.log(response);
      console.log("line 108 delete");

      Axios.delete("http://localhost:8001/delete/medicalStaff", {
        data: {
          updateNum: updateNum,
        },
      }).then((response) => {
        console.log(response);
      });
    });
  };

  return (
    <>
      <div class="d-flex justify-content-center">
        <div className="signup">
          <div class="d-flex justify-content-center">
            <h3>Create Schedule</h3>
          </div>
          <form>
            <div class="from-row">
              <div class="form-group col-md-6">
                <label for="inputName4">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputName4"
                  placeholder="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPosition4">Position</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputPosition4"
                  placeholder="name"
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                />
              </div>
              <div class="form-group col-md-6">
                {/* <label for="inputPosition4">Select Patient</label> */}
                <Dropdown>
                  <span>Select patient: </span>

                  <Dropdown.Toggle
                    variant="secondary btn-sm"
                    id="dropdown-basic"
                  >
                    Patient Id
                  </Dropdown.Toggle>
                  <br />

                  <Dropdown.Menu variant="secondary btn-sm" id="dropdown-basic">
                    {patientList &&
                      patientList.map((patient) => (
                        <Dropdown.Item
                          key={patientList.ID}
                          onClick={(e) => {
                            setselectedPatient(patient.date);
                            setStartTime(patient.date);
                            setPatientId(patient.ID);
                            setPatientState(patient.reservedState);
                          }}
                        >
                          {" "}
                          Patient#: {patient.ID}
                          <p>
                            {patient.reservedState === 1 ? (
                              <p>Reserved</p>
                            ) : (
                              <p>Not Reserved</p>
                            )}
                          </p>
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div class="form-group col-md-6">
                <label for="inputName4">Start Date:</label>
                {selectedPatient}
              </div>
              <div class="form-group col-md-6">
                <label for="inputName4">End Date: </label>
                <input
                  type="date"
                  class="form-control"
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
                <input
                  type="time"
                  class="form-control"
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                />
              </div>
              {/* <div class="form-group col-md-6">
                <label for="inputName4">Start Date:</label>
                <input
                  type="time"
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                />
              </div> */}
              <div class="form-group col-md-6">
                <label for="inputName4">Update Number:</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    setUpdateNum(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
          {/* <label>Name: </label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          /> */}
          {/* <br /> */}
          {/* <label>Position: </label>
          <input
            type="text"
            onChange={(e) => {
              setPosition(e.target.value);
            }} */}
          {/* /> */}
          {/* <br /> */}

          {/* <Dropdown>
            <span>Select patient: </span>
            <Dropdown.Toggle
              variant="secondary btn-sm"
              id="dropdown-basic"
            ></Dropdown.Toggle>
            <br />

            <Dropdown.Menu variant="secondary btn-sm" id="dropdown-basic">
              {patientList &&
                patientList.map((patient) => (
                  <Dropdown.Item
                    key={patientList.ID}
                    onClick={(e) => {
                      setselectedPatient(patient.date);
                      setStartTime(patient.date);
                      setPatientId(patient.ID);
                      setPatientState(patient.reservedState);
                    }}
                  >
                    {" "}
                    {patient.ID}
                    <p>
                      {patient.reservedState === 1 ? (
                        <p>Reserved</p>
                      ) : (
                        <p>Not Reserved</p>
                      )}
                    </p>
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown> */}

          {/* <span>Start Date: </span>
          {selectedPatient} */}
          {/* <span>End Date: </span>
          <input
            type="date"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
          <input
            type="time"
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          />
          <br /> */}
          {/* <span>
            Please type the number if you want to update or delete schedule
            Update Number:
          </span> */}
          {/* <input
            type="text"
            onChange={(e) => {
              setUpdateNum(e.target.value);
            }}
          /> */}
          <br />
          <br />
          <Button onClick={RegisterRequest}>Register doctor schedule</Button>
          <Button onClick={UpdateMedicalStaff}>update doctor schedule</Button>
          <Button onClick={GetMedicalStaff}>get doctor schedule</Button>
          <Button onClick={DeleteMedicalStaff}>delete doctor schedule</Button>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="schedule">
          <div>{list.position}</div>
          <h3>Schedule list</h3>
          <Row>
            <Col>Number</Col>
            <Col>Name</Col>
            <Col>Position</Col>
            <Col>Start Date</Col>
            <Col>End Date</Col>
            <Col>Patient Id</Col>
          </Row>
          {list.map((li) => (
            <>
              <Row>
                <Col>{li.Id}</Col>
                <Col>{li.name}</Col>
                <Col>{li.position}</Col>
                <Col>{li.start_at}</Col>
                <Col>{li.end_at}</Col>
                <Col>{li.patientID}</Col>
              </Row>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default MedicalStaff;
