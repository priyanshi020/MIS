import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar1 from "../components/Sidebar1";
import ApplyLeave from "./core/ApplyLeave";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

const LeaveTracker = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userId, setUserId] = useState("");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Retrieve the user ID from local storage
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      // Set the user ID in the component state
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('hii')
        const response = await axios.get(
          `http://localhost:8080/bytesfarms/leave/get?userId=${userId}`
        );
        setData(response.data); // Assuming the API response is an array
          console.log('useridd',
          userId)
        const leaveRequestId = response.data.id;
        console.log("yeh hu userdi h ", leaveRequestId);
        localStorage.setItem("userId", leaveRequestId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Sidebar1 />
      <main className="m-5">
        <h3>Leaves</h3>
        <div className="row ">
          <div className="col-md-2" style={{ width: "225px" }}>
            <div
              className="card m-2 p-2 rounded-4 shadow shadow-lg"
              style={{ maxWidth: "280px" }}
            >
              <div className="row g-0">
                <h5 className="pt-3 pb-4 text-center">Casual Leave</h5>
                <div className="text-center">
                  <img src="/assets/leave/casual.png" alt="leave" />
                </div>
                <h6 className="text-center text-secondary pt-4">
                  Available: 20
                  <br />
                </h6>
                <h6 className="text-center text-secondary pb-4">
                  Booked &nbsp; &nbsp;: 00
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-2" style={{ width: "225px" }}>
            <div
              className="card m-2 p-2 rounded-4 shadow shadow-lg"
              style={{ maxWidth: "280px" }}
            >
              <div className="row g-0">
                <h5 className="pt-3 pb-4 text-center">Sick Leave</h5>
                <div className="text-center">
                  <img
                    src="/assets/leave/sick.png"
                    alt="leave"
                    style={{ height: "50px" }}
                  />
                </div>
                <h6 className="text-center text-secondary pt-4">
                  Available: 20
                  <br />
                </h6>
                <h6 className="text-center text-secondary pb-4">
                  Booked &nbsp; &nbsp;: 00
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-2" style={{ width: "225px" }}>
            <div
              className="card m-2  p-2 rounded-4 shadow shadow-lg"
              style={{ maxWidth: "280px" }}
            >
              <div className="row g-0">
                <h5 className="pt-3 pb-3 text-center"> Leave Without Pay</h5>
                <div className="text-center">
                  <img src="/assets/leave/lwp.png" alt="leave" />
                </div>
                <h6 className="text-center text-secondary pt-3">
                  Available: 20
                  <br />
                </h6>
                <h6 className="text-center text-secondary pb-3">
                  Booked &nbsp; &nbsp;: 00
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-2" style={{ width: "225px" }}>
            <div
              className="card m-2 p-2 rounded-4 shadow shadow-lg"
              style={{ maxWidth: "280px" }}
            >
              <div className="row g-0">
                <h5 className="pt-3 pb-4 text-center">Earned Leave</h5>
                <div className="text-center">
                  <img src="/assets/leave/earned.png" alt="leave" />
                </div>
                <h6 className="text-center text-secondary pt-4">
                  Available: 20
                  <br />
                </h6>
                <h6 className="text-center text-secondary pb-4">
                  Booked &nbsp; &nbsp;: 00
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card m-2 p-2 rounded-4 shadow shadow-lg"
              style={{ maxWidth: "280px" }}
            >
              <div className="row g-0">
                <div className="text-center mt-3">
                  <img
                    src="/assets/leave/upload.png"
                    alt="leave"
                    style={{ height: "65px" }}
                  />
                </div>
                <h5 className="text-center mt-3 ">Submit your leave</h5>
                <h5 className="text-center  mb-3">application here</h5>
                <div className="text-center mb-3">
                  <ApplyLeave />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-4">
          <table class="table ">
            <thead class="table-secondary ">
              <tr>
                <th scope="col">Leave Type</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col"> description</th>
                <th scope="col">Status </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.leaveType}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.description}</td>

                  <td>
                    <button
                      type="button"
                      className={`btn ${
                        item.status === "Approved"
                          ? "btn-outline-success"
                          : "btn-outline-danger"
                      }`}
                      style={{ minWidth: "100px" }}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td>
                    <IconButton aria-haspopup="true" onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleClick}>Edit</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </Menu>
                  </td>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle
                      style={{ fontSize: "30px", fontWeight: "600" }}
                    >
                      Edit a User
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label=" Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="name"
                        // value={userData.name}
                        // onChange={handleInputChange}
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label=" Designation"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="name"
                        // value={userData.name}
                        // onChange={handleInputChange}
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        // value={userData.email}
                        // onChange={handleInputChange}
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="number"
                        label="Contact No"
                        type="number"
                        fullWidth
                        variant="standard"
                        // value={userData.email}
                        // onChange={handleInputChange}
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        label="Joining Date"
                        type="Date"
                        fullWidth
                        variant="standard"
                        // value={userData.email}
                        // onChange={handleInputChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        className="bg-dark text-white"
                      >
                        Cancel
                      </Button>
                      <Button className="bg-dark text-white">Edit</Button>
                    </DialogActions>
                  </Dialog>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default LeaveTracker;
