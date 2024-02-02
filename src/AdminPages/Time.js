import React, { useState, useEffect, useCallback } from "react";
import Sidebar1 from "../components/Sidebar1";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import { TaskAltRounded } from "@mui/icons-material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TimeTracker = () => {
  const [project, setProject] = React.useState("");
  const [role, setRole] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [timeInput1, setTimeInput1] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [elapsedTimes, setElapsedTimes] = useState([]);
  const [timers, setTimers] = useState([]);
  const [editedRole, setEditedRole] = useState("");
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [EditTime, setEditTime] = useState("");
  const inProgress = "IN PROGRESS";
  const completed = "COMPLETED";
  const handleTime = (e) => {
    let enteredTime = e.target.value;

    const date = new Date("2000-01-01 " + enteredTime);
    const formattedTime = date.toLocaleTimeString("en-US", { hour12: false });
    setEditTime(formattedTime);
  };

  const [EditStatus, setEditStatus] = useState("");
  const handleStatus = (e) => {
    setEditStatus(e.target.value);
  };

  const [editData, setEditData] = useState({
    id: null,
    actualTime: "",
    status: "",
  });
  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/bytesfarms/tasks/get?userId=${userId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
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
    let enteredTime = event.target.value;

    const date = new Date("2000-01-01 " + enteredTime);
    const formattedTime = date.toLocaleTimeString("en-US", { hour12: false });

    setTimeInput1(formattedTime);
  };

  const handleStatusInputChange = (event) => {
    setStatusInput(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    if (taskInput.trim() !== "" && timeInput1.trim() !== "") {
      const newTask = {
        task: taskInput,
        time: timeInput1,
        status: statusInput || "In Progress",
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskInput("");
      setTimeInput1("");
      setStatusInput("");

      setTimers((prevTimers) => [...prevTimers, false]);
      setElapsedTimes((prevElapsedTimes) => [...prevElapsedTimes, 0]);
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
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
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleMenuClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    // setSelectedTaskId(taskId);
    setSelectedItemId(taskId);
    const selectedItem = data.find((task) => task.id === taskId);

    if (selectedItem) {
      setEditData({
        id: selectedItem.id,
        actualTime: selectedItem.actualTime,
        status: selectedItem.status,
      });
      setEditTime(selectedItem.actualTime);
      setEditStatus(selectedItem.status);

      setOpen(true);
    } else {
      console.error("Item not found for editing.");
    }
  };

  const handleEditClick = useCallback(
    (taskId) => () => {
      setSelectedItemId(taskId);
      setOpen(true);
    },
    [handleMenuClose]
  );

  const handleid = (task) => {
    setSelectedItemId(task);
  };

  const handleDeleteClick = () => {
    if (!selectedItemId) {
      console.error("No item selected for deletion.");
      handleMenuClose();
      return;
    }

    const apiUrl = `http://localhost:8080/bytesfarms/tasks/delete?taskId=${selectedItemId}`;

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

  const handleClose = () => {
    setOpen(false);
    // setEditedRole("");
    setEditData({
      id: null,
      actualTime: "",
      status: "",
    });
  };

  const handleEditApiCall = () => {
    const editData = {
      actualTime: EditTime,
      status: EditStatus,
    };

    axios
      .put(
        `http://localhost:8080/bytesfarms/tasks/update?userId=${userId}&taskId=${selectedItemId}`,
        editData
      )
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error editing item:", error.message);
      })
      .finally(() => {
        handleMenuClose();
        handleClose();
      });
  };

  const handleStatusChange = (actualTime, status) => {
    if (selectedTaskId) {
      const apiUrl = `http://localhost:8080/bytesfarms/tasks/update?userId=${userId}&taskId=${selectedTaskId}`;
      const requestBody = {
        actualTime: actualTime,
        status: status,
      };
      axios
        .put(apiUrl, requestBody)
        .then((response) => {
          console.log(response.data);
          // Update the local state (data) with the new status
          const updatedData = data.map((task) => {
            if (task.id === selectedTaskId) {
              return {
                ...task,
                actualTime: actualTime,
                status: status,
              };
            } else {
              return task;
            }
          });
          setData(updatedData);
        })
        .catch((error) => {
          console.error("Error updating status:", error);
        })
        .finally(() => {
          handleMenuClose();
        });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Sidebar1 />
      <main className="" style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-5">
          <h3 className=" pb-3">TIME TRACKER</h3>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example  "
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#1B1A47",
                  },
                  "& .MuiTab-root": {
                    color: "black !important",
                    "&:hover": {
                      color: "#1B1A47",
                    },
                  },
                }}
              >
                <Tab label="MOM" {...a11yProps(0)} />
                <Tab label="Task List" {...a11yProps(1)} />
                {/* <Tab label='GUEST' {...a11yProps(2)}/> */}
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className=" d-flex justify-content-start">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl
                    sx={{
                      width: 180,
                      "& .MuiInputBase-root": { height: "46px" },
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Project
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
                      {project === 10 && [
                        <MenuItem key={10} value={10}>
                          Frontend
                        </MenuItem>,
                        <MenuItem key={20} value={20}>
                          Backend
                        </MenuItem>,
                      ]}
                      {project === 20 && [
                        <MenuItem key={10} value={10}>
                          Frontend
                        </MenuItem>,
                        <MenuItem key={20} value={20}>
                          Backend
                        </MenuItem>,
                      ]}
                      {project === 30 && (
                        <MenuItem key={30} value={30}>
                          Salesforce
                        </MenuItem>
                      )}
                      {project === 40 && (
                        <MenuItem key={40} value={40}>
                          Salesforce
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>

                {/* tasklist */}
                <form className="d-flex   ml-5 mb-5">
                  <TextField
                    id="standard-basic"
                    label="Your Task"
                    variant="standard"
                    value={taskInput}
                    onChange={handleTaskInputChange}
                  />

                  <div className="form-outline flex-fill ml-5">
                    <input
                      type="time"
                      placeholder="Expected Time"
                      id="form3"
                      className="form-control form-control-lg"
                      value={timeInput1}
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
                      <InputLabel id="demo-simple-select-label">
                        {" "}
                        Status
                      </InputLabel>
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
              {tasks.length > 0 ? (
                <ul className="list-group mb-0">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ width: "250px", wordWrap: "break-word" }}
                      >
                        <h6>{task.task}</h6>
                      </div>

                      <h6 className="text-center">{task.time}</h6>
                      {/* <div className="text-center">
                  {formatTime(elapsedTimes[index])} Hrs
                </div>
                <button
                  onClick={() => handleButtonClick(index)}
                  className={
                    timers[index] ? "checkout-button" : "checkin-button"
                  }
                >
                  {timers[index] ? "Timer Off" : "Timer On"}
                </button> */}
                      <div>
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
                        <button
                          type="button"
                          className="btn btn-link text-decoration-none"
                          onClick={() => handleRemoveTask(index)}
                        >
                          ❌
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="d-flex justify-content-center align-items-center py-5 my-5  ">
                  <img src="/assets/task-icon.png" alt="task" />
                </div>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <table class="    rounded-4 table table-responsive-lg  ">
                <thead class="table-secondary text-center">
                  <tr className="">
                    <th className="" style={{ padding: "20px" }}>
                      Date
                    </th>

                    <th className="" style={{ padding: "20px" }}>
                      Task{" "}
                    </th>
                    <th className="" style={{ padding: "20px" }}>
                      Expected time{" "}
                    </th>
                    <th className="" style={{ padding: "20px" }}>
                      Actual Time{" "}
                    </th>
                    <th className="" style={{ padding: "20px" }}>
                      Status{" "}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                {data ? (
                  <tbody className="text-center">
                    {data.map((task) => (
                      <tr key={task.date}>
                        <td className="text-center">{task.date}</td>
                        <td>{task.taskDescription}</td>
                        <td>{task.expectedTime}</td>
                        <td>{task.actualTime}</td>
                        <td>{task.status}</td>
                        <td>
                          <IconButton
                            aria-haspopup="true"
                            onClick={(event) => handleMenuClick(event, task.id)} // Pass the task ID to handleMenuClick
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={handleEditClick(task.id)}>
                              Edit
                            </MenuItem>
                            <MenuItem onClick={handleDeleteClick}>
                              Delete
                            </MenuItem>
                          </Menu>
                        </td>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          fullWidth
                          maxWidth="md"
                        >
                          <DialogTitle
                            style={{ fontSize: "30px", fontWeight: "600" }}
                          >
                            Update
                          </DialogTitle>
                          <DialogContent>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label=""
                              type="time"
                              fullWidth
                              variant="standard"
                              name="name"
                              value={EditTime}
                              onChange={handleTime}
                            />

                            <TextField
                              id="role"
                              select
                              label="Status"
                              fullWidth
                              variant="standard"
                              value={EditStatus}
                              onChange={(e) => setEditStatus(e.target.value)}
                            >
                              <MenuItem value={inProgress}>
                                In Progress
                              </MenuItem>
                              <MenuItem value={completed}>Completed</MenuItem>
                            </TextField>
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
                              className=" text-white"
                              style={{ backgroundColor: "#1B1A47" }}
                              onClick={handleEditApiCall}
                            >
                              Edit
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <p>Loading...</p>
                )}
              </table>
            </CustomTabPanel>
          </Box>
        </div>
      </main>
    </>
  );
};

export default TimeTracker;
