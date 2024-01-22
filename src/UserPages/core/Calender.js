import React from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calender = () => {
  const renderDay = (day, _, dayProps) => {
    const selectedStyles = dayProps.selected
      ? {
          color: '#fff',
          backgroundColor: '#ff8430',
          fontWeight: 500,
        }
      : {};

    return (
      <div style={selectedStyles}>
        {dayProps.day}
      </div>
    );
  };

  return (
    <div className="card mb-3 rounded-3 shadow shadow-lg" style={{ maxWidth: "380px" }}>
      <div className="row g-0">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <h5 className="pt-4 text-center">Calendar</h5>
          <DateCalendar renderDay={renderDay} />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Calender;
