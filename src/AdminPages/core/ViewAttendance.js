import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function ViewAttendance({ userId }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bytesfarms/timesheet/totalhours?userId=${userId}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <div className="container">
        <button
          variant="outlined"
          onClick={handleClickOpen}
          id="addbutton"
          className="btn btn-primary btn-sm-3 rounded-3 "
          type="button"
          title="View Attendance"
        >
          View Attendance
        </button>
        <Dialog open={open} onClose={handleClose} className="p-5" maxWidth="md">
          <DialogTitle style={{ fontSize: "25px", fontWeight: "600" }}>
            Attendance List
          </DialogTitle>
          <DialogContent>
            <div className="table-responsive">
              <table className="rounded-4 table table-bordered table-striped">
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
                {data ? (
                  <tbody className="text-center">
                    {data.map((item) => (
                      <tr key={item.date}>
                        <td className="text-center">{item.day}</td>
                        <td>{item.month}</td>
                        <td>{item.year}</td>
                        <td>{item.checkInTime}</td>
                        <td>{item.checkOutTime}</td>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className="text-white" style={{ backgroundColor: "#1B1A47" }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default ViewAttendance;






