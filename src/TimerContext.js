// TimerContext.js
import React, { createContext, useContext, useState } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timerState, setTimerState] = useState({
    isCheckInRunning: false,
    checkInElapsedTime: 0,
    isBreakStartRunning: false,
    breakElapsedTime: 0,
    userId: '',
    paused: false,
  });

  return (
    <TimerContext.Provider value={{ timerState, setTimerState }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
