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
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;

  const storedTaskId = localStorage.getItem("taskId");
  const taskId = storedTaskId ? parseInt(storedTaskId, 10) : null;

  const handleMenuClick = (event, index) => {
    console.log("Item ID selected for editing:", index);
    setAnchorEl(event.currentTarget);
    setOpen(true); // Open the dialog for editing
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const initialTimers = tasks.map(() => false);
    const initialElapsedTimes = tasks.map(() => 0);

    setTimers(initialTimers);
    setElapsedTimes(initialElapsedTimes);
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTimes((prevElapsedTimes) =>
        prevElapsedTimes.map((time, index) => (timers[index] ? time + 1 : time))
      );
    }, 1000);

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
      handleTaskUpdate(index); // Call the update task status API function
    }
    try {
      const response = fetch(
        `http://localhost:8080/bytesfarms/tasks/create?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tasks),
        }
      );

      if (response.ok) {
        setTasks([]);
        console.log("Tasks submitted successfully!");
      } else {
        console.error("Failed to submit tasks. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting tasks:", error);
    }
  };

  const handleTaskSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/bytesfarms/tasks/create?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tasks),
        }
      );

      if (response.ok) {
        setTasks([]);
        console.log("Tasks submitted successfully!");
      } else {
        console.error("Failed to submit tasks. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting tasks:", error);
    }
  };

  const handleTaskUpdate = async (index) => {
    try {
      const updatedTask = tasks[index];
      const response = await fetch(
        `http://localhost:8080/bytesfarms/tasks/update?userId=${userId} & taskId=${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        console.log("Task updated successfully!");
      } else {
        console.error("Failed to update task. Please try again.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <Sidebar1 />
      <main className="m-5" style={{ backgroundColor: "#F0F5FD" }}>
        <h3 className="m-3">TIME TRACKER</h3>
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

          <form className="d-flex   mb-4" style={{ marginLeft: "20px" }}>
            <div >
            <TextField id="standard-basic" label="Your Task" variant="standard"  value={taskInput}
                onChange={handleTaskInputChange} />
              {/* <input
                type="text"
                placeholder="Your Task"
                id="form3"
                className="form-control form-control-lg"
                value={taskInput}
                onChange={handleTaskInputChange}
              /> */}
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
                <MenuItem value={10}>Started</MenuItem>
                <MenuItem value={20}>Backend</MenuItem>
                <MenuItem value={30}>Salesforce</MenuItem>
              </Select>
            </FormControl>
          </Box>
            <div className="form-outline flex-fill ml-2">
              <select
                id="statusInput"
                className="form-control form-control-lg"
                value={statusInput}
                onChange={handleStatusInputChange}
              >
                
                <option>Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <Button
            onClick={handleAddTask}
            className=" text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Add
          </Button>
            {/* <button
              type="submit"
              className="btn btn-primary btn-md ms-2"
              onClick={handleAddTask}
            >
              Add
            </button> */}
          </form>
        </div>
        <ul className="list-group mb-0">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
            >
              <div className="d-flex align-items-center">
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
              <IconButton
                aria-haspopup="true"
                onClick={(event) => handleMenuClick(event, index)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => setOpen(true)}>Edit</MenuItem>
                <MenuItem onClick={() => handleRemoveTask(index)}>
                  Delete
                </MenuItem>
              </Menu>
              <Dialog open={open} onClose={handleClose} className="p-5" fullWidth
          maxWidth="sm" >
                <DialogContent>
                  <TextField
                    id="statusInput"
                    select
                    label="Status"
                    fullWidth
                    variant="standard"
                    value={statusInput}
                    onChange={handleStatusInputChange}
                  >
                   
                    <MenuItem>Started</MenuItem>
                    <MenuItem>In Progress</MenuItem>
                    <MenuItem>Completed</MenuItem>
                  </TextField>
                </DialogContent>
                <DialogActions className="justify-content-start p-3">
                  <Button
                    className="text-white  p-2"
                    style={{ backgroundColor: "#1B1A47" }}
                    onClick={() => {
                      handleStatusUpdate(index);
                      setOpen(false);
                    }}
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
