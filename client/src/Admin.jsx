import React from "react";
import Header from "./Header";
function Admin() {
  return (
    <>
      <Header />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Method</th>
            <th scope="col">Endpoint</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Requests
            </th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>POST</td>
            <td>/4537/termproject/API/V1/register</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>/4537/termproject/API/V1/login</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>/4537/termproject/API/V1/login</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>/4537/termproject/API/V1/post/medicalStaff</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>/4537/termproject/API/V1/get/medicalStaff</td>
          </tr>
          <tr>
            <td>PUT</td>
            <td>/4537/termproject/API/V1/put/medicalStaff</td>
          </tr>
          <tr>
            <td>DELETE</td>
            <td>/4537/termproject/API/V1/delete/medicalStaff</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>/4537/termproject/API/V1/createPatient</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>/4537/termproject/API/V1/patientList</td>
          </tr>
          <tr>
            <td>PUT</td>
            <td>/4537/termproject/API/V1/updatePatient</td>
          </tr>
          <tr>
            <td>DELETE</td>
            <td>/4537/termproject/API/V1/deletePatient/:ID</td>
          </tr>
          <tr>
            <td>PUT</td>
            <td>/4537/termproject/API/V1/updateReserved</td>
          </tr>
          <tr>
            <td>PUT</td>
            <td>/4537/termproject/API/V1/updateNotReserved</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Admin;
