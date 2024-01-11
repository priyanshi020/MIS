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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

const TimeTracker = () => {
  const [project, setProject] = React.useState("");
  const [role, setRole] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [elapsedTimes, setElapsedTimes] = useState([]);
  const [timers, setTimers] = useState([]);
  const [editedRole, setEditedRole] = useState("");

  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;

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
    let enteredTime = event.target.value;

    const date = new Date("2000-01-01 " + enteredTime);
    const formattedTime = date.toLocaleTimeString("en-US", { hour12: false });

    setTimeInput(formattedTime);
  };

  const handleStatusInputChange = (event) => {
    setStatusInput(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    if (taskInput.trim() !== "" && timeInput.trim() !== "") {
      const newTask = {
        task: taskInput,
        time: timeInput,
        status: statusInput || "In Progress",
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskInput("");
      setTimeInput("");
      setStatusInput("");

      setTimers((prevTimers) => [...prevTimers, false]);
      setElapsedTimes((prevElapsedTimes) => [...prevElapsedTimes, 0]);
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
    }
  };

  const handleSubmit = (index) => {
    const taskToSubmit = tasks[index];

    const submittedData = {
      taskDescription: taskToSubmit.task,
      expectedTime: taskToSubmit.time,
      actualTime: formatTime(elapsedTimes[index]),
      status: taskToSubmit.status.toUpperCase(),
    };

    fetch(`http://localhost:8080/bytesfarms/tasks/create?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });

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

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event, index) => {
    console.log("Item Index selected for editing:", index);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  
    // Set the edited role to the current role of the task
    setEditedRole(tasks[index].status);
  };
  
  const handleClose = () => {
    setOpen(false);
    setEditedRole("");
  };

  const handleUpdate = (index) => {
    const updatedRole = editedRole;
  
    // Send the updated role to the API
    const taskId = tasks[index].id; // Replace 'id' with the actual property name of the task ID
    const apiEndpoint = `http://localhost:8080/bytesfarms/tasks/update/${taskId}?userId=${userId}`;
    
    fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updatedRole }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        
        // Update the state with the new role
        setTasks((prevTasks) =>
          prevTasks.map((task, i) =>
            i === index ? { ...task, status: updatedRole } : task
          )
        );
  
        // Close the dialog
        handleClose();
      })
      .catch((error) => {
        console.error("API error:", error);
        // Handle error if needed
      });
  };
  

  return (
    <>
      <Sidebar1 />
      <main className="" style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-5">
          <h3 className=" pb-3">TIME TRACKER</h3>
          <div className=" d-flex justify-content-start">
            <Box sx={{ minWidth: 120 }}>
              <FormControl
                sx={{ width: 180, "& .MuiInputBase-root": { height: "46px" } }}
              >
                <InputLabel id="demo-simple-select-label">Project</InputLabel>
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
                  width: 180,
                  marginLeft: 4,
                  "& .MuiInputBase-root": { height: "46px" },
                }}
              >
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
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
            <form className="d-flex   ml-5 mb-5">
              {/* <TextField
                id="outlined-basic"
                label="Your Task"
                variant="outlined"
                value={taskInput}
                onChange={handleTaskInputChange}
                style={{ height: "47px" }  }
              /> */}
              <TextField
                id="standard-basic"
                label="Your Task"
                variant="standard"
                value={taskInput}
                onChange={handleTaskInputChange}
                
              />

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimeField"]}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimeField"]}>
              <TimeField
          label="Format without meridiem"
          value={timeInput}
          onChange={handleTimeInputChange}
          InputLabelProps={{ style: { color: 'gray' } }}
          InputProps={{
            style: {
              borderColor: 'gray',
              // Adjust the size of the field (you can use fontSize or width/height)
              width: '200px', // Adjust the width as needed
            },
          }}
          format="HH:mm"
        />
              </DemoContainer>
            </LocalizationProvider>
              </DemoContainer>
            </LocalizationProvider> */}

              <div className="form-outline flex-fill ml-5">
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
                    width: 180,
                    marginLeft: 4,
                    "& .MuiInputBase-root": { height: "46px" },
                  }}
                >
                  <InputLabel id="demo-simple-select-label"> Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={statusInput}
                    label="Status"
                    onChange={handleStatusInputChange}
                  >
                    <MenuItem value="Started">Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                type="submit"
                onClick={handleAddTask}
                className=" text-white ml-5"
                style={{
                  backgroundColor: "#1B1A47",
                  height: "46px",
                  width: "200px",
                }}
              >
                Add
              </Button>
            </form>
          </div>
          <ul className="list-group mb-0">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
              >
                <div className="d-flex align-items-center" style={{ width: "250px", wordWrap: "break-word" }}>
                  <h6>{task.task}</h6>
                </div>
                <h6 className="text-center">{task.time}</h6>
                <div className="text-center">
                  {formatTime(elapsedTimes[index])} Hrs
                </div>
                <button
                  onClick={() => handleButtonClick(index)}
                  className={
                    timers[index] ? "checkout-button" : "checkin-button"
                  }
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
                <Button
                  type="submit"
                  onClick={() => handleSubmit(index)}
                  className=" text-white ml-5 align-right"
                  style={{
                    backgroundColor: "#1B1A47",
                    height: "46px",
                    width: "100px",
                  }}
                >
                  Submit
                </Button>
                {/* <button
                  type="button"
                  className="btn btn-outline-primary btn-lg font-weight-bold"
                  onClick={() => handleSubmit(index)}
                >
                  Submit
                </button> */}
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
                  <MenuItem>Edit</MenuItem>
                  <MenuItem onClick={() => handleRemoveTask(index)}>
                    Delete
                  </MenuItem>
                </Menu>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  className="p-5 "
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogContent>
                  <TextField
    id="role"
    select
    label="Role"
    fullWidth
    variant="standard"
    value={editedRole}
    onChange={(e) => setEditedRole(e.target.value)}
  >
    <MenuItem value="In Progress">In Progress</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
  </TextField>
                  </DialogContent>
                  <DialogActions className="justify-content-start p-3">
                  <Button
  className=" text-white w-25 p-2"
  style={{ backgroundColor: "#1B1A47" }}
  onClick={() => handleUpdate(index)}
>
  Update
</Button>

                  </DialogActions>
                </Dialog>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default TimeTracker;
