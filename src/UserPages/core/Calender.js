import React from 'react'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calender = () => {
  return (
    <div
    class="card mb-3 rounded-3 shadow shadow-lg"
    style={{ maxWidth: "380px" }}
  >
    <div class="row g-0 ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h4 className="pt-3 text-center">CALENDER</h4>
        <DateCalendar />
      </LocalizationProvider>
    </div>
  </div>
  )
}

export default Calender