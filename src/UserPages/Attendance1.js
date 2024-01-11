import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Attendance1 = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [dayFilter, setDayFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bytesfarms/timesheet/totalhours?userId=${userId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    // Filter the data based on the provided filters
    if (data) {
      const filtered = data.filter(
        (item) =>
          (!dayFilter ||
            item.day
              .toString()
              .toLowerCase()
              .includes(dayFilter.toLowerCase())) &&
          (!monthFilter ||
            item.month
              .toString()
              .toLowerCase()
              .includes(monthFilter.toLowerCase())) &&
          (!yearFilter ||
            item.year
              .toString()
              .toLowerCase()
              .includes(yearFilter.toLowerCase()))
      );

      setFilteredData(filtered);
    }
  }, [data, dayFilter, monthFilter, yearFilter]);

  return (
    <>
      <Sidebar1 />
      <main className="" style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-5">
          <h3 className=" pb-3">ATTENDANCE</h3>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 2, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Day"
              variant="outlined"
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Month"
              variant="outlined"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Year"
              variant="outlined"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            />
          </Box>
          <div style={{ borderRadius: "20px" }}>
            {/* Filter inputs */}
            {/* <div className='mb-3'>
              <label>Day:</label>
              <input type="text" value={dayFilter} onChange={(e) => setDayFilter(e.target.value)} />
              <label>Month:</label>
              <input type="text" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} />
              <label>Year:</label>
              <input type="text" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} />
            </div> */}

            <table
              className="rounded-4 table table-bordered table-striped"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}
            >
              <thead className="table-secondary text-center">
                <tr>
                  {/* ...header columns */}
                  <th style={{ padding: "20px" }}>Day</th>
                  <th style={{ padding: "20px" }}>Month </th>
                  <th style={{ padding: "20px" }}>Year </th>
                  <th style={{ padding: "20px" }}>Check In </th>
                  <th style={{ padding: "20px" }}>Check Out </th>
                  <th style={{ padding: "20px" }}>Break Start</th>
                  <th style={{ padding: "20px" }}>Break End </th>
                  <th style={{ padding: "20px" }}>Status </th>
                </tr>
              </thead>
              {filteredData ? (
                <tbody className="">
                  {filteredData.map((item) => (
                    <tr key={item.date}>
                      {/* ...table rows */}
                      <td className="" style={{fontSize:'14px',padding:'20px'}}>{item.day}</td>
                      <td style={{fontSize:'14px',padding:'20px'}}>{item.month}</td>
                      <td style={{padding:'20px'}}>{item.year}</td>
                      <td style={{padding:'20px'}}>{item.checkInTime}</td>
                      <td style={{padding:'20px'}}>{item.checkOutTime}</td>
                      {/* Display all break starts in a separate column */}
                      <td>
                        {item.breaks.map((breakItem, index) => (
                          <React.Fragment key={breakItem.id}>
                            {index > 0 && ", "}
                            {breakItem.breakStartTime}
                          </React.Fragment>
                        ))}
                      </td>
                      {/* Display all break ends in a separate column */}
                      <td>
                        {item.breaks.map((breakItem, index) => (
                          <React.Fragment key={breakItem.id}>
                            {index > 0 && ", "}
                            {breakItem.breakEndTime || "N/A"}
                          </React.Fragment>
                        ))}
                      </td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tr>
                  <td colSpan="8">Loading...</td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Attendance1;
