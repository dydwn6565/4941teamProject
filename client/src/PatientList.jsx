import React, { useState } from "react";
import "./PatientList.css";
import Axios from "axios";
function PatientList() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientList, setPatientList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const getPatient = () => {
    Axios.get("http://localhost:8001/patientList").then((response) => {
      setPatientList(response.data);
    });
  };

  const addPatient = () => {
    Axios.post("http://localhost:8001/createPatient", {
      name: name,
      city: city,
      mobile: mobile,
      gender: gender,
      date: date,
      time: time,
    }).then(() => {
      setPatientList([
        ...patientList,
        {
          name: name,
          city: city,
          mobile: mobile,
          gender: gender,
          date: date,
          time: time,
        },
      ]);
    });
  };

  const editPatientName = (ID) => {
    Axios.put("http://localhost:8001/updatePatient", {
      name: newName,
      city: newCity,
      mobile: newMobile,
      gender: newGender,
      date: newDate,
      time: newTime,
      ID: ID,
    }).then((response) => {
      console.log(`line 68: ${time}`);
      setPatientList(
        patientList.map((val) => {
          return val.ID === ID
            ? {
                ID: val.ID,
                name: newName,
                city: newCity,
                mobile: newMobile,
                gender: newGender,
                date: newDate,
                time: newTime,
              }
            : val;
        })
      );
    });
  };

  const removePatient = (ID) => {
    Axios.delete(`http://localhost:8001/deletePatient/${ID}`).then(
      (response) => {
        setPatientList(
          patientList.filter((val) => {
            return val.ID !== ID;
          })
        );
      }
    );
  };

  return (
    <div className="patientlist">
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>City:</label>
      <input
        type="text"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <label>Mobile:</label>
      <input
        type="text"
        value={mobile}
        onChange={(e) => {
          setMobile(e.target.value);
        }}
      />
      <label>Gender:</label>
      <input
        type="text"
        value={gender}
        onChange={(e) => {
          setGender(e.target.value);
        }}
      />
      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
        }}
      />
      <button onClick={addPatient}>Add Client</button>
      <br />
      <div className="allPatient">
        <button onClick={getPatient}>Show all patient</button>
        {patientList.map((val, key) => {
          return (
            <div className="patient" key={val.ID}>
              <div>
                <h3>Name: {val.name}</h3>
                <h3>City: {val.city}</h3>
                <h3>Mobile: {val.mobile}</h3>
                <h3>Gender: {val.gender}</h3>
                <h3>
                  Reservation date: {val.date} {val.time}
                </h3>
              </div>
              <div>
                Name:
                <input
                  type="text"
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
                <br />
                City:
                <input
                  type="text"
                  onChange={(e) => {
                    setNewCity(e.target.value);
                  }}
                />
                <br />
                Mobile:
                <input
                  type="text"
                  onChange={(e) => {
                    setNewMobile(e.target.value);
                  }}
                />
                <br />
                Gender:
                <input
                  type="text"
                  onChange={(e) => {
                    setNewGender(e.target.value);
                  }}
                />
                <br />
                Reservation date:
                <input
                  type="date"
                  onChange={(e) => {
                    setNewDate(e.target.value);
                  }}
                />
                <br />
                <input
                  type="time"
                  onChange={(e) => {
                    setNewTime(e.target.value);
                  }}
                />
                <br />
                <button
                  onClick={() => {
                    editPatientName(val.ID);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    removePatient(val.ID);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PatientList;
