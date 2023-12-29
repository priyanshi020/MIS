import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Timer = () => {
  const [isCheckInRunning, setCheckInRunning] = useState(false);
  const [isBreakStartRunning, setBreakStartRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Retrieve the user ID from local storage
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      // Set the user ID in the component state
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    let interval;

    if (isCheckInRunning || isBreakStartRunning) {
      // Start the timer
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // Stop the timer
      clearInterval(interval);
    }

    // Cleanup the interval on component unmount or when the timer is stopped
    return () => clearInterval(interval);
  }, [isCheckInRunning, isBreakStartRunning]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime;
  };

  const handleCheckButtonClick = async () => {
    if (isCheckInRunning) {
      // Check-out API call
      try {
        const response = await axios.post(`http://localhost:8080/bytesfarms/timesheet/checkout?userId=${userId}`, {
          // Additional data if needed
        });
        console.log('Check-out response:', response.data);
      } catch (error) {
        console.error('Check-out failed:', error.message);
      }
    } else {
      // Check-in API call
      try {
        const response = await axios.post(`http://localhost:8080/bytesfarms/timesheet/checkin?userId=${userId}`, {
          // Additional data if needed
        });
        console.log('Check-in response:', response.data);
      } catch (error) {
        console.error('Check-in failed:', error.message);
      }
    }

    // Toggle the Check In/Out state
    setCheckInRunning((prevState) => !prevState);
  };

  const handleBreakButtonClick = async () => {
    if (isBreakStartRunning) {
      // Break end API call
      try {
        const response = await axios.post(`http://localhost:8080/bytesfarms/timesheet/break/end?userId=${userId}`, {
          // Additional data if needed
        });
        console.log('Break end response:', response.data);
      } catch (error) {
        console.error('Break end failed:', error.message);
      }
    } else {
      // Break start API call
      try {
        const response = await axios.post(`http://localhost:8080/bytesfarms/timesheet/break/start?userId=${userId}`, {
          // Additional data if needed
        });
        console.log('Break start response:', response.data);
      } catch (error) {
        console.error('Break start failed:', error.message);
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
    <div className="card mb-3 shadow shadow-lg" style={{ maxWidth: '400px' }}>
      <div className="row g-0">
        <h4 className="pt-3 pb-5 text-center">ATTENDANCE</h4>
        <div className="d-flex justify-content-around">
          <button onClick={handleCheckButtonClick} className={isCheckInRunning ? 'checkout-button' : 'checkin-button'}>
            {isCheckInRunning ? 'Check Out' : 'Check In'}
          </button>
          <button
            onClick={handleBreakButtonClick}
            className={isBreakStartRunning ? 'breakend-button' : 'breakstart-button'}
            disabled={!isCheckInRunning} // Disable if not checked in
          >
            {isBreakStartRunning ? 'Break End' : 'Break Start'}
          </button>
        </div>
        <h1 className="text-center pt-5">{formatTime(elapsedTime)}Hrs</h1>
        <h5 className="text-center text-secondary pt-5">
          {currentDate.toLocaleDateString()}
        </h5>
        <p className="text-center text-primary pt-5">
          {isCheckInRunning ? 'Yet to check out' : isBreakStartRunning ? 'On break' : ''}
        </p>
      </div>
    </div>
  );
};

export default Timer;
