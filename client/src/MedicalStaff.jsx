import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function MedicalStaff() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [updateNum, setUpdateNum] = useState("");
  const [list, setList] = useState([]);

  let content = null;
  // const RederGet = () => {
  //   return (
  //     <>
  //     {lis}
  //       <h1>{list.name}</h1>
  //     </>
  //   );
  // };

  const RegisterRequest = () => {
    if (name == "" || position == "" || startDate == "" || endDate == "") {
      alert("please type empty section");
    } else if (startDate > endDate) {
      alert("Your end time is forward than your start time");
    } else {
      Axios.post("http://localhost:8001/post/medicalStaff", {
        name: name,
        position: position,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
      }).then((response) => {
        console.log(response);
      });
    }
  };

  const UpdateMedicalStaff = () => {
    if (name == "" || position == "" || startDate == "" || endDate == "") {
      alert("please type empty section");
    } else if (startDate > endDate) {
      alert("Your end time is forward than your start time");
    } else {
      Axios.put("http://localhost:8001/put/medicalStaff", {
        name: name,
        position: position,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        updateNum: updateNum,
      }).then((response) => {
        console.log(response);
      });
    }
  };

  const GetMedicalStaff = () => {
    Axios.get("http://localhost:8001/get/medicalStaff", {
      name: name,
      position: position,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
    }).then((response) => {
      console.log(response.data);
      console.log(response.data[0].start_at);
      setList(response.data);
    });
  };

  const DeleteMedicalStaff = () => {
    Axios.delete("http://localhost:8001/delete/medicalStaff", {
      data: {
        updateNum: updateNum,
      },
    }).then((response) => {
      console.log(response);
    });
  };
  const changeDate = () => {
    list.map((li) => {
      <Col>{li.start_at}</Col>;
    });
    // console.log(typeof list[0].start_at);
  };
  return (
    <>
      <div className="signup">
        <h3>Sign Up</h3>
        <label>Name: </label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Position: </label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <br />
        <input
          type="date"
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        <br />
        <input
          type="time"
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        />
        <br />
        <input
          type="date"
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
        <br />
        <input
          type="time"
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
        />
        {/* <div className="w-25">
          <DateTimePickerComponent
            placeholder="Choose a date and time"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          ></DateTimePickerComponent>
        </div> */}
        {/* <div className="w-25">
          <DateTimePickerComponent
            selected={startDate}
            placeholder="Choose a date and time"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          ></DateTimePickerComponent>
        </div> */}
        <h6>Please type the number if you want to update or delete schedule</h6>
        <input
          type="text"
          onChange={(e) => {
            setUpdateNum(e.target.value);
          }}
        />
        <br />
        <br />
        <button onClick={RegisterRequest}>Register doctor schedule</button>
        <button onClick={UpdateMedicalStaff}>update doctor schedule</button>
        <button onClick={GetMedicalStaff}>get doctor schedule</button>
        <button onClick={DeleteMedicalStaff}>delete doctor schedule</button>
      </div>
      <div>{list.position}</div>

      <h3>Schedule list</h3>

      <Row>
        {/* <Col></Col> */}
        <Col>Number</Col>
        <Col>Name</Col>
        <Col>Position</Col>
        <Col>Start Date</Col>
        <Col>End Date</Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>

      {list.map((li) => (
        <>
          <Row>
            <Col></Col>
            <Col>{li.Id}</Col>
            <Col>{li.name}</Col>
            <Col>{li.position}</Col>
            <Col>
              {/* {li.start_at.split("T")[0] +
                " " +
                li.start_at.split("T")[1].split(".")[0]} */}
              {li.start_at}
              {/* {li.start_at} */}
            </Col>
            <Col>
              {/* {li.end_at.split("T")[0] +
                " " +
                li.end_at.split("T")[1].split(".")[0]} */}
              {li.end_at}
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>

          {/* <div></div> */}
        </>
      ))}
    </>
  );
}

export default MedicalStaff;
