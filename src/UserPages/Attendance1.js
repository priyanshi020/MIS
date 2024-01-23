import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Attendance1 = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [dayFilter, setDayFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData
    ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
    : null;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Sidebar1 />
      <main className="" style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-5">
          <h3 className="pb-3">ATTENDANCE</h3>
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
            <table
              className="rounded-4 table"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}
            >
              <thead className="table-secondary text-center">
                <tr>
                  <th style={{ padding: "20px" }}>Day</th>
                  <th style={{ padding: "20px" }}>Month</th>
                  <th style={{ padding: "20px" }}>Year</th>
                  <th style={{ padding: "20px" }}>Check In</th>
                  <th style={{ padding: "20px" }}>Check Out</th>
                  <th style={{ padding: "20px" }}>Break Start</th>
                  <th style={{ padding: "20px" }}>Break End</th>
                  <th style={{ padding: "20px" }}>Status</th>
                </tr>
              </thead>
              {currentItems ? (
                <tbody className="text-center">
                  {currentItems.map((item) => (
                    <tr key={item.date}>
                      <td style={{ fontSize: "14px", padding: "20px" }}>
                        {item.day}
                      </td>
                      <td style={{ fontSize: "14px", padding: "20px" }}>
                        {item.month}
                      </td>
                      <td style={{ padding: "20px" }}>{item.year}</td>
                      <td style={{ padding: "20px" }}>
                        {moment(item.checkInTime).format("HH:mm")}
                      </td>
                      <td style={{ padding: "20px" }}>
                        {moment(item.checkOutTime).format("HH:mm")}
                      </td>
                      <td style={{ whiteSpace: "pre-line", padding: "20px" }}>
                        {item.breaks.map((breakItem, index) => (
                          <React.Fragment key={breakItem.id}>
                            {index > 0 && <hr />}
                            {`Break ${index + 1}: `}
                            {moment(breakItem.breakStartTime).format("HH:mm")}
                          </React.Fragment>
                        ))}
                      </td>
                      <td style={{ whiteSpace: "pre-line", padding: "20px" }}>
                        {item.breaks.map((breakItem, index) => (
                          <React.Fragment key={breakItem.id}>
                            {index > 0 && <hr />}
                            {`Break ${index + 1}: `}
                            {moment(breakItem.breakEndTime || "N/A").format(
                              "HH:mm"
                            )}
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
            {filteredData && (
              <Stack spacing={2} style={{ marginTop: "20px" }}>
                <Pagination
                  count={Math.ceil(filteredData.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Stack>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Attendance1;
