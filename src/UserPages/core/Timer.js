import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Timer = () => {
  // Check-in/Checkout Timer
  const [isCheckInRunning, setCheckInRunning] = useState(false);
  const [checkInElapsedTime, setCheckInElapsedTime] = useState(0);

  // Break Timer
  const [isBreakStartRunning, setBreakStartRunning] = useState(false);
  const [breakElapsedTime, setBreakElapsedTime] = useState(0);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [paused, setPaused] = useState(false);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleString('en-US', options);

  useEffect(() => {
    // Retrieve the user ID from local storage
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId !== undefined && storedUserId !== null) {
      // Set the user ID in the component state
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    let checkInInterval;
    let breakInterval;

    if (isCheckInRunning && !paused) {
      // Start the check-in timer
      checkInInterval = setInterval(() => {
        setCheckInElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // Stop the check-in timer
      clearInterval(checkInInterval);
    }

    if (isBreakStartRunning && !paused) {
      // Start the break timer
      breakInterval = setInterval(() => {
        setBreakElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // Stop the break timer
      clearInterval(breakInterval);
    }

    // Cleanup the intervals on component unmount or when the timers are stopped
    return () => {
      clearInterval(checkInInterval);
      clearInterval(breakInterval);
    };
  }, [isCheckInRunning, isBreakStartRunning, paused]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;
  };

  const handleCheckButtonClick = async () => {
    try {
      let response;

      if (isBreakStartRunning) {
        // If break is running, show a toast and return without triggering the API call
        toast.warning("You need to end your break first.", {
          autoClose: 5000,
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      if (isCheckInRunning) {
        response = await axios.post(
          `http://localhost:8080/bytesfarms/timesheet/checkout?userId=${userId}`,
          {}
        );
        console.log("Check-out response:", response.data);
      } else {
        // Check-in API call
        response = await axios.post(
          `http://localhost:8080/bytesfarms/timesheet/checkin?userId=${userId}`,
          {}
        );
        console.log("Check-in response:", response.data);

        if (
          response.data === "User has already checked in on the current date."
        ) {
          toast.error("You have already checked in today once.", {
            autoClose: 5000,
            position: toast.POSITION.TOP_CENTER
          });
          return;
        }
        else {
          // Show a success toast on successful check-in
          toast.success("Check-in successful!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
          });
        }
      }

      setCheckInRunning((prevState) => !prevState);
    } catch (error) {
      console.error(
        isCheckInRunning ? "Check-out failed:" : "Check-in failed:",
        error.message
      );
    }
  };

  const handleBreakButtonClick = async () => {
    if (isBreakStartRunning) {
      // Break end API call
      try {
        const response = await axios.post(
          `http://localhost:8080/bytesfarms/timesheet/break/end?userId=${userId}`,
          {
            // Additional data if needed
          }
        );
        console.log("Break end response:", response.data);
      } catch (error) {
        console.error("Break end failed:", error.message);
      } finally {
        // Resume the timers after the break end
        setPaused(false);
      }
    } else {
      // Pause the timers during break start
      setPaused(true);

      // Break start API call
      try {
        const response = await axios.post(
          `http://localhost:8080/bytesfarms/timesheet/break/start?userId=${userId}`,
          {
            // Additional data if needed
          }
        );
        console.log("Break start response:", response.data);
      } catch (error) {
        console.error("Break start failed:", error.message);
      }
    }

    // Toggle the Break Start/End state
    setBreakStartRunning((prevState) => !prevState);
  };

  useEffect(() => {
    // Update the current date every second
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="card mb-3 rounded-3 shadow shadow-lg"
      style={{ maxWidth: "400px", maxHeight: "392px" }}
    >
      <ToastContainer />

      <div className="row g-0">
        <h5 className="pt-4 pb-3 text-center">Attendance</h5>
        <h6 className="text-center text-secondary pt-1  ">
          {formattedDate}
        </h6>
        <h1 className="text-center pt-3">{isCheckInRunning ? formatTime(checkInElapsedTime) : formatTime(breakElapsedTime)}Hrs</h1>

        <div
          style={{
            fontSize: "12px",
            color: '#a9a7a7',
            backgroundColor: '#f5f1f1',
            borderRadius: '4px',
            fontWeight: '500',
            width: '82%',
            padding: '18px 25px 0px 25px',
            marginTop: '7px',
            marginLeft: '33px',
            marginBottom: '27px'
          }}
        >
          <div className="d-flex justify-content-between">
            {/* <p>{isCheckInRunning ? "Check-in Time" : "Break Time"}</p>
            <p>{isCheckInRunning ? formatTime(checkInElapsedTime) : formatTime(breakElapsedTime)}</p> */}
            <p>Break Time</p>
            <p>45min</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Target Hours</p>
            <p>08H 45M </p>
          </div>
        </div>

        <div className="d-flex   mb-5 mt-3" style={{ paddingLeft: '29px' }}>
          <button
            onClick={handleCheckButtonClick}
            className={isCheckInRunning ? "checkout-button" : "checkin-button"}
            style={{ width: '155px', marginRight: '13px' }}
          >
            {isCheckInRunning ? "Check Out" : "Check In"}
          </button>
          <button
            onClick={handleBreakButtonClick}
            className={
              isBreakStartRunning ? "breakend-button" : "breakstart-button"
            }
            style={{ width: '155px' }}
            disabled={!isCheckInRunning} // Disable if not checked in
          >
            {isBreakStartRunning ? "Break End" : "Break Start"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Timer;
