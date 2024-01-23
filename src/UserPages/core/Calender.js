import React from 'react'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calender = () => {
  return (
    <div
    class="card mb-1 rounded-3 shadow shadow-lg"
    style={{ maxWidth: "380px" }}
  >
    <div class="row g-0 ">
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <h5 className="pt-4 text-center">Calender</h5>
        <DateCalendar />
      </LocalizationProvider>
    </div>
  </div>
  )
}

export default Calender