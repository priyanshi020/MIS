import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function ViewAttendance({ userId }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [dayFilter, setDayFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bytesfarms/timesheet/totalhours?userId=${userId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    // Filter the data based on the provided filters
    if (data) {
      const filtered = data.filter(item =>
        (!dayFilter || item.day.toString().toLowerCase().includes(dayFilter.toLowerCase())) &&
        (!monthFilter || item.month.toString().toLowerCase().includes(monthFilter.toLowerCase())) &&
        (!yearFilter || item.year.toString().toLowerCase().includes(yearFilter.toLowerCase()))
      );

      setFilteredData(filtered);
      setCurrentPage(1); // Reset current page when filters change
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
      <div className="container">
        <button
          variant="outlined"
          onClick={handleClickOpen}
          id="addbutton"
          className="btn btn-primary btn-sm-3 rounded-3 "
          style={{ backgroundColor: "#1B1A47", color: "white" }}
          type="button"
          title="View Attendance"
        >
          View Attendance
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          className="p-5"
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle style={{ fontSize: "25px", fontWeight: "600" }}>
            Attendance List
          </DialogTitle>
          <DialogContent>
            <div className="table-responsive">
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Day" variant="outlined" value={dayFilter} onChange={(e) => setDayFilter(e.target.value)} />
                <TextField id="outlined-basic" label="Month" variant="outlined" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} />
                <TextField id="outlined-basic" label="Year" variant="outlined" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} />
              </Box>
              <table className=" table" style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}>
                <thead className="table-secondary text-center">
                  <tr>
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
                {currentItems ? (
                  <tbody className="text-center">
                    {currentItems.map((item) => (
                      <tr key={item.date}>
                        <td className="text-center">{item.day}</td>
                        <td>{item.month}</td>
                        <td>{item.year}</td>
                        <td>{moment(item.checkInTime).format("HH:mm")}</td>
                        <td>{moment(item.checkOutTime).format("HH:mm")}</td>

                        <td>
                          {item.breaks.map((breakItem, index) => (
                            <React.Fragment key={breakItem.id}>
                              {index > 0 && ", "}
                              {moment(breakItem.breakStartTime).format("HH:mm")}
                            </React.Fragment>
                          ))}
                        </td>

                        <td>
                          {item.breaks.map((breakItem, index) => (
                            <React.Fragment key={breakItem.id}>
                              {index > 0 && ", "}
                              {moment(breakItem.breakEndTime || "N/A").format("HH:mm")}
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className="text-white"
              style={{ backgroundColor: "#1B1A47" }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default ViewAttendance;
