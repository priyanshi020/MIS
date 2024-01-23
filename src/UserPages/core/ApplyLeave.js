import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@mui/material";
import axios from "axios";

function AddUser({onApplyLeave}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [name, setName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Retrieve the user ID from local storage
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      // Set the user ID in the component state
      setUserId(storedUserId);
    }
  }, []);

  const loginEndpoint = `http://localhost:8080/bytesfarms/leave/apply?userId=${userId}`;
  const handleSubmit = async () => {
    const dataToAdd = {
      leaveType: leaveType,
           startDate: startDate,
           endDate: endDate,
           description:description,
    };

    try {
      // Add the job
      const response = await axios.post(loginEndpoint, dataToAdd);
      console.log("Job added successfully:", response.data);

      // Notify the parent component about the added job
      onApplyLeave(response.data);

    } catch (error) {
      console.error("Error adding job:", error.message);
    }

    setOpen(false);
  };
  

  return (
    <div className="container">
      <button
        variant="outlined"
        onClick={handleClickOpen}
        id="addbutton"
        className="btn btn-primary btn-sm-3 rounded-3  "
        style={{ backgroundColor: "#1B1A47" }}
        type="button"
        title="Add"
      >
        {/* <i className="fa fa-table"></i> */}
        Apply Leave
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontSize: "30px", fontWeight: "600" }}>
          Apply Leave
        </DialogTitle>
        <DialogContent>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Employee Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> */}

          <TextField
            id="leaveY=Type"
            select
            label="Leave Type"
            fullWidth
            variant="standard"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>

            <MenuItem value="Planned">Planned Leave</MenuItem>
            <MenuItem value="Unplanned">Unplanned Leave</MenuItem>
            <MenuItem value="Half Day">Half Day Leave</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="date"
            fullWidth
            variant="standard"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputProps={{
                style: { color: "gray" , paddingTop:'7px',paddingBottom:'7px'},
              }}
          />

{leaveType !== "Half Day" && (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="date"
              fullWidth
              variant="standard"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputProps={{
                style: { color: "gray", paddingTop: '7px', paddingBottom: '7px' },
              }}
              />
          )}


          <TextField
            autoFocus
            margin="dense"
            id="text"
            label=" Reason for leave"
            type="textarea"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className=" text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className=" text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddUser;
