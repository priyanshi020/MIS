import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar1 from "../components/Sidebar1";
import ApplyLeave from "./core/ApplyLeave";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

const LeaveTracker = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [leavesData, setLeavesData] = useState({
    quarter: "",
    availableLeaves: 3,
    leavesTaken: 0,
    leaveWithoutPay: 0,
    totalHalfDay: 0,
  });

  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bytesfarms/leave/get?userId=${userId}&quarter=This`
        );
  
        const leavesDataFromApi = response.data;
  
        if (leavesDataFromApi.length > 0) {
          const latestLeavesData = leavesDataFromApi[leavesDataFromApi.length - 1];
  
          console.log("Latest Leaves data response:", latestLeavesData);
  
          setLeavesData({
            quarter: latestLeavesData.quarter,
            availableLeaves: latestLeavesData.availableLeaves,
            leavesTaken: latestLeavesData.leavesTaken,
            leaveWithoutPay: latestLeavesData.leaveWithoutPay,
            totalHalfDay: latestLeavesData.totalHalfDay,
          });
        }
      } catch (error) {
        console.error("Error fetching leaves data:", error.message);
      }
    };
  
    fetchData1();
  }, [userId]);
  
  

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLeave = (newUser) => {
    setData((prevData) => [...prevData, newUser]);
    fetchData();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:8080/bytesfarms/leave/get?userId=${userId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  const handleDeleteClick = (leaveRequestId) => {
    if (!leaveRequestId) {
      handleMenuClose();
      return;
    }

    const apiUrl = `http://localhost:8080/bytesfarms/leave/delete?leaveRequestId=${leaveRequestId}`;

    axios
      .delete(apiUrl)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting item:", error.message);
      })
      .finally(() => {
        handleMenuClose();
      });
  };

  return (
    <>
      <Sidebar1 />
      <main className="" style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-5">
          <div className="d-flex justify-content-between">
            <h3 className=" pb-3">Leaves</h3>
            <p className="text-secondary">( {leavesData.quarter})</p>
          </div>
          <div className="d-flex justify-content-around ">
            <div className="col-md-3" style={{ width: "225px" }}>
              <div
                className="card m-2 p-2 rounded-4 shadow shadow-lg"
                style={{ maxWidth: "280px" }}
              >
                <div className="row g-0">
                  <h5 className="pt-3 pb-4 text-center">Availabe Leave</h5>
                  <div className="text-center">
                    <img src="/assets/leave/casual.png" alt="leave" />
                  </div>
                  <h4 className="text-center text-secondary pt-4 pb-4">
                    {leavesData.availableLeaves}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-3" style={{ width: "225px" }}>
              <div
                className="card m-2 p-2 rounded-4 shadow shadow-lg"
                style={{ maxWidth: "280px" }}
              >
                <div className="row g-0">
                  <h5 className="pt-3 pb-4 text-center"> Leaves Taken</h5>
                  <div className="text-center">
                    <img
                      src="/assets/leave/sick.png"
                      alt="leave"
                      style={{ height: "50px" }}
                    />
                  </div>
                  <h4 className="text-center text-secondary pt-4 pb-4">
                    {leavesData.leavesTaken}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-3" style={{ width: "225px" }}>
              <div
                className="card m-2  p-2 rounded-4 shadow shadow-lg"
                style={{ maxWidth: "280px" }}
              >
                <div className="row g-0">
                  <h5 className="pt-3 pb-3 text-center"> Leave Without Pay</h5>
                  <div className="text-center">
                    <img src="/assets/leave/lwp.png" alt="leave" />
                  </div>
                  <h4 className="text-center text-secondary pt-3 pb-3">
                    {leavesData.leaveWithoutPay}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-3" style={{ width: "225px" }}>
              <div
                className="card m-2 p-2 rounded-4 shadow shadow-lg"
                style={{ maxWidth: "280px" }}
              >
                <div className="row g-0">
                  <h5 className="pt-3 pb-4 text-center">Half Day</h5>
                  <div className="text-center">
                    <img src="/assets/leave/earned.png" alt="leave" />
                  </div>
                  <h4 className="text-center text-secondary pt-4 pb-4">
                    {leavesData.totalHalfDay}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card m-2 p-2 rounded-4 shadow shadow-lg"
                style={{ maxWidth: "250px" }}
              >
                <div className="row g-0">
                  <div className="text-center mt-2">
                    <img
                      src="/assets/leave/upload.png"
                      alt="leave"
                      style={{ height: "55px" }}
                    />
                  </div>
                  <h5 className="text-center mt-2 ">Submit your leave</h5>
                  <h5 className="text-center  mb-3">application here</h5>
                  <div className="text-center mb-4">
                    <ApplyLeave onApplyLeave={handleLeave} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container pt-5">
            <table
              class="table "
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}
            >
              <thead class="table-secondary p-2">
                <tr>
                  <th style={{ padding: "20px" }} scope="col">
                    Leave Type
                  </th>
                  <th style={{ padding: "20px" }} scope="col">
                    Start Date
                  </th>
                  <th style={{ padding: "20px" }} scope="col">
                    End Date
                  </th>
                  <th style={{ padding: "20px" }} scope="col">
                    {" "}
                    Description
                  </th>
                  <th style={{ padding: "20px" }} scope="col">
                    Status{" "}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: "20px" }}>{item.leaveType}</td>
                    <td style={{ padding: "20px" }}>{item.startDate}</td>
                    <td style={{ padding: "20px" }}>{item.endDate}</td>
                    <td style={{ padding: "20px" }}>{item.description}</td>

                    <td>
                      {/* <button
                      type="button"
                      className={`badge rounded-pill d-inline ${
                        item.status === "Approved"
                        ? "badge-success"  // If status is "Approved", use the success style
                        : item.status === "Pending"
                          ? "badge-warning" // If status is "Pending", use the warning style
                          : "badge-danger"
                      }`}
                      style={{ minWidth: "100px" }}
                    >
                      {item.status}
                    </button></td> */}
                      <span
                        className={`badge rounded-pill d-inline ${
                          item.status === "approved"
                            ? "badge-success"
                            : item.status === "Pending"
                            ? "badge-warning"
                            : item.status === "rejected"
                            ? "badge-danger"
                            : ""
                        }`}
                      >
                        {item.status}
                      </span>{" "}
                    </td>
                    <td>
                      <IconButton
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        {/* <MenuItem onClick={handleClick}>Edit</MenuItem> */}
                        <MenuItem
                          onClick={handleDeleteClick.bind(null, item.id)}
                        >
                          Cancel Leave
                        </MenuItem>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default LeaveTracker;
