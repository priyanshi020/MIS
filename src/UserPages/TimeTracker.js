import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TimeTracker = () => {
  const [project, setProject] = React.useState("");
  const [role,setRole]=useState("");
  const [taskInput, setTaskInput] = useState("");
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
        prevElapsedTimes.map((time, index) =>
          timers[index] ? time + 1 : time
        )
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

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    if (taskInput.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, taskInput]);
      setTaskInput("");
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

  const handleSubmit = () => {
    // Submit the headings to the admin
    setSubmitTask([...tasks.map((task) => task.heading)]);
    // Perform your submission logic here (e.g., API call)
  };

  return (
    <>
      <Sidebar1 />
      <main className="m-5">
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
                onChange={handleInputChange}
              />
              
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
                <input
                  className="form-check-input me-2"
                  placeholder=""
                  type="checkbox"
                  value=""
                  aria-label="..."
                />
                <h6>{task}</h6>
              </div>
              <h6 className="text-center text-secondary ">
                {currentDate.toLocaleDateString()}
              </h6>
              <h6 className="text-center ">{formatTime(elapsedTimes[index])}Hrs</h6>
              <button
                onClick={() => handleButtonClick(index)}
                className={timers[index] ? "checkout-button" : "checkin-button"}
              >
                {timers[index] ? "Timer Off" : "Timer On"}
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-lg  font-weight-bold"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => handleRemoveTask(index)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default TimeTracker;
