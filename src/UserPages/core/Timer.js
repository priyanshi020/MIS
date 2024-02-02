// Timer.js
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useTimer } from '../../TimerContext';

const Timer = () => {
  const { timerState, setTimerState } = useTimer();
  const {
    isCheckInRunning,
    checkInElapsedTime,
    isBreakStartRunning,
    breakElapsedTime,
    userId,
    paused,
  } = timerState;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState('');
  const [breakTimerElapsedTime, setBreakTimerElapsedTime] = useState(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId !== undefined && storedUserId !== null) {
      setTimerState((prevState) => ({ ...prevState, userId: storedUserId }));
    }
  }, [setTimerState]);

  useEffect(() => {
    let checkInInterval;
    let breakInterval;

    if (isCheckInRunning && !paused) {
      checkInInterval = setInterval(() => {
        setTimerState((prevState) => ({
          ...prevState,
          checkInElapsedTime: prevState.checkInElapsedTime + 1,
        }));
      }, 1000);
    } else {
      clearInterval(checkInInterval);
    }

    if (isBreakStartRunning && !paused) {
      breakInterval = setInterval(() => {
        setTimerState((prevState) => ({
          ...prevState,
          breakElapsedTime: prevState.breakElapsedTime + 1,
        }));

        setBreakTimerElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (paused) {
      breakInterval = setInterval(() => {
        setBreakTimerElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(breakInterval);
    }

    return () => {
      clearInterval(checkInInterval);
      clearInterval(breakInterval);
    };
  }, [isCheckInRunning, isBreakStartRunning, paused, setTimerState]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCheckButtonClick = () => {
    if (isBreakStartRunning) {
      toast.warning('You need to end your break first.', {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (isCheckInRunning) {
      setShowConfirmation(true);
      setConfirmationAction('checkout');
    } else {
      handleCheckin();
    }
  };

  const handleCheckin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/bytesfarms/timesheet/checkin?userId=${userId}`,
        {}
      );

      if (response.data === 'User has already checked in on the current date.') {
        toast.error('You have already checked in today once.', {
          autoClose: 5000,
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } else {
        toast.success('Check-in successful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }

      setTimerState((prevState) => ({ ...prevState, isCheckInRunning: !prevState.isCheckInRunning }));
    } catch (error) {
      console.error('Check-in failed:', error.message);
    }
  };

  const handleConfirmation = (confirm) => () => {
    setShowConfirmation(false);

    if (confirm) {
      if (confirmationAction === 'checkout') {
        handleCheckout();
      }
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/bytesfarms/timesheet/checkout?userId=${userId}`,
        {}
      );

      console.log('Check-out response:', response.data);
      setTimerState((prevState) => ({ ...prevState, isCheckInRunning: false , isBreakStartRunning: false,}));
    } catch (error) {
      console.error('Check-out failed:', error.message);
    }
  };

  const handleBreakButtonClick = async () => {
    if (isBreakStartRunning) {
      try {
        const response = await axios.post(
          `http://localhost:8080/bytesfarms/timesheet/break/end?userId=${userId}`,
          {}
        );
        console.log('Break end response:', response.data);
      } catch (error) {
        console.error('Break end failed:', error.message);
      } finally {
        setTimerState((prevState) => ({ ...prevState, paused: false }));
      }
    } else {
      setTimerState((prevState) => ({ ...prevState, paused: true }));

      try {
        const response = await axios.post(
          `http://localhost:8080/bytesfarms/timesheet/break/start?userId=${userId}`,
          {}
        );
        console.log('Break start response:', response.data);
      } catch (error) {
        console.error('Break start failed:', error.message);
      }
    }

    setTimerState((prevState) => ({ ...prevState, isBreakStartRunning: !prevState.isBreakStartRunning }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {showConfirmation && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: '-133',
            left: '92',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="confirmation-modal"
            style={{
              zIndex: '100',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <Dialog
              open={handleClickOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`Are you sure you want to ${
                  confirmationAction === 'checkout' ? 'check out' : 'check in'
                }?`}
              </DialogTitle>

              <DialogActions>
                <Button onClick={handleConfirmation(false)}>No</Button>
                <Button onClick={handleConfirmation(true)} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
      <div
        className="card mb-3 rounded-3 shadow shadow-lg"
        style={{ maxWidth: '400px', maxHeight: '392px' }}
      >
        <ToastContainer />

        <div className="row g-0">
          <h5 className="pt-4 pb-3 text-center">Attendance</h5>
          <h6 className="text-center text-secondary pt-1">{formattedDate}</h6>
          <h1 className="text-center pt-3">
            {isCheckInRunning
              ? formatTime(checkInElapsedTime)
              : formatTime(breakElapsedTime)}
            Hrs
          </h1>

          <div
            style={{
              fontSize: '12px',
              color: '#a9a7a7',
              backgroundColor: '#f5f1f1',
              borderRadius: '4px',
              fontWeight: '500',
              width: '82%',
              padding: '18px 25px 0px 25px',
              marginTop: '7px',
              marginLeft: '33px',
              marginBottom: '27px',
            }}
          >
            <div className="d-flex justify-content-between">
              <p>Break Time</p>
              <p>{formatTime(breakTimerElapsedTime)}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Target Hours</p>
              <p>08H 45M </p>
            </div>
          </div>

          <div className="d-flex   mb-5 mt-3" style={{ paddingLeft: '29px' }}>
            <button
              onClick={handleCheckButtonClick}
              className={
                isCheckInRunning ? 'checkout-button' : 'checkin-button'
              }
              style={{ width: '155px', marginRight: '13px' }}
            >
              {isCheckInRunning ? 'Check Out' : 'Check In'}
            </button>
            <button
              onClick={handleBreakButtonClick}
              className={
                isBreakStartRunning
                  ? 'breakend-button'
                  : 'breakstart-button'
              }
              style={{ width: '155px' }}
              disabled={!isCheckInRunning}
            >
              {isBreakStartRunning ? 'Break End' : 'Break Start'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
