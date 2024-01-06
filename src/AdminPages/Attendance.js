import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import ViewAttendance from "./core/ViewAttendance";
const Attendance = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/bytesfarms/user/getEmployees")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <main
        className="  "
        style={{ marginLeft: "", backgroundColor: "#F0F5FD" }}
      >
        <div className="m-5">
          <h3 className="mb-3">TIMESHEET</h3>
          <table
            class="table rounded-4 "
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
            }}
          >
            <thead class="table-secondary p-2">
              <tr>
                <th className="text-center" scope="col" style={{padding:'20px'}}>
                  S.No
                </th>
                <th scope="col" style={{padding:'20px'}}>Name</th>
                <th style={{padding:'20px'}}>Email</th>
                <th style={{padding:'20px'}}>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <ViewAttendance userId={item.id} />
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Attendance;
