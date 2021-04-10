import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "react-bootstrap";
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
      <div class="d-flex justify-content-center p-5">
        <div className="createScehdule  ">
          <div class="d-flex justify-content-center ">
            <h3>Create Schedule</h3>
          </div>

          <form class="d-flex justify-content-center">
            <div class="form-row w-50">
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

                  <Dropdown.Toggle variant="success btn-sm" id="dropdown-basic">
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

          <br />
          <br />
          <div class="d-flex justify-content-center">
            <Button class="btn btn-primary btn-sm " onClick={RegisterRequest}>
              Register Schedule
            </Button>
            <Button
              class="btn btn-secondary btn-sm "
              onClick={UpdateMedicalStaff}
            >
              Update Schedule
            </Button>
            <Button class="btn btn-success btn-sm " onClick={GetMedicalStaff}>
              Get Schedule
            </Button>
            <Button class="btn btn-info btn-sm " onClick={DeleteMedicalStaff}>
              Delete Schedule
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="schedule">
          <div>{list.position}</div>
          <div className="d-flex justify-content-center">
            <h3>Schedule list</h3>
          </div>
          {/* <Row> */}
          <table class="table">
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">Name</th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Po
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  ST Date
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Ed Date
                </th>
                <th scope="col"># Patient</th>
              </tr>
            </thead>

            <tbody>
              {list.map((li) => (
                <>
                  <tr>
                    <td>{li.Id}</td>
                    <td>{li.name}</td>
                    <td>{li.position}</td>
                    <td>{li.start_at}</td>
                    <td>{li.end_at}</td>
                    <td style={{ textAlign: "center" }}>{li.patientID}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MedicalStaff;
