import React, { createContext, useContext, useReducer } from "react";

const TimerContext = createContext();

const timerReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHECKIN_STATE":
      return { ...state, isCheckInRunning: action.payload };
    case "SET_ELAPSED_TIME":
      return { ...state, checkInElapsedTime: action.payload };
    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, {
    isCheckInRunning: false,
    checkInElapsedTime: 0,
  });

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
