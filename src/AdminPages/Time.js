import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TimeTracker = () => {
  const [project, setProject] = React.useState("");
  const [role, setRole] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [elapsedTimes, setElapsedTimes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [submitTask, setSubmitTask] = useState([]);
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    // Initialize timers and elapsedTimes arrays with default values
    const initialTimers = tasks.map(() => false);
    const initialElapsedTimes = tasks.map(() => 0);

    setTimers(initialTimers);
    setElapsedTimes(initialElapsedTimes);
  }, [tasks]);

  useEffect(() => {
    // Update elapsed time for each task independently
    const interval = setInterval(() => {
      setElapsedTimes((prevElapsedTimes) =>
        prevElapsedTimes.map((time, index) => (timers[index] ? time + 1 : time))
      );
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [timers]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;
  };

  const handleButtonClick = (index) => {
    // Toggle the timer status for the specific task at the given index
    const newTimers = [...timers];
    newTimers[index] = !newTimers[index];
    setTimers(newTimers);
  };

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleTimeInputChange = (event) => {
    setTimeInput(event.target.value);
  };

  const handleStatusInputChange = (event) => {
    setStatusInput(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    if (taskInput.trim() !== "" && timeInput.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          task: taskInput,
          time: timeInput,
          status: statusInput || "In Progress",
        },
      ]);
      setTaskInput("");
      setTimeInput("");
      setStatusInput("");
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    // Clear the timer and elapsed time for the removed task
    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      newTimers.splice(index, 1);
      return newTimers;
    });

    setElapsedTimes((prevElapsedTimes) => {
      const newElapsedTimes = [...prevElapsedTimes];
      newElapsedTimes.splice(index, 1);
      return newElapsedTimes;
    });
  };

  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleStatusUpdate = (index) => {
    if (statusInput.trim() !== "") {
      setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
          i === index ? { ...task, status: statusInput } : task
        )
      );
    }
  };

  const handleSubmit = () => {
    // Submit the headings to the admin
    setSubmitTask([...tasks.map((task) => task.heading)]);
    // Perform your submission logic here (e.g., API call)
  };
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event, itemId) => {
    console.log("Item ID selected for editing:", itemId);
    setAnchorEl(event.currentTarget);

    setOpen(true); // Open the dialog for editing
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Sidebar1 />
      <main className="m-5" style={{ backgroundColor: "#F0F5FD" }}>
        <h3 className="mb-3">TIME TRACKER</h3>
        <div className=" d-flex justify-content-start">
          <Box sx={{ minWidth: 120 }}>
            <FormControl
              sx={{ width: 200, "& .MuiInputBase-root": { height: "46px" } }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Project
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={project}
                label="Age"
                onChange={handleProjectChange}
              >
                <MenuItem value={10}>Continuum</MenuItem>
                <MenuItem value={20}>Nexum</MenuItem>
                <MenuItem value={30}>DMC</MenuItem>
                <MenuItem value={40}>CargoSprint</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl
              sx={{
                width: 200,
                marginLeft: 2,
                "& .MuiInputBase-root": { height: "46px" },
              }}
            >
              <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Age"
                onChange={handleRoleChange}
              >
                <MenuItem value={10}>Frontend</MenuItem>
                <MenuItem value={20}>Backend</MenuItem>
                <MenuItem value={30}>Salesforce</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* tasklist */}
          <form className="d-flex   mb-4" style={{ marginLeft: "20px" }}>
            <div className="form-outline flex-fill ml-2">
              <input
                type="text"
                placeholder="Your Task"
                id="form3"
                className="form-control form-control-lg"
                value={taskInput}
                onChange={handleTaskInputChange}
              />
            </div>
            <div className="form-outline flex-fill ml-2">
              <input
                type="time"
                placeholder="Expected Time"
                id="form3"
                className="form-control form-control-lg"
                value={timeInput}
                onChange={handleTimeInputChange}
              />
            </div>
            <div className="form-outline flex-fill ml-2">
              <select
                id="statusInput"
                className="form-control form-control-lg"
                value={statusInput}
                onChange={handleStatusInputChange}
              >
                <option>in progress</option>
                <option>started</option>
                <option>completed</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-md ms-2"
              onClick={handleAddTask}
            >
              Add
            </button>
          </form>
        </div>
        <ul className="list-group mb-0">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
            >
              <div className="d-flex align-items-center">
                {/* <input
                  className="form-check-input me-2"
                  placeholder=""
                  type="checkbox"
                  value=""
                  aria-label="..."
                /> */}
                <h6>{task.task}</h6>
              </div>
              <h6 className="text-center">{task.time}</h6>
              <div className="text-center">
                {formatTime(elapsedTimes[index])} Hrs
              </div>

              <button
                onClick={() => handleButtonClick(index)}
                className={timers[index] ? "checkout-button" : "checkin-button"}
              >
                {timers[index] ? "Timer Off" : "Timer On"}
              </button>
              <button
                type="button"
                className={`btn ${
                  task.status === "in progress"
                    ? "btn-outline-success"
                    : task.status === "started"
                    ? "btn-outline-warning"
                    : "btn-outline-danger"
                }`}
                style={{ minWidth: "100px" }}
              >
                {task.status}
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-lg font-weight-bold"
                onClick={() => handleStatusUpdate(index)}
              >
                Submit
              </button>
              <IconButton aria-haspopup="true" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {/* <MenuItem onClick={handleEditClick(item?.id)}>Edit</MenuItem> */}
                <MenuItem>Edit</MenuItem>
                <MenuItem onClick={() => handleRemoveTask(index)}>
                  Delete
                </MenuItem>
              </Menu>

              <Dialog open={open} onClose={handleClose} className="p-5 ">
                {/* <DialogTitle
                      className="text-center"
                      style={{ fontSize: "30px", fontWeight: "600" }}
                    >
                      Edit
                    </DialogTitle> */}
                <DialogContent>
                  <TextField
                    id="role"
                    select
                    label="Role"
                    fullWidth
                    variant="standard"
                    value={role}
                    // onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem>In Progress</MenuItem>
                    <MenuItem>Completed</MenuItem>
                  </TextField>
                </DialogContent>
                <DialogActions className="justify-content-start p-3">
                  <Button
                    className=" text-white w-25 p-2"
                    style={{ backgroundColor: "#1B1A47" }}
                    // onClick={handleEditApiCall}
                  >
                    Update
                  </Button>
                 
                </DialogActions>
              </Dialog>
             
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default TimeTracker;
